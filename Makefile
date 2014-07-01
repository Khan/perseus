.PHONY: help build server all subperseus put put-js put-css install clean lint test jest
PORT=9000
WEBAPP=../webapp

API_VERSION_MAJOR:=$(shell node node/echo-major-api-version.js)
PERSEUS_BUILD_JS=build/perseus-$(API_VERSION_MAJOR).js
PERSEUS_BUILD_CSS=build/perseus-$(API_VERSION_MAJOR).css

help:
	@echo "make server PORT=9000  # runs the perseus server"
	@echo "make build             # compiles into $(PERSEUS_BUILD_JS) and $(PERSEUS_BUILD_CSS)"
	@echo "make all               # build perseus into webapp"

build: install
	mkdir -p build
	echo '/*! Perseus | http://github.com/Khan/perseus */' > $(PERSEUS_BUILD_JS)
	echo "// commit `git rev-parse HEAD`" >> $(PERSEUS_BUILD_JS)
	echo "// branch `git rev-parse --abbrev-ref HEAD`" >> $(PERSEUS_BUILD_JS)
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
	find -E src -type f -regex '.*/__tests__/.*\.jsx?' | xargs ./node_modules/.bin/mocha --reporter spec -r node/environment.js

build/ke.js:
	(cd ke && ../node_modules/.bin/r.js -o requirejs.config.js out=../build/ke.js)

jest: build/ke.js
	./node_modules/.bin/jest

