# XDev: Project X for DevResults

This is a local-first application for internal use by DevResults staff.

- [Original pitch](http://github.com/DevResults/DevResults/issues/3518)
- [Spec for deliverable 1 (weekly updates)](http://github.com/DevResults/xdev/blob/spec-sprint-1/spec-sprint-1.md)
- Spec for deliverable 2 (hours tracking): coming soon

### Development

After cloning this repo and installing VS Code recommended extensions:

```bash
yarn
yarn dev
```

This will start a local sync server, and run `vite` in parallel to build and launch the application
with hot reloading after code changes.

![screenshot](img/screenshot-20230211.jpg)

#### Linking to local Automerge Repo codebase

[Automerge Repo](http://github.com/automerge/automerge-repo) is an important dependency that is
under active development and that we are contributing to. To link to a local copy of that codebase,
you'll first need to run the following commands in the root directory of `automerge-repo`:

```bash
yarn workspace @automerge/automerge-repo link
yarn workspace @automerge/automerge-repo-storage-indexeddb link
yarn workspace @automerge/automerge-repo-react-hooks link
yarn workspace @automerge/automerge-repo-network-websocket link
yarn workspace @automerge/automerge-repo-network-messagechannel link
```

Then in the root directory of this repository, you can run `yarn linklocal` to link to your local
code, and `yarn unlinklocal` to unlink and use the latest version published on npm.

After first cloning `automerge-repo`, and after any changes to that code, you'll need to run `yarn
build` there (or `yarn watch` to have it rebuild automatically after changes).

### Deployment

The application and sync server are deployed to Azure and are available at [xdev.devresults.com](https://xdev.devresults.com).

TODO details
