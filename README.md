# p5.js 3D Screensaver

This project generates an evolving 3D artwork using p5.js with a custom GLSL
shader. Each time the screensaver launches it randomises its layout so the
pattern is always unique.

## Running

1. Install [Node.js](https://nodejs.org/) and npm.
2. Install dependencies (requires network access):
   ```
   npm install
   ```
3. Start the screensaver in a window:
   ```
   npm start
   ```

The sketch runs full screen when opened with Electron.

## Packaging for Windows

To turn this project into a Windows screensaver:

1. Install `electron-packager` globally:
   ```
   npm install --global electron-packager
   ```
2. Package the application:
   ```
   electron-packager . p5Screensaver --platform=win32 --arch=x64 --overwrite
   ```
3. Inside the generated `p5Screensaver-win32-x64` folder, rename the produced
   `.exe` file to `.scr` and move it to your Windows system directory.

When launched, the screensaver displays animated boxes coloured by a shader.
Their motion is affected by neighbouring boxes, producing a unique scene each
run.
