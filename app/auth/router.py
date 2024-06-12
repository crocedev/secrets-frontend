from typing import Annotated

from fastapi import APIRouter, Request, Depends
from starlette import status
from starlette.responses import HTMLResponse, Response, RedirectResponse

from app.auth.client import AuthClient
from app.auth.dependencies import redirect_authenticated, get_auth_client
from app.templating import templates

router = APIRouter(tags=["Auth"])


@router.get("/", dependencies=[Depends(redirect_authenticated)])
def onboarding(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "auth/onboarding.html", {"request": request}
    )


@router.get("/register", dependencies=[Depends(redirect_authenticated)])
def register(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "auth/registration.html", {"request": request}
    )


@router.get("/login", dependencies=[Depends(redirect_authenticated)])
def login(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("auth/login.html", {"request": request})


@router.get("/2fa", dependencies=[Depends(redirect_authenticated)])
def login_2fa(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("auth/2fa.html", {"request": request})


@router.get("/logout")
async def logout(
    client: Annotated[AuthClient, Depends(get_auth_client)],
) -> Response:
    await client.logout()
    response = RedirectResponse("/login", status.HTTP_307_TEMPORARY_REDIRECT)
    response.delete_cookie("fastapiusersauth")

    return response
