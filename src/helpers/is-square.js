/**
 * Check if an icon is square.
 * @param {object} icon Manifest image resource
 * @param {string} [icon.sizes] The dimensions of the image
 * @see https://w3c.github.io/manifest/#declaring-multiple-icons
 * @returns boolean
 */
const isSquare = icon => {
	const size = icon.sizes && icon.sizes.split(' ').pop();
	if (size && size.includes('x')) {
		const [width, height] = size.split('x');
		return width === height;
	}

	return false;
};

export default isSquare;
