from secrets_app.exceptions import AppException


class RequiresLoginException(AppException):
    pass


class AlreadyLoggedInException(AppException):
    pass
