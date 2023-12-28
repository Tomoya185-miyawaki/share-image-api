DC := @docker-compose

.PHONY: up
up:
	$(DC) up

.PHONY: upd
upd:
	$(DC) up -d

.PHONY: build
build:
	$(DC) build

.PHONY: down
down:
	$(DC) down

.PHONY: api
api:
	$(DC) exec api bash

.PHONY: init
init:
	$(DC) up -d --build

.PHONY: deploy
deploy:
	$(DC) exec api bash -c "yarn run build" && vercel

.PHONY: deploy-prod
deploy-prod:
	$(DC) exec api bash -c "yarn run build" && vercel --prod