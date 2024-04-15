from .onboarding import router as auth_router
from .passwords import router as passwords_router

routers = [auth_router, passwords_router]

__all__ = ["routers"]
