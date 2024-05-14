from typing import Any

import aiohttp

from secrets.schemes import SPasswordPage, SPassword


class BackendClient:
    base_url = "http://127.0.0.1:8000"
    cookies: dict[str, Any]

    def __init__(self, cookies: dict[str, Any]) -> None:
        self.cookies = cookies

    async def get_password(self, item_id: int) -> SPassword:
        async with aiohttp.ClientSession(cookies=self.cookies) as session:
            async with session.get(
                f"{self.base_url}/passwords/{item_id}",
            ) as response:
                if response.status != 200:
                    response_text = await response.text()
                    raise Exception(response_text)

                response_json = await response.json()
                response_schema = SPassword.model_validate(response_json)

                return response_schema

    async def get_passwords(self, limit: int = 100) -> SPasswordPage:
        async with aiohttp.ClientSession(cookies=self.cookies) as session:
            async with session.get(
                f"{self.base_url}/passwords?limit={limit}",
            ) as response:
                if response.status != 200:
                    response_text = await response.text()
                    raise Exception(response_text)

                response_json = await response.json()
                response_schema = SPasswordPage.model_validate(response_json)

                return response_schema
