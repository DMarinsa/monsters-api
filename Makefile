run:
	@docker-compose -f .docker/docker-compose.yml up --build
local-build:
	@echo 'Deleting previous build...'
	@rm -rf dist
	@rm -rf node_modules
	@echo 'Building application...'
	@npm install
	@npm run build
local-run: local-build
	@echo 'Running application in watch mode...'
	@npm run start:dev
test:
	@npm run test
install:
	@rm -rf node_modules
	@npm install