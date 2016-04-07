import axios from "axios";
import ReactDOM from "react-dom";
import Promise from "bluebird";

import dispatcher from "../dispatchers/dispatcher";
import Constants from "../constants/constants";

export function login() {
	const userData = {
		userID: '',
		accessToken: '',
		name: '',
		id: '',
		picture: '',
		email: '',
		posts: [],
	};

	// get user data, posts and login status from Facebook
	const promise = new Promise((resolve, reject) => {

		FB.getLoginStatus((response) => {
			if (response.status !== 'connected') {

				FB.login((callback) => {
					if (callback) {
						const {userID, accessToken} = callback.authResponse;
						userData.userID = userID;
						userData.accessToken = accessToken;

						FB.api(`/${userID}`, 'GET', 
							{ "fields": "name, email, id, picture," +
													"posts.limit(10){description, id, picture, link, name, created_time, full_picture}",
							}, 
							(response) => {
								if (response) {
									userData.posts = response.posts;
									userData.id = response.id;
									userData.name = response.name;
									userData.email = response.email;
									userData.picture = response.picture.data.url;
								} else {
									throw new Error('Error');
								};
						});		

						resolve(userData);

					} else { 
						throw new Error('Error');
					}
				});

			} else {
				console.log('Logged in');
			};

		});
	});

	return promise
	.then(data => {		
		const getPosts = setInterval(() => {
			if (data.posts.data.length > 0) {
				clearInterval(getPosts);
				dispatcher.dispatch({type: "LOAD_POSTS",  data: data.posts.data});
			}
		}, 500);
	})
	.catch(error => console.log(error));
};

export function logout() {
	FB.logout((response) => {
		console.log("You are not logged in", response);
	});
};

export function getData(url, fields) {
	dispatcher.dispatch({ type: Constants.FETCH_DATA });

	FB.api(`/${url}`, 'GET', 
		{ "fields": `${fields}` }, 
		(response) => {
	});
};


// export function showPostInfo(postId) {
// 	dispatcher.dispatch({ type: Constants.FETCH_DATA });

// 	FB.api(`/${url}`, 'GET', 
// 		{ "fields": `${fields}` }, 
// 		(response) => {
// 	});

// 	dispatcher.dispatch({ type: Constants.FETCH_DATA });
// }