from typing import TypeVar, Generic

from pydantic import BaseModel, ConfigDict


class SBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)


T = TypeVar("T", bound=BaseModel)


class SPage(SBase, Generic[T]):
    items: list[T]


class SPageParams(SBase):
    limit: int = 100
    offset: int = 0
