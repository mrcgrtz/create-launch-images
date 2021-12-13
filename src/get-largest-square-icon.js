import isPNG from './helpers/is-png.js';
import isSquare from './helpers/is-square.js';
import isMaskable from './helpers/is-maskable.js';

const getMaxSize = sizes => Number(sizes.split(' ').sort((a, b) => Number(b.split('x')[0]) - Number(a.split('x')[0])).shift().split('x')[0]);

const getLargestSquareIcon = (icons, maskable = 'auto') => {
	const validatedMaskable = (maskable !== 'yes' && maskable !== 'no' && maskable !== 'yes') ? 'auto' : maskable;
	const hasSuitableIcons = icons.find(icon => isPNG(icon) && isSquare(icon) && isMaskable(icon));
	const squareIcons = icons.filter(icon => {
		// If we want to clip the image, check and return maskable icons only
		if (hasSuitableIcons && validatedMaskable === 'yes') {
			return isPNG(icon) && isSquare(icon) && isMaskable(icon);
		}

		if (hasSuitableIcons && validatedMaskable === 'no') {
			return isPNG(icon) && isSquare(icon) && !isMaskable(icon);
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

export default getLargestSquareIcon;
