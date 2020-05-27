const fs = require('fs');

const devices = require('./devices');
const createImage = require('./create-image');
const parseManifest = require('./parse-manifest');

module.exports = (manifestUrl, {outputDir = '.'}) => (async () => {
	try {
		const {name, color, icon} = await parseManifest(manifestUrl);
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir);
		}

		devices.forEach(async ({width, height, dpi}) => {
			createImage({
				name,
				color,
				icon,
				width,
				height,
				dpi,
				outputDir
			});
		});
	} catch {
		console.error(`❌ Could not parse ${manifestUrl}`);
	}
})();
