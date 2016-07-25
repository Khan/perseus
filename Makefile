.PHONY: help build watch fastbuild serve server server-offline install clean lint test shorttest nodetest shortnodetest editortest shorteditortest jest
PORT=9000
SUPPRESSINSTALL=FALSE

PERSEUS_BUILD_JS=build/perseus.js
PERSEUS_SLIM_JS=build/perseus-slim.js
PERSEUS_BUILD_CSS=build/perseus.css
PERSEUS_DEMO_BUILD_JS=build/demo-perseus.js
PERSEUS_NODE_BUILD_JS=build/node-perseus.js
PERSEUS_EDITOR_BUILD_JS=build/editor-perseus.js
PERSEUS_FRAME_BUILD_JS=build/frame-perseus.js
PERSEUS_VERSION_FILE=build/perseus-item-version.js
MIN_PERSEUS_BUILD=build/perseus.min.js

help:
	@echo "make server PORT=9000         # runs the perseus server"
	@echo "make server-offline PORT=9000 # runs the perseus server"
	@echo "make build                    # runs tests and compiles into $(PERSEUS_BUILD_JS), $(PERSEUS_BUILD_CSS), $(PERSEUS_NODE_BUILD_JS), $(PERSEUS_EDITOR_BUILD_JS), and $(PERSEUS_FRAME_BUILD_JS)"
	@echo "make watch                    # builds $(PERSEUS_BUILD_JS) and $(PERSEUS_EDITOR_BUILD_JS) and watches files for changes"
	@echo "make clean                    # delete all compilation artifacts"
	@echo "make test                     # run all tests"
	@echo "# NOTE: you can append SUPPRESSINSTALL=TRUE to avoid running npm install. Useful if you temporarily have no internet."

build: clean install lint shorttest $(PERSEUS_SLIM_JS) $(PERSEUS_BUILD_JS) $(PERSEUS_NODE_BUILD_JS) $(PERSEUS_EDITOR_BUILD_JS) $(PERSEUS_FRAME_BUILD_JS) $(PERSEUS_BUILD_CSS) $(PERSEUS_VERSION_FILE) shortnodetest shorteditortest
watch: install
	./watch.sh

fastbuild:
	echo "Use `make watch` instead!"

define minify
./node_modules/.bin/uglifyjs $1 --mangle -r '$,$_,i18n' --beautify beautify=0,semicolons=0 -o $2
endef

define add_git_meta
echo "// commit `git rev-parse HEAD`" >> $1
echo "// branch `git rev-parse --abbrev-ref HEAD`" >> $1
echo "// @gene""rated" >> $1
endef

minify: $(MIN_PERSEUS_BUILD)

$(MIN_PERSEUS_BUILD): $(PERSEUS_BUILD_JS)
	$(call minify,$(PERSEUS_BUILD_JS),$@)

# TODO(jared): remove this once all clients can handle the slim version
$(PERSEUS_BUILD_JS): install
	mkdir -p build
	NOT_SLIM=1 NODE_ENV=production ./node_modules/.bin/webpack
	mv $@ $@.tmp
	echo '/*! Perseus | http://github.com/Khan/perseus */' > $@
	$(call add_git_meta,$@)
	cat $@.tmp >> $@
	rm $@.tmp

$(PERSEUS_SLIM_JS): install
	mkdir -p build
	NODE_ENV=production ./node_modules/.bin/webpack
	mv $@ $@.tmp
	echo '/*! Perseus | http://github.com/Khan/perseus */' > $@
	$(call add_git_meta,$@)
	cat $@.tmp >> $@
	rm $@.tmp

$(PERSEUS_NODE_BUILD_JS): install
	mkdir -p build
	NODE_ENV=production INCLUDE_EDITORS=true ./node_modules/.bin/webpack --config webpack.config.node-perseus.js
	mv $@ $@.tmp
	echo '/*! Nodeified Perseus | http://github.com/Khan/perseus */' > $@
	$(call add_git_meta,$@)
	cat $@.tmp >> $@
	rm $@.tmp


$(PERSEUS_DEMO_BUILD_JS): install
	mkdir -p build
	NODE_ENV=production INCLUDE_EDITORS=true ./node_modules/.bin/webpack --config webpack.config.demo-perseus.js
	mv $@ $@.tmp
	echo '/*! Demo perseus | http://github.com/Khan/perseus */' > $@
	$(call add_git_meta,$@)
	cat $@.tmp >> $@
	rm $@.tmp

$(PERSEUS_EDITOR_BUILD_JS): install
	mkdir -p build
	NODE_ENV=production INCLUDE_EDITORS=true ./node_modules/.bin/webpack
	mv $@ $@.tmp
	echo '/*! Perseus with editors | http://github.com/Khan/perseus */' > $@
	$(call add_git_meta,$@)
	cat $@.tmp >> $@
	rm $@.tmp

$(PERSEUS_FRAME_BUILD_JS): install
	mkdir -p build
	NODE_ENV=production PERSEUS_FRAME=true ./node_modules/.bin/webpack
	mv $@ $@.tmp
	echo '/*! Perseus with editors for frame | http://github.com/Khan/perseus */' > $@
	$(call add_git_meta,$@)
	cat $@.tmp >> $@
	rm $@.tmp

$(PERSEUS_BUILD_CSS): install
	mkdir -p build
	echo '/* Perseus CSS' > $@
	$(call add_git_meta,$@)
	echo '*/' >> $@
	./node_modules/.bin/lessc stylesheets/exercise-content-package/perseus.less >> $@

$(PERSEUS_VERSION_FILE): install
	mkdir -p build
	echo '// Perseus Version File' > $@
	$(call add_git_meta,$@)
	node node/create-item-version-file.js >> $@

serve: server
server: install server-offline

server-offline:
	(sleep 1; echo; echo http://localhost:$(PORT)/) &
	INCLUDE_EDITORS=true __DEV__=true ./node_modules/.bin/webpack-dev-server --config webpack.config.demo-perseus.js --port $(PORT) --output-public-path build/ --devtool inline-source-map

demo:
	if [ -z $$TRAVIS ]; then echo "make demo must be run on travis"; exit 1; fi
	git remote set-branches --add origin gh-pages # Travis only contains Master, so gh-pages must be added
	git fetch origin
	git checkout -B gh-pages origin/gh-pages
	git reset --hard origin/master
	make build/demo-perseus.js
	git add -f build/demo-perseus.js
	git config user.name "Emily Eisenberg" # Git requires an author for the commit
	git config user.email "emily@khanacademy.org"
	git commit -nm 'demo update'
	git checkout origin/master
	# We now need to push using a specific SSH key, which is authorized to edit the repository
	ssh-agent bash -c 'ssh-add travis_deploy_rsa; git push -f git@github.com:Khan/perseus.git gh-pages:gh-pages'

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
	npm install
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
# Use --production so that math-input doesn't install any devDepedencies, which
# include React and friends.
	cd math-input && npm install --production && cd ..

# Cleans up node modules in math-input that are added through npm install in the
# submodule, but shouldn't be used because Perseus's copy should be used instead.
	rm -rf math-input/node_modules/react
	rm -rf math-input/node_modules/react-dom
	rm -rf math-input/node_modules/react-addons-*
endif

clean:
	-rm -rf build/*

lint:
	ka-lint

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
