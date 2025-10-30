const { ipcRenderer } = require("electron");

const originalPreload = ipcRenderer.sendSync("WumpdleV2_FRAMEWORK_ORIGINAL_PRELOAD");
if (originalPreload) require(originalPreload);

// __BRANCHES_PRELOAD__
