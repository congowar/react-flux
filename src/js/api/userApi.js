export function getPostInfo(url, fields) {
	const promise = new Promise((resolve, reject) => {
		FB.api(`/${url}`, 
			'GET', 
			{ "fields": fields }, 
			(response) => {
				if (response) 
					resolve(response);
				else
					throw new Error('Error');
		});
	});
	return promise;
}