.PHONY: all
all: install test build

.PHONY: install
install:
	npm install

.PHONY: minify
minify: simple-markdown.min.js

.PHONY: test
test: check runtests size

.PHONY: build
build: simple-markdown.js minify

.PHONY: simple-markdown.js
simple-markdown.js: src/*
	./node_modules/.bin/rollup -c

.PHONY: check
check:
	@echo "Checking flow types..."
	./node_modules/.bin/flow
	@echo "Flow types complete."
	@echo "Checking typescript types..."
	./node_modules/.bin/tsc
	@echo "Typescript types complete."

.PHONY: runtests
runtests:
	./node_modules/.bin/mocha __tests__

.PHONY: coverage
coverage:
	./node_modules/.bin/nyc --cache=false --reporter=html --reporter=text ./node_modules/.bin/mocha __tests__

# Start a chrome debugger for test case(s). Usage:
# `make debug` or `make debug TEST="part of a test name"`
TEST?=ALL
.PHONY: debug
debug:
	@echo 'make debug'
	@echo "TEST=$(TEST)"
	@echo 'usage: `make debug` or `make debug TEST="part of a test name"`'
	@echo 'starting debugger at chrome://inspect ...'
	@echo ''
ifeq ($(TEST),ALL)
	./node_modules/.bin/mocha __tests__ --inspect-brk
else
	./node_modules/.bin/mocha __tests__ --inspect-brk --grep "$(TEST)"
endif

.PHONY: size
size:
	./node_modules/.bin/size-limit

# we shouldn't usually have phony targets for a real file, but not having this
# means that, because this file is committed to git, it can sometimes be more
# 'up to date' than simple-markdown.js even though it was compiled from an
# older version. This is a fast rule anyways, so I just made it phony to
# avoid potentially missing a compilation during an npm publish
.PHONY: simple-markdown.min.js
simple-markdown.min.js: simple-markdown.js
	uglifyjs simple-markdown.js -m -c passes=3 -b beautify=false,ascii_only=true -o simple-markdown.min.js
