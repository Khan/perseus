.PHONY: help build debug server all put put-js put-css update clean
PORT=9000

help:
	@echo "make server PORT=9000  # runs the perseus server"
	@echo "make build             # compiles into build/perseus.js"
	@echo "make debug             # compiles into build/perseus.debug.js"
	@echo "make all               # build perseus into webapp"

build:
	mkdir -p build
	echo '/*! Perseus | http://github.com/Khan/perseus */' > build/perseus.js
	echo "// commit `git rev-parse HEAD`" >> build/perseus.js
	echo "// branch `git rev-parse --abbrev-ref HEAD`" >> build/perseus.js
	./node_modules/.bin/browserify -t reactiscriptsixify src/editor-page.jsx >> build/perseus.js

debug:
	mkdir -p build
	echo '/*! Perseus | http://github.com/Khan/perseus */' > build/perseus.debug.js
	echo "// commit `git rev-parse HEAD`" >> build/perseus.debug.js
	echo "// branch `git rev-parse --abbrev-ref HEAD`" >> build/perseus.debug.js
	./node_modules/.bin/browserify -t reactiscriptsixify -d src/editor-page.jsx >> build/perseus.debug.js

server: update
	./node_modules/.bin/beefy src/editor-page-shim.js test/test.js $(PORT) -- -t reactiscriptsixify -d

demo:
	git checkout gh-pages
	git reset --hard origin/master
	make build
	git add -f build/perseus.js
	git commit -nm 'demo update'
	git checkout master
	git push -f origin gh-pages:gh-pages

all: clean update build put

put: put-js put-css

put-js:
	./operations.sh put-js

put-css:
	./operations.sh put-css

update:
	npm install

clean:
	-rm -rf build/*
