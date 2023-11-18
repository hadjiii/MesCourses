const BASE_URL = 'https://world.openfoodfacts.net';

const getProduct = async ean => {
	const params = [
		'product_name',
		'nutrition_grades',
		'image_front_small_url',
		''
	];
	const url = new URL(
		`${BASE_URL}/api/v2/product/${ean}/?fields=${params.join(',')}`
	).toString();

	console.log('fileds', params.join(','));
	console.log('URL', url);

	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			const data = await res.json();
			console.log('data', data);
			return data;
		}
		throw Error('Request error', res.body);
	} catch (err) {
		console.log('Req err', err.message);
	}
};

export { getProduct };
