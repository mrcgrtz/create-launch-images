import convertCssColorNameToHex from 'convert-css-color-name-to-hex';
import isPNG from './helpers/is-png.js';
import isSquare from './helpers/is-square.js';
import getLargestSquareIcon from './get-largest-square-icon.js';

const hasValidName = response => response && response.name;
const hasValidIcons = response =>
	response
	&& response.icons
	&& Array.isArray(response.icons)
	&& response.icons.find(icon => isPNG(icon) && isSquare(icon));

const parseManifest = async (manifest, url, maskable = 'auto') => {
	if (!hasValidName(manifest)) {
		console.error('No name property provided in manifest.');
		return;
	}

	if (!hasValidIcons(manifest)) {
		console.error('No usable icons found in manifest. Please add at least one square PNG image.');
		return;
	}

	const icon = getLargestSquareIcon(manifest.icons, maskable);
	const iconUrl = new URL(icon.src, url);
	return {
		name: manifest.name,
		icon: iconUrl.href,
		color: convertCssColorNameToHex(manifest.background_color || 'white').toLowerCase(),
		orientation: manifest.orientation || 'any',
	};
};

export default parseManifest;
