const core = require("@actions/core");
const toolCache = require("@actions/tool-cache");
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

async function setupAdobeFlashPlayer() {
  try {

    var installLocation = process.platform.startsWith("win")
      ? "c:\\AdobeFlashPlayer"
      : "/Applications";

    var filename = null;
    if (process.platform.startsWith("darwin")) {
      filename = "flashplayer_32_sa_debug.dmg";
    } else if (process.platform.startsWith("win")) {
      filename = "flashplayer_32_sa_debug.exe";
    } else {
      throw new Error("Adobe Flash Player setup is not supported on Linux");
    }

    var archiveUrl = `https://fpdownload.macromedia.com/pub/flashplayer/updaters/32/${filename}`;

    var downloadedPath = await toolCache.downloadTool(archiveUrl, filename);

    if (process.platform.startsWith("darwin")) {
      child_process.execSync("hdiutil attach " + filename);
      child_process.execSync("cp -r /Volumes/Flash\\ Player/* " + installLocation);
      child_process.execSync("echo -e \"#\\!/bin/bash\\n/Applications/Flash\\\\ Player.app/Contents/MacOS/Flash\\\\ Player\\\\ Debugger \\$@\" > /usr/local/bin/flashplayer");
      child_process.execSync("cmod +x /usr/local/bin/flashplayer");
    } else if (process.platform.startsWith("win")) {
      fs.mkdirSync(installLocation);
      child_process.execSync("copy " + downloadedPath + " " + path.resolve(installLocation, "flashplayer.exe"));
      core.addPath(installLocation);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}
setupAdobeFlashPlayer();
