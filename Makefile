
build: node_modules
	npm run build:prod

node_modules: package.json
	npm install

.PHONY: build
