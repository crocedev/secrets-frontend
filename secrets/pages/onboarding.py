from fastapi import APIRouter, Request
from starlette.responses import HTMLResponse

from secrets.templating import templates

router = APIRouter(tags=["Onboarding"])


@router.get("/")
def main(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("main.html", {"request": request})


@router.get("/register")
def register(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("auth/register.html", {"request": request})


@router.get("/login")
def login(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("auth/login.html", {"request": request})


@router.get("/2fa")
def login_2fa(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("auth/2fa.html", {"request": request})
