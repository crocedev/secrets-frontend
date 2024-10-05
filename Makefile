APP_NAME=app
TESTS_PATH=tests

PHONY: run
run:
	uvicorn $(APP_NAME).main:app --host 0.0.0.0 --port 3000 --reload

PHONY: up
up:
	docker-compose up -d --build

PHONY: up-prod
up-prod:
	docker-compose -f docker-compose.yml-f docker-compose-prod.yml up -d --build

PHONY: restart
restart:
	docker-compose restart

PHONY: lint
lint:
	ruff check --fix $(APP_NAME) $(TESTS_PATH)
	mypy $(APP_NAME) $(TESTS_PATH) --strict

PHONY: format
format:
	ruff format $(APP_NAME) $(TESTS_PATH)

PHONY: kill
kill:
	TASKKILL /F /IM python.exe
