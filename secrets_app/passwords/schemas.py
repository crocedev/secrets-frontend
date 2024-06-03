import datetime

from secrets_app.schemas import SBase, SPage


class SPassword(SBase):
    id: int
    user_id: int
    title: str
    username: str
    password: str
    url: str = ""
    note: str = ""
    created_at: datetime.datetime
    updated_at: datetime.datetime


class SPasswordItem(SBase):
    id: int
    title: str
    username: str
    url: str = ""


class SPasswordPage(SPage[SPasswordItem]):
    pass
