from fastapi import APIRouter, Request
from starlette.responses import HTMLResponse

from src.templating import templates

router = APIRouter(tags=["Onboarding"])


@router.get("/")
async def landing(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("main.html", {"request": request})


@router.get("/register")
async def register(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("register.html", {"request": request})


@router.get("/login")
async def login(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("login.html", {"request": request})


@router.get("/2fa")
async def login_2fa(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("2fa.html", {"request": request})
