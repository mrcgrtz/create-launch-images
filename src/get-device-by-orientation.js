import devices from './devices.js';

/**
 * Rotate device size.
 *
 * @param {object} device        Device data
 * @param {number} device.width  Device width
 * @param {number} device.height Device height
 * @param {number} device.dpi    Device DPI
 * @return {object} Rotated device data
 */
const rotate = device => ({
	...device,
	width: device.height,
	height: device.width
});

/**
 * Get device by orientation.
 *
 * @param {"portrait" | "portrait-primary" | "portrait-secondary" | "landscape" | "landscape-primary" | "landscape-secondary" | "any"} orientation Device orientation (via manifest)
 * @return {array} Devices
 */
const getDeviceByOrientation = orientation => devices.flatMap(device => {
	// "portrait", "portrait-primary", "portrait-secondary"
	if (orientation.startsWith('portrait')) {
		return device;
	}

	// "landscape", "landscape-primary", "landscape-secondary"
	if (orientation.startsWith('landscape')) {
		return rotate(device);
	}

	// "any"
	return [device, rotate(device)];
});

export default getDeviceByOrientation;
