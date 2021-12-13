import got from 'got';

const getManifest = async url => {
	try {
		const manifest = await got(url, {
			headers: {
				// Diguise as Safari to handle browser sniffing
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15',
			},
		}).json();

		return manifest;
	} catch {
		return undefined;
	}
};

export default getManifest;
