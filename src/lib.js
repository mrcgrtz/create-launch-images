const fs = require('fs');
const logSymbols = require('log-symbols');

const devices = require('./devices');
const createImage = require('./create-image');
const parseManifest = require('./parse-manifest');

module.exports = (url, flags) => (async () => {
	try {
		const {name, color, icon} = await parseManifest(url, flags.addRadius);
		if (!fs.existsSync(flags.outputDir)) {
			fs.mkdirSync(flags.outputDir);
		}

		devices.forEach(async device => {
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
