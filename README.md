# WumpdleV2

WumpdleV2 is a fork of [Sheltupdate](https://github.com/uwu/sheltupdate), which replicates Discord's update API for repackaged desktop clients.

Changes from Sheltupdate:
 - Every instance of WumpdleV2 is for one repackaged Discord client
 - Different branches are now only for release channel (Stable, PTB, Canary, Development, Any name here)
 - Since every host update is expected to packaged with a client mod, Wumpdle will only patch the modules used by the client.

## Deploying
1. Install WumpdleV2's dependencies with `npm install`
2. Copy `config.example.json` to `config.json` and modify it to your liking, then run `node src/index.js`.

The required files to deploy are `src`, `node_modules`, `branches`, `config.json`, `package.json`.

## Credits

Sheltupdate was originally written by [uwu.network](https://github.com/uwu).

