.PHONY: build clean

build:
	grunt

all: clean update build put

concat:
	grunt shell:jsx concat

put: put-js put-css

get: get-css

get-css:
	./operations.sh get-css

put-js:
	./operations.sh put-js

put-css:
	./operations.sh put-css

update:
	npm install

clean:
	-rm -rf build/*
