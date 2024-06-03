import os
from abc import ABC
from typing import Any


class BackendClient(ABC):
    base_url: str = os.getenv("BACKEND_URL", "http://127.0.0.1:8000")
    cookies: dict[str, Any]

    def __init__(self, cookies: dict[str, Any]) -> None:
        self.cookies = cookies
