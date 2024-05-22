docker-down-clear:
	docker compose down --volumes --remove-orphans

node-cli:
	docker compose run --rm node-cli sh

node-cli-build:
	docker compose run --build --rm node-cli sh

format:
	docker compose run --rm node-cli pnpm --workspace-root run format

dev:
	docker compose up dev

example-dev:
	docker compose up example-dev

dev-build:
	docker compose up --build example-dev
