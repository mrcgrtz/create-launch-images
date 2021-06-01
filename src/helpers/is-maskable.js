/**
 * Check if an icon has a maskable purpose.
 * @param {object} icon Manifest image resource
 * @param {string} [icon.purpose] The purpose of the image
 * @see https://w3c.github.io/manifest/#manifest-image-resources
 * @returns boolean
 */
const isMaskable = icon => (icon.purpose || '')
	.split(' ')
	.includes('maskable');

export default isMaskable;
