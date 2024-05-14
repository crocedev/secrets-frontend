from starlette.requests import Request

from secrets.backend import BackendClient


def get_client(request: Request) -> BackendClient:
    return BackendClient(request.cookies)
