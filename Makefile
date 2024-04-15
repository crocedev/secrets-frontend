SOURCE_PATH = src
APP = src.main:app
API_HOST = localhost
API_PORT = 3000

PHONY: run-dev
run-dev:
	uvicorn $(APP) --host $(API_HOST) --port $(API_PORT) --reload

PHONY: run-prod
run-prod:
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml up --build

PHONY: lint
lint:
	ruff --fix $(SOURCE_PATH)
	mypy $(SOURCE_PATH)

PHONY: format
format:
	black $(SOURCE_PATH)

PHONY: freeze
freeze:
	pip freeze > requirements.txt
