install:
	npm install
	cd frontend && npm install

build: install
	cd frontend && npm run build

start:
	npx @hexlet/chat-server -s ./frontend/dist


