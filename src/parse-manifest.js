import got from 'got';
import convertCssColorNameToHex from 'convert-css-color-name-to-hex';

import {logError} from './message.js';

const isPNG = icon => icon.type === 'image/png' || icon.src.endsWith('.png');
const isMaskable = icon => icon.purpose && icon.purpose.split(' ').includes('maskable');
const isSquare = icon => {
	const size = icon.sizes && icon.sizes.split(' ')[0];
	if (size && size.includes('x')) {
		const [width, height] = size.split('x');
		return width === height;
	}

	return false;
};

const hasValidName = response => response && response.name;
const hasValidIcons = response =>
	response &&
	response.icons &&
	Array.isArray(response.icons) &&
	response.icons.find(icon => isPNG(icon) && isSquare(icon));

const getMaxSize = sizes => Number(sizes.split(' ').sort((a, b) => Number(b.split('x')[0]) - Number(a.split('x')[0])).shift().split('x')[0]);

const getLargestSquareIcon = (icons, preferMaskable) => {
	const hasMaskableIcons = icons.find(icon => isPNG(icon) && isSquare(icon) && isMaskable(icon));
	const squareIcons = icons.filter(icon => {
		// If we want to clip the image, check and return maskable icons only
		if (hasMaskableIcons && preferMaskable) {
			return isPNG(icon) && isSquare(icon) && isMaskable(icon);
		}

		// Otherwise return anything we got
		return isPNG(icon) && isSquare(icon);
	});

	// This loop is faster than .reduce()
	let max = squareIcons[0];
	const size = squareIcons.length;
	let index;
	for (index = 0; index < size; index++) {
		const {sizes: currentSizes} = squareIcons[index];
		const {sizes: maxSizes} = max;
		const currentMaxSize = getMaxSize(currentSizes);
		const maxMaxSize = getMaxSize(maxSizes);
		if (currentMaxSize > maxMaxSize) {
			max = squareIcons[index];
		}
	}

	return max;
};

const parseManifest = async (url, preferMaskable = false) => {
	try {
		const response = await got(url, {
			headers: {
				// Diguise as Safari to handle browser sniffing
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15'
			}
		}).json();

		if (!hasValidName(response)) {
			logError('No name property provided in manifest.');
			return;
		}

		if (!hasValidIcons(response)) {
			logError('No usable icons found in manifest. Please add at least one square PNG image.');
			return;
		}

		if (hasValidName(response) && hasValidIcons(response)) {
			const icon = getLargestSquareIcon(response.icons, preferMaskable);
			const iconUrl = new URL(icon.src, url);
			return {
				name: response.name,
				icon: iconUrl.href,
				color: convertCssColorNameToHex(response.background_color || 'white'),
				orientation: response.orientation || 'any'
			};
		}
	} catch {
		logError('Could not fetch manifest');
	}
};

export default parseManifest;
