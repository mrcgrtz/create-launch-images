const got = require('got');

const hasValidName = response => response && (response.name || response.short_name);
const hasValidIcons = response => response && response.icons && Array.isArray(response.icons) && response.icons.length !== 0;
const hasValidColor = response => response && response.background_color;

const isPNG = icon => icon.type === 'image/png' || icon.src.endWith('.png');
const isSquare = icon => {
	const size = icon.sizes && icon.sizes.split(' ')[0];
	const [width, height] = size.split('x');
	return width === height;
};

const getMaxSize = sizes => Number(sizes.split(' ').sort((a, b) => Number(b.split('x')[0]) - Number(a.split('x')[0])).shift().split('x')[0]);

const getLargestSquareIcon = icons => {
	const squarePNGs = icons.filter(icon => {
		return icon.purpose !== 'maskable' && isPNG(icon) && isSquare(icon);
	});

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
		const response = await got(url).json();

		if (!hasValidName(response)) {
			console.error('❌ No name or short_name given.');
			return;
		}

		if (!hasValidIcons) {
			console.error('❌ No icons given.');
			return;
		}

		if (!hasValidColor) {
			console.error('❌ No background_color given.');
			return;
		}

		if (hasValidName(response) && hasValidIcons(response) && hasValidIcons(response)) {
			const icon = getLargestSquareIcon(response.icons);
			const iconUrl = new URL(icon.src, url);
			return {
				name: response.name || response.short_name,
				icon: iconUrl.href,
				color: response.background_color
			};
		}
	} catch {
		console.error('❌ Could not fetch manifest');
	}
};
