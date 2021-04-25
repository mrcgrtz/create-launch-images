const fs = require('fs');

const {logError} = require('./message');
const getDeviceByOrientation = require('./get-device-by-orientation');
const createImage = require('./create-image');
const parseManifest = require('./parse-manifest');

module.exports = (url, flags) => (async () => {
	try {
		const manifest = await parseManifest(url, flags.addRadius);
		if (manifest) {
			const {name, color, icon, orientation} = manifest;
			if (!fs.existsSync(flags.outputDir)) {
				fs.mkdirSync(flags.outputDir);
			}

			const devices = getDeviceByOrientation(orientation);
			for (const device of devices) {
				createImage({
					...device,
					...flags,
					name,
					color,
					icon
				});
			}
		}
	} catch {
		logError(`Could not parse ${url}`);
	}
})();
