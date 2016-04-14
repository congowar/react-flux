import axios from "axios";
import ReactDOM from "react-dom";
import Promise from "bluebird";
import * as API from "../api/userApi";

import dispatcher from "../dispatchers/dispatcher";
import Constants from "../constants/constants";

export function login() {
	const userData = {
		name: '',
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
						const {userID } = callback.authResponse;

						dispatcher.dispatch({ type: "FETCH_POSTS",  loading: true });

						FB.api(`/${userID}`, 'GET', 
							{ 
								"fields": "name, email, id, picture," +
													"posts.limit(10){description, parent_id, link, name, created_time, full_picture}"
							}, 
							(response) => {
								if (response) {
									userData.posts = response.posts;
									userData.name = response.name;
									userData.email = response.email;
									userData.picture = response.picture.data.url;
								} else {
									throw new Error('Error');
									dispatcher.dispatch({ type: "LOAD_POSTS_ERROR",  error: "Load post error" });
								};
							}
						);		

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
		const checkResponse = setInterval(() => {
			if (data.hasOwnProperty('posts')) {
				clearInterval(checkResponse);

				dispatcher.dispatch({ 
					type: "LOAD_POSTS_SUCCESS", 
					data: { 
						email: data.email, 
						name: data.name,
						picture: data.picture,
						posts: data.posts.data,
						paging: data.posts.paging
					}, 
				});
			};
		}, 500);
	})
	.catch(error => console.log(error));
};

export function showPostInfo(postId, fields) {
	const requestResult = API.getPostInfo(postId, fields)
	requestResult
	.then((data) => {
		dispatcher.dispatch({ 
			type: "LOAD_COMMENTS_SUCCESS",  
			comments: data,
		});
	})
	.catch(error => console.log(error));
};

export function getNewPosts(url) {
	const requestResult = API.getNewPosts(url);
	requestResult
	.then((data) => {
		console.log(data);
		dispatcher.dispatch({ 
			type: "LOAD_POSTS_SUCCESS",  
			data: { posts: data.data, paging: data.paging },
		});
	})
	.catch(error => console.log(error));
};

export function logout() {
	return API.logout();
};