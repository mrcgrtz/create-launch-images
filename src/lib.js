const fs = require('fs');
const logSymbols = require('log-symbols');

const devices = require('./devices');
const createImage = require('./create-image');
const parseManifest = require('./parse-manifest');

const rotate = device => ({
	...device,
	width: device.height,
	height: device.width
});

module.exports = (url, flags) => (async () => {
	try {
		const {name, color, icon, orientation} = await parseManifest(url, flags.addRadius);
		if (!fs.existsSync(flags.outputDir)) {
			fs.mkdirSync(flags.outputDir);
		}

		devices
			.flatMap(device => {
				// "portrait", "portrait-primary", "portrait-secondary"
				if (orientation.startsWith('portrait')) {
					return device;
				}

				// "landscape", "landscape-primary", "landscape-secondary"
				if (orientation.startsWith('landscape')) {
					return rotate(device);
				}

				// "any"
				return [
					device,
					rotate(device)
				];
			})
			.forEach(async device => {
				createImage({
					...device,
					...flags,
					name,
					color,
					icon
				});
			});
	} catch {
		console.error(logSymbols.error, `Could not parse ${url}`);
	}
})();
