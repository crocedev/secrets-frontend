APP_NAME=app
TESTS_PATH=tests

PHONY: run
run:
	uvicorn $(APP_NAME).main:app --host localhost --port 3000 --reload

PHONY: up
up:
	docker-compose up -d --build

PHONY: kill
kill:
	TASKKILL /F /IM python.exe

PHONY: lint
lint:
	ruff check --fix $(APP_NAME) $(TESTS_PATH)
	mypy $(APP_NAME) $(TESTS_PATH) --strict

PHONY: format
format:
	ruff format $(APP_NAME) $(TESTS_PATH)
