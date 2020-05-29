#!/usr/bin/env node

'use strict';

const meow = require('meow');
const createLaunchImages = require('./src/lib');

const cli = meow(`
		A little script to create Android-like launch images for iOS PWA’s based on a Web App Manifest.

		Usage
			$ create-launch-images <manifest-url>

		Options
			--outputDir, -o          Output directory
			--addRadius, -r          Add a radius to the app icon (prefers maskable icons)

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
`, {
	flags: {
		outputDir: {
			type: 'string',
			alias: 'o',
			default: '.'
		},
		addRadius: {
			type: 'boolean',
			alias: 'r',
			default: false
		}
	}
});

if (cli.input[0] === undefined) {
	cli.showHelp();
} else {
	createLaunchImages(cli.input[0], cli.flags);
}
