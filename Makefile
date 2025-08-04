build:
	cd frontend && npm install && npm run build

start:
	npx @hexlet/chat-server --static ./frontend/dist

setup: build start
