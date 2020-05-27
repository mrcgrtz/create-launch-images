const {createCanvas, loadImage} = require('canvas');
const invert = require('invert-color');
const fs = require('fs');

const ICON_SCALE = 0.4;
const ICON_OFFSET = 20;
const ICON_RADIUS = 0.24;

module.exports = async ({width, height, dpi, name, icon, color = '#fff', font = 'SF Pro Display', outputDir}) => {
	const isPortrait = width < height;

	const canvasWidth = width * dpi;
	const canvasHeight = height * dpi;
	const canvasCenterX = Math.round(canvasWidth / 2);
	const canvasCenterY = Math.round(canvasHeight / 2);

	const iconSize = isPortrait ? Math.round(canvasWidth * ICON_SCALE) : Math.round(canvasHeight * ICON_SCALE);
	const iconCenter = Math.round(iconSize / 2);
	const iconX = canvasCenterX - iconCenter;
	const iconY = canvasCenterY - iconCenter - (ICON_OFFSET * dpi);
	const radius = Math.round(iconSize * ICON_RADIUS);

	const fontSize = Math.round(canvasWidth / 18);

	const canvas = createCanvas(canvasWidth, canvasHeight);
	const ctx = canvas.getContext('2d');

	// Apply background color
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	// Apply text
	ctx.font = `500 ${fontSize}px '${font}', sans-serif`;
	ctx.fillStyle = invert(color, true);
	ctx.textAlign = 'center';
	ctx.fillText(
		name,
		canvasCenterX,
		canvasCenterY + iconCenter - (ICON_OFFSET * dpi) + ICON_OFFSET + fontSize,
		canvasWidth - 100
	);

	// Draw rounded icon
	const image = await loadImage(icon);
	ctx.beginPath();
	ctx.moveTo(iconX + radius, iconY);
	ctx.lineTo(iconX + iconSize - radius, iconY);
	ctx.quadraticCurveTo(iconX + iconSize, iconY, iconX + iconSize, iconY + radius);
	ctx.lineTo(iconX + iconSize, iconY + iconSize - radius);
	ctx.quadraticCurveTo(iconX + iconSize, iconY + iconSize, iconX + iconSize - radius, iconY + iconSize);
	ctx.lineTo(iconX + radius, iconY + iconSize);
	ctx.quadraticCurveTo(iconX, iconY + iconSize, iconX, iconY + iconSize - radius);
	ctx.lineTo(iconX, iconY + radius);
	ctx.quadraticCurveTo(iconX, iconY, iconX + radius, iconY);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(
		image,
		iconX,
		iconY,
		iconSize,
		iconSize
	);

	// Write PNG file
	const fileName = `apple-launch-${width}-${height}@${dpi}x.png`;
	const out = fs.createWriteStream(`${outputDir}/${fileName}`);
	const stream = canvas.createPNGStream();
	stream.pipe(out);
	out.on('finish', () => console.log(`<link rel="apple-touch-startup-image" media="(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${dpi})" href="/${fileName}">`));
};
