#!/bin/bash

working=`dirname $BASH_SOURCE`
os="$(uname)"

export cygwin=0
export mac=0

if [[ "$os" == "Cygwin" ]]; then
  export cygwin=1
elif [[ "$os" == "Darwin" ]]; then
  export mac=1
fi

if [[ "$cygwin" == "1" ]]; then
    echo "Looks like you're running in Cygwin - please make sure you have node-22.9.0 in your PATH variable..."
    export npm_config_sass_binary_cache="`cygpath -aw $working/../ext-lib/sassbindings`"
elif [[ "$mac" == "1" ]]; then
    echo "Looks like you're running in Mac - please make sure you have node-22.9.0 in your PATH variable..."
    CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
else
    export npm_config_sass_binary_cache="`readlink -m $working/../ext-lib/sassbindings`"

    SCSS_BUNDLER_PATH="`readlink -m $working/node_modules/scss-bundle/dist`"

    export TEST_BROWSERS="ChromeHeadless_Linux"
    export COVERAGE=true

fi

export PATH="${SCSS_BUNDLER_PATH}:${PATH}"

export PUPPETEER_EXECUTABLE_PATH=$CHROME_BIN
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)

echo "scss bundler path: $SCSS_BUNDLER_PATH"
echo "Node version:      $NODE_VERSION"
echo "NPM version:       $NPM_VERSION"
echo "SASS binary path:  $npm_config_sass_binary_cache"

if [ ! -d "node_modules" ]; then
  npm config set registry http://npmscopes.site.gs.com
  npm ci --legacy-peer-deps
fi

echo "Building Workflow DMN Modeler App"

if [[ "$1" == "autoqa" ]]; then
    npm run ci
fi
