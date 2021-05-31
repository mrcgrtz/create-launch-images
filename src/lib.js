import fs from 'node:fs';

import {logError} from './message.js';
import getDeviceByOrientation from './get-device-by-orientation.js';
import createImage from './create-image.js';
import parseManifest from './parse-manifest.js';

const main = (url, flags) => (async () => {
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

export default main;
