/**
 * Check if an icon is of the PNG type.
 * @param {object} icon Manifest image resource
 * @param {string} icon.src The path to the image file
 * @param {string} [icon.type] The media type of the image
 * @see https://w3c.github.io/manifest/#declaring-multiple-icons
 * @returns boolean
*/
const isPNG = icon => icon.type === 'image/png' || (icon.src || '').endsWith('.png');

export default isPNG;
