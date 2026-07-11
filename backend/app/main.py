from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.scheduler import start_scheduler

from app.api.routes import (
    auth_router,
    workspaces_router,
    social_accounts_router,
    content_items_router,
    posts_router,
    post_metrics_router,
    dashboard_router,
    dev_router,
    scheduler,
    calendar_notes
)


app = FastAPI(
    title="Vendio API",
    version="0.1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "Vendio API funcionando"
    }

@app.on_event("startup")
def on_startup():
    start_scheduler()

app.include_router(auth_router, prefix="/api")
app.include_router(workspaces_router, prefix="/api")
app.include_router(social_accounts_router, prefix="/api")
app.include_router(content_items_router, prefix="/api")
app.include_router(posts_router, prefix="/api")
app.include_router(post_metrics_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(dev_router, prefix="/api")
app.include_router(scheduler.router, prefix="/api")
app.include_router(calendar_notes.router, prefix="/api")