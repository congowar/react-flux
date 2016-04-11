import { EventEmitter } from "events";

import dispatcher from "../dispatchers/dispatcher";

class AppStore extends EventEmitter {
	constructor() {
		super();
		this.posts = [];
		this.user_id = '';
		this.accessToken = '';
		this.postData = {};
	}

	// return data from all posts
	getPosts() {
		return this.posts;
	}

	// return data from single post
	getPostData() {
		return this.postData;
	}

	handleActions(action) {
		switch(action.type) {
			case "LOAD_POSTS":
				this.posts = action.data;
				this.user_id = action.data.userID;
				this.accessToken = action.data.accessToken;
				this.emit("change");
				break;
			case "OPEN_POST":
				this.postData = action.postData;
				this.emit("change");
				break;
		}
	}
}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));

window.store = appStore;
export default appStore;