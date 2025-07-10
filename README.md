# sheltupdate

sheltupdate is a fork of [GooseUpdate](https://github.com/goose-nest/gooseupdate),
which replicates Discord's update API, and injects mods and tweaks into the served modules.

Changes from GooseUpdate:
 - Fixes to bring it up to date for 2024
 - Different branches, for use with shelter
 - Hugely refactored and converted to use much more modern technology
	(axios -> fetch, fastify -> hono, etc.)
 - A more robust patch system that improves multi-mod support

# Branches

Check the [shelter documentation](https://github.com/uwu/shelter/blob/main/README.md) for install instructions.

The [uwu.network instance](https://inject.shelter.uwu.network) of sheltupdate hosts the branches exactly as found in this repository:
 - `shelter` - injects shelter
 - `vencord` - injects Vencord
 - `betterdiscord` - injects BetterDiscord
 - `moonlight` - injects Moonlight
 - `reactdevtools` - adds React Developer Tools to your client
 - `spotify_embed_volume` - adds a volume slider to Spotify embeds
 - `yt_ad_block` - removes ads in embeds and in the Watch Together activity
 - `yt_embed_fix` - makes more videos viewable from within Discord (like UMG blocked ones)
 - `native_titlebar` - replaces Discord's custom titlebar with Windows' native one

# Deploying
1. Install SheltUpdate's dependencies with `npm install`
2. Copy `config.example.json` to `config.json` and modify it to your liking, then run `node src/index.js`.

The required files to deploy are `src`, `node_modules`, `branches`, `config.json`, `package.json` and `CHANGELOG.md`.

## Deploying with Docker

Run the container as so:
```sh
docker run -v /path/to/your/config.json:/config.json --tmpfs /tmp -p 8080:8080 ghcr.io/uwu/sheltupdate
```

The `--tmpfs` flag is available only on Linux hosts, and omitting it will not break sheltupdate, but will cause the
sheltupdate cache to be left on your system, inflating disk use over time.

In a docker compose file, you specify this with:
```yml
services:
  sheltupdate:
    # rest of entry omitted here
    tmpfs:
     - /tmp
```

This step prevents the sheltupdate cache hitting the disk in practice, and therefore no resource leaks will happen when
the container is restarted without being torn down and restored fresh.

# Usage
Discord fetches the update API URL from a `settings.json` file stored in various directories depending on your operating system.

Said directories are found below:
* Windows:
  * `%appdata%\discord<channel>\settings.json`
* Mac:
  * `~/Library/Application Support/discord<channel>/settings.json`
* Linux:
  * Package Manager/tar.gz Installation: `~/.config/discord<channel>/settings.json`
  * Flatpak: `~/.var/app/com.discordapp.Discord/config/discord<channel>/settings.json`

Set `UPDATE_ENDPOINT` and `NEW_UPDATE_ENDPOINT` in `settings.json` as follows:

```json
"UPDATE_ENDPOINT": "https://<instance URL>/branch"
"NEW_UPDATE_ENDPOINT": "https://<instance URL>/branch/"
```

SheltUpdate also supports including multiple branches in updates by separating their names with a `+`, like `https://<instance URL>/branch1+branch2`.

# Adding a branch
SheltUpdate branches patch `discord_desktop_core` with files stored in `branches/<branch category>/<branch name>/`.

Branches must have a `main.js` file to handle their injection in their branch directory, which is prepended to Discord's base `index.js` of the module.

They must have a `meta.js` file that exports a `name` and `description`, and can optionally export a `setup` function,
which may be asynchronous and will be periodically run. Use this to download other branch files you need.
As arguments, you will be passed an absolute path to a folder to leave your files in,
which on scheduled setup reruns *may or may not* contain your previous set-up files, and a log function.
You have access to node and `@electron/asar`.

They may optionally include a `preload.js` file to supplement their injection,
which will automatically be injected for you by sheltupdate.

sheltupdate will not automatically pick up and inject anything into the renderer, but it is trivial to implement this
in your preload.

```javascript
// main.js
require('mod.js')
```

```javascript
// preload.js (optional)
const { webFrame } = require("electron");

webFrame.top.executeJavaScript("console.log('HELLO FROM THE RENDERER');");
```

If other files are in the branch directory, they will be added the module directory.

# Credits

GooseUpdate was originally written by [Ducko](https://github.com/CanadaHonk/).

The shelter desktop injector has been contributed to by most of uwu.network at this point,
and is the basis of the `shelter` branch here.

The `vencord` branch is very very loosely based on the [Kernel vencord loader](https://github.com/kernel-addons/vencord-loader/blob/master/main.js).

![](https://github.com/catppuccin/catppuccin/raw/main/assets/footers/gray0_ctp_on_line.svg)

sheltupdate is a passion project made with love, primarily by [Hazel](https://github.com/yellowsink) and [wiz](https://github.com/ioj4),
with help from other uwu.network contributors.
