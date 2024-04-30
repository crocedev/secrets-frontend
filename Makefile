APP_NAME=secrets
TESTS_PATH=tests

PHONY: run-dev
run-dev:
	uvicorn $(APP_NAME).main:app --host localhost --port 3000 --reload

PHONY: run-prod
run-prod:
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml up --build

PHONY: lint
lint:
	ruff --fix $(APP_NAME) $(TESTS_PATH)
	mypy --install-imports $(APP_NAME) $(TESTS_PATH)

PHONY: format
format:
	ruff format $(APP_NAME) $(TESTS_PATH)

PHONY: freeze
freeze:
	pip freeze > requirements.txt
