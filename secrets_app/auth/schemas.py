import datetime

from secrets_app.schemas import SBase


class SEnableTwoFactor(SBase):
    otp: str


class SQRCode(SBase):
    qr_code: str


class SUser(SBase):
    id: int
    email: str
    first_name: str
    last_name: str | None = None
    two_factor: bool = False
    otp_secret: str | None = None
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
    created_at: datetime.datetime
    updated_at: datetime.datetime
