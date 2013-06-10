#!/bin/sh

if test -f .webapp
then
    webapp=$(cat .webapp)
else
    echo "Enter the directory of the webapp. Leave blank for ../webapp"
    read -p "(default: ../webapp) > " webapp
    test "X$webapp" = X && webapp=../webapp
    echo "$webapp" > .webapp
fi

case $1 in
    get-css)
        pwd=$(pwd)
        cd "$webapp"
        make css
        cd "$pwd"
        manifest="$webapp/genfiles/stylesheets-packages-compressed.json"
        shared=$(node stylesheets/get_css_name.js "$manifest")

        sp="stylesheets/shared-package"
        mkdir -p "$sp"
        cp "$webapp/$sp/mixins.less" "$sp"
        cp "$webapp/$sp/variables.less" "$sp"
        cp "$webapp/$sp/$shared" stylesheets/shared.css

        bp="stylesheets/bootstrap-package"
        test -d "$bp" && rm -r "$bp"
        cp -R "$webapp/$bp" "$bp"
        ;;

    put-js)
        cp build/perseus.min.js "$webapp/javascript/perseus-package"
        ;;

    put-css)
        pp="$webapp/stylesheets/perseus-package"
        test -d "$pp" && rm -r "$pp"
        cp -R stylesheets/perseus-package "$webapp/stylesheets"
        cp stylesheets/exercise-content-package/perseus.less "$webapp/stylesheets/exercise-content-package"
        ;;
esac
