from typing import Annotated

from fastapi import APIRouter, Path, Depends
from starlette.requests import Request
from starlette.responses import HTMLResponse

from secrets.backend import BackendClient
from secrets.dependencies import get_client
from secrets.templating import templates

router = APIRouter(tags=["Passwords"])


@router.get("/passwords/add")
def add_password(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("passwords/add.html", {"request": request})


@router.get("/passwords/{item_id}")
async def get_password(
    request: Request,
    client: Annotated[BackendClient, Depends(get_client)],
    item_id: int = Path(ge=1),
) -> HTMLResponse:
    password = await client.get_password(item_id)
    return templates.TemplateResponse(
        "passwords/view.html", {"request": request, "password": password}
    )


@router.get("/passwords/{item_id}/edit")
async def edit_password(
    request: Request,
    client: Annotated[BackendClient, Depends(get_client)],
    item_id: int = Path(ge=1),
) -> HTMLResponse:
    password = await client.get_password(item_id)
    return templates.TemplateResponse(
        "passwords/edit.html", {"request": request, "password": password}
    )


@router.get("/passwords")
async def get_passwords(
    request: Request,
    client: Annotated[BackendClient, Depends(get_client)],
) -> HTMLResponse:
    page = await client.get_passwords()

    return templates.TemplateResponse(
        "passwords/page.html", {"request": request, "passwords": page.items}
    )
