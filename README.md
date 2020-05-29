# create-launch-images

> A little script to create Android-like launch images for iOS PWA’s based on a Web App Manifest.

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Usage

```bash
$ npx create-launch-images --help

  A little script to create Android-like launch images for iOS PWA’s based on a Web App Manifest.

  Usage
    $ npx create-launch-images <manifest-url>

  Options
    --outputDir, -o    Output directory
    --addRadius, -r    Add a radius to the app icon (prefers maskable icons)
    --font, -f         Text font family

  Example
    $ create-launch-images https://airhorner.com/manifest.json
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-414-896@2x.png">
    <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-375-667@2x.png">
    <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/apple-launch-375-812@3x.png">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="/apple-launch-414-736@3x.png">
    <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-768-1024@2x.png">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="/apple-launch-414-896@3x.png">
    <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-834-1194@2x.png">
    <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-834-1112@2x.png">
    <link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-1024-1366@2x.png">
```

```bash
$ npx create-launch-images https://airhorner.com/manifest.json
```

### Hints for best results

* Add icons with [`purpose: 'maskable'`](https://web.dev/maskable-icon/) to your manifest and apply the `--addRadius` flag.
* Install [SF Pro Display](https://developer.apple.com/fonts/) locally for a font matching with the system UI.

## Optional installation

Using [npm](https://www.npmjs.com/get-npm):

```bash
$ npm install create-launch-images --global
```

Using [yarn](https://yarnpkg.com/):

```bash
$ yarn global add create-launch-images
```

## License

MIT © [Marc Görtz](https://marcgoertz.de/)
