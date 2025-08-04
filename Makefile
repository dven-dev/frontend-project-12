build:
	cd frontend && npm install && npm run build
	
start-frontend:
	make -C frontend start	

start-backend:
	npx @hexlet/chat-server --static ./frontend/dist

lint-frontend:
	make -C frontend lint
