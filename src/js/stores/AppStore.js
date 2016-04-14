import { EventEmitter } from "events";

import dispatcher from "../dispatchers/dispatcher";

class AppStore extends EventEmitter {
	constructor() {
		super();
		this.error = null;
		this.loading = false;
		this.paging = {};
		this.posts = [];
		this.userData = {
			name: '',
			email: '',
			picture: ''
		};
	}

	getPosts() {
		return this.posts;
	}

	getPaging() {
		return this.paging;
	}
	
	getUserData() {
		return this.userData;
	}

	addPosts(posts) {
		posts.forEach((current, i) => {
			current.comments = {};
			this.posts.push(current);
		})
	}

	addComments(data) {
		const { id, comments } = data;
		this.posts.map((current, index) => {

			if (id === current.parent_id) {
				if (current.comments.hasOwnProperty('data') && current.comments.length > 0) {
				} else {
					current.comments = comments;
				};
			}
		});
	}

	handleActions(action) {
		switch(action.type) {
			case "FETCH_POSTS":
				this.loading = action.loading;
				this.emit("change");
				break;

			case "LOAD_POSTS_SUCCESS":
				this.addPosts(action.data.posts);

				this.userData.name = action.data.name;
				this.userData.email = action.data.email;
				this.userData.picture = action.data.picture;
				this.paging = action.data.paging;
				this.loading = false;
				this.emit("change");
				break;

			case "LOAD_POSTS_ERROR":
				this.error  = action.error;
				this.emit("change");
				console.log(action.error);
				break;

			case "FETCH_COMMENTS":
				this.loading = action.loading;
				this.emit("change");
				break;

			case "LOAD_COMMENTS_SUCCESS":
				this.addComments(action.comments);

				this.loading = false;
				this.emit("change");
				break;

			case "LOAD_COMMENTS_ERROR":
				this.error  = action.error;
				this.emit("change");
				console.log(action.error);
				break;
		}
	}
}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));

window.store = appStore;
export default appStore;