from pydantic import BaseModel, EmailStr, Field, field_validator

from app.schemas.user import UserRead
from app.schemas.workspace import WorkspaceRead


class UserRegister(BaseModel):
    nombre: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=6, max_length=72)

    @field_validator("password")
    @classmethod
    def validate_password_bytes(cls, value: str) -> str:
        if len(value.encode("utf-8")) > 72:
            raise ValueError("La contraseña no puede superar los 72 bytes.")
        return value


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)

    @field_validator("password")
    @classmethod
    def validate_password_bytes(cls, value: str) -> str:
        if len(value.encode("utf-8")) > 72:
            raise ValueError("La contraseña no puede superar los 72 bytes.")
        return value


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AuthRegisterResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead
    workspace: WorkspaceRead