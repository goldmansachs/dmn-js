# DMN-JS

This project is mirrored from https://*****:*****@gsossproxy.gsoss2.site.gs.com/goldmansachs/dmn-js.git

## The following files are GS specific files and should NOT be committed back into the dmn-js Github

* README-INTERNAL.md
* .gs-project.yml
* .gitlab-ci.yml
* build-env.sh

## How to maintain mirrored codebase with original in Github

* New changes from external dmn-js repo: automatically updated from **(GitHub --> develop)**
* Update our internal working branch with new Camunda changes: merge **(develop --> master)**
* Contribute a change: merge **(master --> master-copy)**
* Update Github with changes: Master-copy is automatically synced to outside **(master-copy --> GitHub)**

## How to push your changes to GitHub through master-copy branch (Temporary Fix)

**Note: Changes to the master copy can only be made by one person at a time to prevent overwriting others' changes.**

### Internal Gitlab project changes

1. **Create a Feature Branch**
   * Create a new feature branch from the latest master branch.
   * Example: `git checkout -b faroua-feature master`

2. **Implement Changes**
   * Implement your changes and push them to your feature branch.
   * Example: `git push origin faroua-feature`

3. **Create a Merge Request (MR)**
   * Create a new MR from your feature branch into master.
   * Example: `faroua-feature -> master`
   * Send the MR for review and address any review comments.

4. **Squash and Merge**
   * Once the MR is approved, squash your commits and merge your changes into master.
   * Squashing commits helps maintain a clean history and simplifies cherry-picking.

5. **Create a Personal Master Branch**
   * Create a new personal master branch from master-copy.
   * Example: `git checkout -b faroua-master master-copy`

6. **Cherry-Pick Changes**
   * Cherry-pick your squashed commit from master into your personal master branch.
   * Example: `git cherry-pick <commit-hash>`

7. **Add Configuration Files (if necessary)**
   * Add any required configuration files to pass the pipeline.
   * [`.gitlab-ci.yml`](https://gitlab.aws.site.gs.com/workflow/workflow-modellers/dmn-js/-/blob/f50da7f318e6801f39c38c9d8c08ddc6fa7531fa/.gitlab-ci.yml)
   * [`.gs-project.yml`](https://gitlab.aws.site.gs.com/workflow/workflow-modellers/dmn-js/-/blob/f50da7f318e6801f39c38c9d8c08ddc6fa7531fa/.gs-project.yml)

8. **Create a Merge Request into Master-Copy**
   * Create a new MR from your personal master branch into master-copy
   * Example: `faroua-master -> master-copy`
   * Send the MR for review and address any review comments.

9. **Squash and Merge into Master-Copy**
   * Once the MR is approved, squash your commits and merge your changes into master-copy.
   * Squashing commits helps maintain a clean history and simplifies cherry-picking.

### External Github project changes

1. **Fork and Create a Branch**
   * Access the external GitHub project from the Goldman Sachs group.
   * Create a new fork and a new branch from the master-copy branch using your personal account.

2. **Remove GS Configuration Files**
   * Before raising the PR, remove any GS-specific configuration files.
   * Examples: `.gitlab-ci.yml`, `.gs-project.yml`

### Internal Gitlab project Sync After Changes

1. **Reset and Sync Master-Copy**
   * After finishing your changes, reset master-copy and sync it back with develop.
   * This ensures other developers can push their changes outside individually.

   ```bash
   git reset --hard develop
   git push origin master-copy --force
   ```

## Developer Setup Requirements

Major version of required dependencies can be found in `ci/site.yml`

* NodeJS
  * Windows: [Devtools](https://gitlab.gs.com/dx/sdlc-tools/sdlc-installer-tools/-/blob/master/README.md)
  * Mac: Install via nix

## Running the Application

```bash
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
npm i --legacy-peer-deps --ignore-scripts
npm start
```

Additional scripts can be found in package.json for testing, linting, and managing dependencies of the project.

## Local Testing

This application uses karma for unit testing

```bash
export CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npm test
```
