install-dependencies:
	yarn install --ignore-scripts

lint:
	yarn lint-js
	yarn lint-css

unit-test: install-dependencies lint
	yarn test --ignore-scripts

build-assets-%:
	yarn install --ignore-scripts
	yarn build:${*}

deploy-assets-%: build-assets-%
	cp -r ./assets/ ./dist/

build-image-%: build-assets-%
	docker build -t abacaxi-frontend -f docker/Dockerfile .

run-%: build-image-%
	docker run --publish 8080:8080 --rm --tty --interactive abacaxi-frontend

run: run-dev

.PHONY: build-assets-% build-image-% install-dependencies lint unit-test run-% run
