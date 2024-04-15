from fastapi import APIRouter
from starlette.requests import Request
from starlette.responses import HTMLResponse

from src.templating import templates

router = APIRouter(tags=["passwords"])


@router.get("/passwords")
async def get_passwords(
    request: Request,
) -> HTMLResponse:
    page = [
        {"title": "Facebook", "username": "facebook123"},
        {"title": "Twitter", "username": "twitter123"},
        {"title": "Instagram", "username": "insta123"},
    ]

    return templates.TemplateResponse(
        "passwords.html", {"request": request, "passwords": page}
    )
