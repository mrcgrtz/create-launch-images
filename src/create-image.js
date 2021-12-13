import fs from 'node:fs';
import invert from 'invert-color';
import canvas from 'canvas';

const {createCanvas, loadImage} = canvas;

const ICON_SCALE = 0.4;
const TEXT_OFFSET = 20;

const createImage = async ({
	// Device
	width, height, dpi,
	// Flags
	outputDir, square, font,
	// Manifest data
	name, icon, color,
}) => {
	const isPortrait = width < height;

	const canvasWidth = width * dpi;
	const canvasHeight = height * dpi;
	const canvasCenterX = Math.round(canvasWidth / 2);
	const canvasCenterY = Math.round(canvasHeight / 2);

	const iconSize = isPortrait ? Math.round(canvasWidth * ICON_SCALE) : Math.round(canvasHeight * ICON_SCALE);
	const iconCenter = Math.round(iconSize / 2);
	const iconX = canvasCenterX - iconCenter;
	const iconY = canvasCenterY - iconCenter - (TEXT_OFFSET * dpi);

	const fontSize = isPortrait ? Math.round(canvasWidth / 18) : Math.round(canvasHeight / 18);

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
		canvasCenterY + iconCenter - (TEXT_OFFSET * dpi) + TEXT_OFFSET + fontSize,
		canvasWidth - 100,
	);

	// Draw icon
	const image = await loadImage(icon);

	if (!square) {
		ctx.beginPath();
		ctx.moveTo(iconX + (iconSize / 2), iconY);
		ctx.bezierCurveTo(iconX, iconY, iconX, iconY, iconX, iconY + (iconSize / 2));
		ctx.bezierCurveTo(iconX, iconY + iconSize, iconX, iconY + iconSize, iconX + (iconSize / 2), iconY + iconSize);
		ctx.bezierCurveTo(iconX + iconSize, iconY + iconSize, iconX + iconSize, iconY + iconSize, iconX + iconSize, iconY + (iconSize / 2));
		ctx.bezierCurveTo(iconX + iconSize, iconY, iconX + iconSize, iconY, iconX + (iconSize / 2), iconY);
		ctx.closePath();
		ctx.clip();
	}

	ctx.drawImage(
		image,
		iconX,
		iconY,
		iconSize,
		iconSize,
	);

	// Write PNG file
	const fileName = `apple-launch-${width}-${height}@${dpi}x.png`;
	const out = fs.createWriteStream(`${outputDir}/${fileName}`);
	const stream = canvas.createPNGStream();
	stream.pipe(out);
	out.on('finish', () => console.log(`<link rel="apple-touch-startup-image" media="(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${dpi})" href="/${fileName}">`));
};

export default createImage;
