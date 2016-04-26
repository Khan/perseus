.PHONY: help build serve server server-offline all subperseus forcesubperseus webapp-put install clean lint test jest
PORT=9000
WEBAPP=../webapp
IOS=../iOS
SUPPRESSINSTALL=FALSE

API_VERSION_MAJOR:=$(shell node node/echo-major-api-version.js)
PERSEUS_BUILD_JS=build/perseus-$(API_VERSION_MAJOR).js
PERSEUS_BUILD_CSS=build/perseus-$(API_VERSION_MAJOR).css
PERSEUS_NODE_BUILD_JS=build/node-perseus.js
PERSEUS_EDITOR_BUILD_JS=build/editor-perseus.js
PERSEUS_VERSION_FILE=build/perseus-$(API_VERSION_MAJOR)-item-version.js

help:
	@echo "make server PORT=9000         # runs the perseus server"
	@echo "make server-offline PORT=9000 # runs the perseus server"
	@echo "make build                    # compiles into $(PERSEUS_BUILD_JS), $(PERSEUS_BUILD_CSS), $(PERSEUS_NODE_BUILD_JS), and $(PERSEUS_EDITOR_BUILD_JS)"
	@echo "make subperseus               # build perseus into webapp"
	@echo "make clean                    # delete all compilation artifacts"
	@echo "make test                     # run all tests"
	@echo "# NOTE: you can append SUPPRESSINSTALL=TRUE to avoid running npm install. Useful if you temporarily have no internet."

build: $(PERSEUS_BUILD_JS) $(PERSEUS_NODE_BUILD_JS) $(PERSEUS_EDITOR_BUILD_JS) $(PERSEUS_BUILD_CSS) $(PERSEUS_VERSION_FILE)

$(PERSEUS_BUILD_JS): install
	mkdir -p build
	NODE_ENV=production ./node_modules/.bin/webpack
	echo '/*! Perseus | http://github.com/Khan/perseus */' > $(PERSEUS_BUILD_JS)
	echo "// commit `git rev-parse HEAD`" >> $(PERSEUS_BUILD_JS)
	echo "// branch `git rev-parse --abbrev-ref HEAD`" >> $(PERSEUS_BUILD_JS)
	cat build/perseus.js >> $(PERSEUS_BUILD_JS)

$(PERSEUS_NODE_BUILD_JS): install
	mkdir -p build
	NODE_ENV=production INCLUDE_EDITORS=true ./node_modules/.bin/webpack --config webpack.config.node-perseus.js
	mv build/node-perseus.js build/node-perseus.js.tmp
	echo '/*! Nodeified Perseus | http://github.com/Khan/perseus */' > $(PERSEUS_NODE_BUILD_JS)
	echo "// commit `git rev-parse HEAD`" >> $(PERSEUS_NODE_BUILD_JS)
	echo "// branch `git rev-parse --abbrev-ref HEAD`" >> $(PERSEUS_NODE_BUILD_JS)
	cat build/node-perseus.js.tmp >> $(PERSEUS_NODE_BUILD_JS)
	rm build/node-perseus.js.tmp

$(PERSEUS_EDITOR_BUILD_JS): install
	mkdir -p build
	NODE_ENV=production INCLUDE_EDITORS=true ./node_modules/.bin/webpack
	mv $@ $@.tmp
	echo '/*! Perseus with editors | http://github.com/Khan/perseus */' > $@
	echo "// commit `git rev-parse HEAD`" >> $@
	echo "// branch `git rev-parse --abbrev-ref HEAD`" >> $@
	cat $@.tmp >> $@
	rm $@.tmp

$(PERSEUS_BUILD_CSS): install
	mkdir -p build
	./node_modules/.bin/lessc stylesheets/exercise-content-package/perseus.less $(PERSEUS_BUILD_CSS)

$(PERSEUS_VERSION_FILE): install
	mkdir -p build
	node node/create-item-version-file.js >> $(PERSEUS_VERSION_FILE)

serve: server

server: install server-offline

server-offline:
	(sleep 1; echo; echo http://localhost:$(PORT)/test.html) &
	INCLUDE_EDITORS=true ./node_modules/.bin/webpack-dev-server --port $(PORT) --output-public-path live-build/ --devtool inline-source-map src/editor-perseus.js

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

subperseus: clean install shorttest build shortnodetest shorteditortest webapp-put

forcesubperseus: clean install build webapp-put

put-js-ios: build
	cp $(PERSEUS_BUILD_JS) "$(IOS)/Resources/webview/javascript/perseus-package/perseus.js"

webapp-put: build
	cp $(PERSEUS_BUILD_JS) "$(WEBAPP)/javascript/perseus-package/"
	cp $(PERSEUS_NODE_BUILD_JS) "$(WEBAPP)/tools/"
	cp $(PERSEUS_EDITOR_BUILD_JS) "$(WEBAPP)/javascript/perseus-editor-package/"
	cp stylesheets/perseus-admin-package/* "$(WEBAPP)/stylesheets/perseus-admin-package"
	cp $(PERSEUS_BUILD_CSS) "$(WEBAPP)/stylesheets/exercise-content-package/"
	cp $(PERSEUS_VERSION_FILE) "$(WEBAPP)/javascript/perseus-admin-package/"


# Pull submodules if they are empty.
# This should make first-time installation easier.
# We don't pull them if they are not empty because you might have
# intentionally added commits to them, and it would be weird for
# running the server to mess around with your git status.
# (we just test kmath here as a fun sample repo. #yolo)
ifeq ("$(wildcard kmath/package.json)", "")
SUBMODULE_UPDATE := git submodule update --init
else
SUBMODULE_UPDATE := @echo "submodules already initialized"
endif

install:
ifneq ("$(SUPPRESSINSTALL)","TRUE")
	$(SUBMODULE_UPDATE)
	cnpm install
	rm -rf node_modules/react-components
	ln -s ../react-components/js node_modules/react-components
	rm -rf node_modules/kmath
	ln -s ../kmath node_modules/kmath
	rm -rf node_modules/simple-markdown
	ln -s ../simple-markdown node_modules/simple-markdown
# very hacks to prevent simple-markdown from pulling in a separate version of react.
# basically, we need its require("react") to resolve to perseus' react, instead of
# one in its node_modules (yuck!) (same for "underscore")
# TODO(aria): cry
	rm -rf simple-markdown/node_modules
	rm -rf kmath/node_modules
	rm -rf react-components/node_modules
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
FIND_TESTS := @echo "Could not figure out how to run tests; skipping"; @echo ""
endif
endif

test:
	$(FIND_TESTS) | xargs ./node_modules/.bin/mocha --reporter spec -r node/environment.js
shorttest:
	$(FIND_TESTS) | xargs ./node_modules/.bin/mocha --reporter dot -r node/environment.js
nodetest: $(PERSEUS_NODE_BUILD_JS)
	./node_modules/.bin/mocha --reporter dot node/__tests__/require-test.js
shortnodetest: $(PERSEUS_NODE_BUILD_JS)
	./node_modules/.bin/mocha --reporter dot node/__tests__/require-test.js
editortest: $(PERSEUS_BUILD_JS) $(PERSEUS_EDITOR_BUILD_JS)
	./node_modules/.bin/mocha --reporter spec -r node/environment.js node/__tests__/editor-test.js
shorteditortest: $(PERSEUS_BUILD_JS) $(PERSEUS_EDITOR_BUILD_JS)
	./node_modules/.bin/mocha --reporter dot -r node/environment.js node/__tests__/editor-test.js

build/ke.js:
	(cd ke && ../node_modules/.bin/r.js -o requirejs.config.js out=../build/ke.js)

jest: build/ke.js
	./node_modules/.bin/jest

