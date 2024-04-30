import os
import pathlib

from fastapi import FastAPI, HTTPException
from starlette.responses import JSONResponse
from starlette.staticfiles import StaticFiles

from secrets.pages import routers

app = FastAPI(title="Secrets")

static_folder = pathlib.Path(__file__).parent.joinpath("static")
app.mount(
    "/static", StaticFiles(directory=os.path.realpath(static_folder)), name="static"
)


@app.exception_handler(HTTPException)
async def http_exception_handler(_app, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


for router in routers:
    app.include_router(router)


@app.get("/ping", include_in_schema=False)
def ping():
    return {"message": "pong"}
