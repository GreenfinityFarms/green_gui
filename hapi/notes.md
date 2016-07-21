### For now all tests are in the spec folder.
If moved, the `spec_dir` in `spec/support/jasmine.json` needs to be changed to a more general selector.

`index.js` introduced as entry point

In `server.js`:
- Changed routes to detailed variables, set all as routes with single `server.route()` call
- Commented out the Mongo mapping in `getAllSensorData`

- - -

### Node version and NVM

On my (Dan's) machine, there's currently as issue with npm where I must run:

```shell
nvm use --delete-prefix v6.2.1
```

rather than just `nvm use stable` or `nvm use 6`

I messed up an npm config at some point when configuring python, I'll update this
doc once I have it sorted out.

- - -

### Changes for getOneSensor test
added `connect` function to database interface. Not a secure solution.

Personally, I (Alexa) still can't find by simple id numberin the db, e.g. `'_id': 1`