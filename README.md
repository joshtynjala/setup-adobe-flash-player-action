# Github Action to setup the Adobe Flash Player

This action downloads the [Adobe Flash Player projector content debugger](https://www.adobe.com/support/flashplayer/debug_downloads.html), and adds a _flashplayer_ command to the `PATH`.

On macOS, the full path to the executable is:

_/usr/local/bin/flashplayer_

On Windows, the full path to the executable is:

_C:\AdobeFlashPlayer\flashplayer.exe_

## Example usage

```yml
uses: joshtynjala/setup-adobe-flash-player-action@v1
```
