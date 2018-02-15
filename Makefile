install-dependencies:
	yarn install

lint:
	yarn lint-js
	yarn lint-css

unit-test: install-dependencies lint
	yarn test

build-assets-%:
	yarn install
	yarn build:${*}

build-image-%: build-assets-%
	docker build -t abacaxi-frontend -f docker/Dockerfile .

run-%: build-image-%
	docker run --publish 8080:8080 --rm --tty --interactive abacaxi-frontend

run: run-dev

.PHONY: build-assets-% build-image-% install-dependencies lint unit-test run-% run
