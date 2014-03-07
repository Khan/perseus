.PHONY: test install

mkfile_path = $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir = $(dir $(mkfile_path))
MOCHA="$(current_dir)node_modules/.bin/mocha"

test: install
	cd test && $(MOCHA) --reporter spec *-test.js

install:
	npm install
