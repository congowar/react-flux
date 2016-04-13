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

	addEmptyComments() {
		const newPosts = this.posts.map((current, indext) => {
			for (var key in current) {
				(key !== 'comments') ? current.comments = {} : false;
			};
		})
	}

	pushComments(data) {
		const { id, comments } = data;
		this.posts.map((current, index) => {

			if (id === current.parent_id) {
				current.comments = comments;
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
				this.userData.name = action.data.name;
				this.userData.email = action.data.email;
				this.userData.picture = action.data.picture;
				this.paging = action.data.paging;
				this.posts = action.data.posts;
				this.loading = false;

				this.addEmptyComments();

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
				// this.comments.push(action.comments);
				this.pushComments(action.comments);
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