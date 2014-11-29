.PHONY: help build server server-offline all subperseus forcesubperseus put put-js put-css install clean lint test jest
PORT=9000
WEBAPP=../webapp
IOS=../iOS
SUPPRESSINSTALL=FALSE

API_VERSION_MAJOR:=$(shell node node/echo-major-api-version.js)
PERSEUS_BUILD_JS=build/perseus-$(API_VERSION_MAJOR).js
PERSEUS_BUILD_CSS=build/perseus-$(API_VERSION_MAJOR).css

help:
	@echo "make server PORT=9000         # runs the perseus server"
	@echo "make server-offline PORT=9000 # runs the perseus server"
	@echo "make build                    # compiles into $(PERSEUS_BUILD_JS) and $(PERSEUS_BUILD_CSS)"
	@echo "make subperseus               # build perseus into webapp"
	@echo "make clean                    # delete all compilation artifacts"
	@echo "make test                     # run all tests"
	@echo "# NOTE: you can append SUPPRESSINSTALL=TRUE to avoid running npm install. Useful if you temporarily have no internet."

build: install
	mkdir -p build
# very hacks to prevent simple-markdown from pulling in a separate version of react.
# basically, we need its require("react") to resolve to perseus' react, instead of
# one in its node_modules (yuck!) (same for "underscore")
# TODO(aria): cry
	rm -rf simple-markdown/node_modules
	rm -rf kmath/node_modules
	./node_modules/.bin/webpack
	echo '/*! Perseus | http://github.com/Khan/perseus */' > $(PERSEUS_BUILD_JS)
	echo "// commit `git rev-parse HEAD`" >> $(PERSEUS_BUILD_JS)
	echo "// branch `git rev-parse --abbrev-ref HEAD`" >> $(PERSEUS_BUILD_JS)
	cat build/perseus.js >> $(PERSEUS_BUILD_JS)
	./node_modules/.bin/lessc stylesheets/exercise-content-package/perseus.less $(PERSEUS_BUILD_CSS)

server: install server-offline

server-offline:
	(sleep 1; echo; echo http://localhost:$(PORT)/test.html) &
	./node_modules/.bin/webpack-dev-server --port $(PORT) --output-public-path live-build/ --devtool inline-source-map src/perseus.js

demo:
	git checkout gh-pages
	git reset --hard origin/master
	make build
	git add -f $(PERSEUS_BUILD_JS)
	git commit -nm 'demo update'
	git checkout master
	git push -f origin gh-pages:gh-pages

all: subperseus

subperseus-ios: clean install build put-js-ios

subperseus: clean install shorttest build put

forcesubperseus: clean install build put

put: put-js put-css

put-js-ios: build
	cp $(PERSEUS_BUILD_JS) "$(IOS)/Resources/webview/javascript/perseus-package/perseus.js"

put-js: build
	cp $(PERSEUS_BUILD_JS) "$(WEBAPP)/javascript/perseus-package/"

put-css: build
	cp stylesheets/perseus-admin-package/* "$(WEBAPP)/stylesheets/perseus-admin-package"
	cp $(PERSEUS_BUILD_CSS) "$(WEBAPP)/stylesheets/exercise-content-package/"


# Pull submodules if they are empty.
# This should make first-time installation easier.
# We don't pull them if they are not empty because you might have
# intentionally added commits to them, and it would be weird for
# running the server to mess around with your git status.
# (we just test kmath here as a fun sample repo. #yolo)
ifeq ("$(wildcard kmath/package.json)", "")
SUBMODULE_UPDATE := git submodule update --init
else
SUBMODULE_UPDATE := echo "submodules already initialized"
endif

# just to make the upgrade process over switching from injected rcss to
# real rcss smooth
ifeq ("$(wildcard node_modules/rcss/package.json)","")
CLEAN_RCSS := rm -rf node_modules/rcss
else
ifeq ("$(wildcard node_modules/rcss/index.js)","")
CLEAN_RCSS := rm -rf node_modules/rcss
else
CLEAN_RCSS := echo "rcss already upgraded"
endif
endif

install:
ifneq ("$(SUPPRESSINSTALL)","TRUE")
	$(SUBMODULE_UPDATE)
	$(CLEAN_RCSS)
	npm install
	rm -rf node_modules/react-components
	ln -s ../react-components/js node_modules/react-components
	rm -rf node_modules/kmath
	ln -s ../kmath node_modules/kmath
	rm -rf node_modules/simple-markdown
	ln -s ../simple-markdown node_modules/simple-markdown
endif

clean:
	-rm -rf build/*

lint:
	~/Khan/devtools/khan-linter/runlint.py

FIND_TESTS_1 := find -E src -type f -regex '.*/__tests__/.*\.jsx?'
FIND_TESTS_2 := find src -type f -regex '.*/__tests__/.*\.jsx?'

ifneq ("$(shell $(FIND_TESTS_1) 2>/dev/null)","")
FIND_TESTS := $(FIND_TESTS_1)
else
ifneq ("$(shell $(FIND_TESTS_2) 2>/dev/null)","")
FIND_TESTS := $(FIND_TESTS_2)
else
FIND_TESTS := echo "Could not figure out how to run tests; skipping"; echo ""
endif
endif

test:
	$(FIND_TESTS) | xargs ./node_modules/.bin/mocha --reporter spec -r node/environment.js
shorttest:
	$(FIND_TESTS) | xargs ./node_modules/.bin/mocha --reporter dot -r node/environment.js

build/ke.js:
	(cd ke && ../node_modules/.bin/r.js -o requirejs.config.js out=../build/ke.js)

jest: build/ke.js
	./node_modules/.bin/jest

