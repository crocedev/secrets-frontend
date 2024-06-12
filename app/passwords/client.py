from urllib.parse import urlencode

import aiohttp
from starlette import status

from app.client import BackendClient
from app.passwords.schemas import SPassword, SPasswordPage


class PasswordClient(BackendClient):
    async def get_password(self, item_id: int) -> SPassword:
        async with aiohttp.ClientSession(cookies=self.cookies) as session:
            async with session.get(
                f"{self.base_url}/passwords/{item_id}",
            ) as response:
                if response.status != status.HTTP_200_OK:
                    response_text = await response.text()
                    raise Exception(response_text)

                response_json = await response.json()
                response_schema = SPassword.model_validate(response_json)

                return response_schema

    async def get_passwords(
        self, q: str = "", limit: int = 100
    ) -> SPasswordPage:
        params = urlencode({"query": q, "limit": limit})
        url = f"{self.base_url}/passwords?{params}"
        async with aiohttp.ClientSession(cookies=self.cookies) as session:
            async with session.get(url) as response:
                if response.status != status.HTTP_200_OK:
                    response_text = await response.text()
                    raise Exception(response_text)

                response_json = await response.json()
                response_schema = SPasswordPage.model_validate(response_json)

                return response_schema
