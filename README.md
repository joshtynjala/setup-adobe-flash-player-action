# Github Action to setup the Adobe Flash Player

This action downloads the _Adobe Flash Player projector content debugger_, and adds a **flashplayer** command to the `PATH`.

On macOS, the full path to the executable is:

_/usr/local/bin/flashplayer_

On Windows, the full path to the executable is:

_C:\AdobeFlashPlayer\flashplayer.exe_

## Example usage

```yml
uses: joshtynjala/setup-adobe-flash-player-action@v1
```
