const core = require("@actions/core");
const toolCache = require("@actions/tool-cache");
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

async function setupAdobeFlashPlayer() {
  try {

    var installLocation = process.platform.startsWith("win")
      ? "c:\\AdobeFlashPlayer"
      : "/usr/local/bin";

    var filename = null;
    if (process.platform.startsWith("darwin")) {
      filename = "flashplayer_32_sa_debug.dmg";
    } else if (process.platform.startsWith("win")) {
      filename = "flashplayer_32_sa_debug.exe";
    } else if (process.platform.startsWith("linux")) {
      filename = "flash_player_sa_linux_debug.x86_64.tar.gz";
    } else {
      throw new Error("Adobe Flash Player setup is not supported on this platform");
    }

    var archiveUrl = `https://fpdownload.macromedia.com/pub/flashplayer/updaters/32/${filename}`;

    var downloadedPath = await toolCache.downloadTool(archiveUrl, filename);

    if (process.platform.startsWith("darwin")) {
      const executableLocation = path.resolve(installLocation, "flashplayer");
      child_process.execSync(`hdiutil attach ${filename}`);
      child_process.execSync(`cp -r /Volumes/Flash\\ Player/* /Applications`);
      child_process.execSync(`echo -e \"#\\!/bin/bash\\n/Applications/Flash\\\\ Player.app/Contents/MacOS/Flash\\\\ Player\\\\ Debugger \\$@\" > ${executableLocation}`);
      child_process.execSync(`chmod +x ${executableLocation}`);
    } else if (process.platform.startsWith("win")) {
      const executableLocation = path.resolve(installLocation, "flashplayer.exe");
      fs.mkdirSync(installLocation);
      child_process.execSync(`copy ${downloadedPath} ${executableLocation}`);
      core.addPath(installLocation);
    } else if (process.platform.startsWith("linux")) {
      const extractedLocation = path.resolve(installLocation, "flashplayerdebugger");
      const executableLocation = path.resolve(installLocation, "flashplayer");
      child_process.execSync(`tar -zxvf ${downloadedPath} flashplayerdebugger -C ${installLocation}`);
      child_process.execSync(`mv ${extractedLocation} ${executableLocation}`);
      core.addPath(installLocation);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}
setupAdobeFlashPlayer();
