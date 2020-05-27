const logSymbols = require('log-symbols');
const got = require('got');
const convertCssColorNameToHex = require('convert-css-color-name-to-hex');

const hasValidName = response => response && (response.name || response.short_name);
const hasValidIcons = response => response && response.icons && Array.isArray(response.icons) && response.icons.length !== 0;
const hasValidColor = response => response && response.background_color;

const isPNG = icon => icon.type === 'image/png' || icon.src.endsWith('.png');
const isSquare = icon => {
	const size = icon.sizes && icon.sizes.split(' ')[0];
	if (size && size.includes('x')) {
		const [width, height] = size.split('x');
		return width === height;
	}

	return false;
};

const getMaxSize = sizes => Number(sizes.split(' ').sort((a, b) => Number(b.split('x')[0]) - Number(a.split('x')[0])).shift().split('x')[0]);

const getLargestSquareIcon = icons => {
	const squarePNGs = icons.filter(icon =>
		icon.purpose !== 'maskable' && isPNG(icon) && isSquare(icon)
	);

	// This loop is faster than .reduce()
	let max = squarePNGs[0];
	const size = squarePNGs.length;
	let index;
	for (index = 0; index < size; index++) {
		const {sizes: currentSizes} = squarePNGs[index];
		const {sizes: maxSizes} = max;
		const currentMaxSize = getMaxSize(currentSizes);
		const maxMaxSize = getMaxSize(maxSizes);
		if (currentMaxSize > maxMaxSize) {
			max = squarePNGs[index];
		}
	}

	return max;
};

module.exports = async url => {
	try {
		const response = await got(url, {
			headers: {
				// Diguise as Safari to handle browser sniffing
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15'
			}
		}).json();

		if (!hasValidName(response)) {
			console.error(logSymbols.error, 'No name or short_name given.');
			return;
		}

		if (!hasValidIcons(response)) {
			console.error(logSymbols.error, 'No icons given.');
			return;
		}

		if (!hasValidColor(response)) {
			console.error(logSymbols.error, 'No background_color given.');
			return;
		}

		if (hasValidName(response) && hasValidIcons(response) && hasValidIcons(response)) {
			const icon = getLargestSquareIcon(response.icons);
			const iconUrl = new URL(icon.src, url);
			return {
				name: response.name || response.short_name,
				icon: iconUrl.href,
				color: convertCssColorNameToHex(response.background_color)
			};
		}
	} catch {
		console.error(logSymbols.error, 'Could not fetch manifest');
	}
};
