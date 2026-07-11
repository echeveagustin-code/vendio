from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import get_current_user
from app.core.security import (
    create_access_token,
    get_password_hash,
    verify_password,
)
from app.database import get_db
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.auth import (
    AuthRegisterResponse,
    Token,
    UserLogin,
    UserRegister,
)
from app.schemas.user import UserRead


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post(
    "/register",
    response_model=AuthRegisterResponse,
    status_code=status.HTTP_201_CREATED
)
def register(
    payload: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == payload.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe un usuario con ese email."
        )

    user = User(
        nombre=payload.nombre,
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        is_active=True,
    )

    db.add(user)
    db.flush()

    workspace = Workspace(
        nombre=f"Workspace de {payload.nombre}",
        owner_id=user.id
    )

    db.add(workspace)
    db.commit()

    db.refresh(user)
    db.refresh(workspace)

    access_token = create_access_token(
        subject=user.id
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user,
        "workspace": workspace,
    }


@router.post(
    "/login",
    response_model=Token
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.email == form_data.username)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    password_is_valid = verify_password(
        form_data.password,
        user.hashed_password
    )

    if not password_is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo."
        )

    access_token = create_access_token(
        subject=user.id
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get(
    "/me",
    response_model=UserRead
)
def me(
    current_user: User = Depends(get_current_user)
):
    return current_user