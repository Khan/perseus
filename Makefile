.PHONY: help build debug server all subperseus put put-js put-css install clean lint test jest
PORT=9000
WEBAPP=../webapp

help:
	@echo "make server PORT=9000  # runs the perseus server"
	@echo "make build             # compiles into build/perseus.js and build/perseus.css"
	@echo "make debug             # compiles into build/perseus.debug.js"
	@echo "make all               # build perseus into webapp"

API_VERSION_MAJOR:=$(shell node -e 'console.log(require("./src/version.json").apiVersion.major);')
PERSEUS_BUILD_JS=build/perseus-$(API_VERSION_MAJOR).js
PERSEUS_BUILD_CSS=build/perseus-$(API_VERSION_MAJOR).css

build: install
	mkdir -p build
	echo '/*! Perseus | http://github.com/Khan/perseus */' > build/perseus.js
	echo "// commit `git rev-parse HEAD`" >> build/perseus.js
	echo "// branch `git rev-parse --abbrev-ref HEAD`" >> build/perseus.js
	./node_modules/.bin/browserify src/perseus.js -s Perseus -t reactiscriptsixify >> $(PERSEUS_BUILD_JS)
	./node_modules/.bin/lessc stylesheets/exercise-content-package/perseus.less $(PERSEUS_BUILD_CSS)

server: install
	./node_modules/.bin/beefy src/perseus.js test/test.js $(PORT) -- -s Perseus -t reactiscriptsixify -d

demo:
	git checkout gh-pages
	git reset --hard origin/master
	make build
	git add -f build/perseus.js
	git commit -nm 'demo update'
	git checkout master
	git push -f origin gh-pages:gh-pages

all: subperseus

subperseus: clean install build put

put: put-js put-css

put-js: build
	cp $(PERSEUS_BUILD_JS) "$(WEBAPP)/javascript/perseus-package/"

put-css: build
	cp stylesheets/perseus-admin-package/* "$(WEBAPP)/stylesheets/perseus-admin-package"
	cp $(PERSEUS_BUILD_CSS) "$(WEBAPP)/stylesheets/exercise-content-package/"

install:
	npm install

clean:
	-rm -rf build/*

lint:
	~/Khan/devtools/khan-linter/runlint.py

test:
	./node_modules/.bin/mocha --reporter spec -r mocha/environment.js src/**/__tests__/*

build/ke.js:
	(cd ke && ../node_modules/.bin/r.js -o requirejs.config.js out=../build/ke.js)

jest: build/ke.js
	./node_modules/.bin/jest

