# DMN-JS
This project is mirrored from https://*****:*****@gsossproxy.gsoss2.site.gs.com/goldmansachs/dmn-js.git <br/>

**The following files are GS specific files and should NOT be committed back into the dmn-js Github**
* README-INTERNAL.md
* .gs-project.yml
* .gitlab-ci.yml
* build-env.sh

## How to maintain mirrored codebase with original in Github
* New changes from external dmn-js repo: automatically updated from **(GitHub --> develop)**
* Update our internal working branch with new Camunda changes: merge **(develop --> master)**
* Contribute a change: merge **(master --> master-copy)**
* Update Github with changes: Master-copy is automatically synced to outside **(master-copy --> GitHub)**

## Developer Setup Requirements
Major version of required dependencies can be found in `ci/site.yml`
* NodeJS
	* Windows: [Devtools](https://gitlab.gs.com/dx/sdlc-tools/sdlc-installer-tools/-/blob/master/README.md)
	* Mac: Install via nix

## Running the Application
```
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
npm i --legacy-peer-deps --ignore-scripts
npm start
```
Additional scripts can be found in package.json for testing, linting, and managing dependencies of the project.

## Local Testing
This application uses karma for unit testing
```
export CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npm test
```