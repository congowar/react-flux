import dispatcher from "../dispatchers/dispatcher";

export function getPostInfo(postId, fields) {
	const promise = new Promise((resolve, reject) => {
		dispatcher.dispatch({ type: "FETCH_COMMENTS", loading: true })

		FB.api(`/${postId}`, 
			'GET', 
			{ "fields": fields }, 
			(response) => {
				if (response) 
					resolve(response);
				else {
					throw new Error('Error');
					dispatcher.dispatch({ type: "LOAD_COMMENTS_ERROR", error: "Load comments error" })
				}
		});
	});
	return promise;
}

export function getNewPosts(url) {
	const promise = new Promise((resolve, reject) => {
		dispatcher.dispatch({ type: "FETCH_POSTS", loading: true })

		FB.api(url, 
			'GET', 
			(response) => {
				if (response) 
					resolve(response);
				else {
					throw new Error('Error');
					dispatcher.dispatch({ type: "LOAD_POSTS_ERROR", error: "Load posts error" })
				}
		});
	});
	return promise;
}

export function logout() {
	FB.getLoginStatus((response) => {
		if (response.status == 'connected') {
			FB.logout((response) => {
				console.log("You are not logged in", response);
			});
		}
	});
};


