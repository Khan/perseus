.PHONY: build

build:
	grunt

all: get build put

put: put-js put-css

get: get-css

get-css:
	./operations.sh get-css

put-js:
	./operations.sh put-js

put-css:
	./operations.sh put-css
