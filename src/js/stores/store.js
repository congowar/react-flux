import { EventEmitter } from "events";

import dispatcher from "../dispatchers/dispatcher";

class AppStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			
		}
		this.posts = [];
		this.user_id;
		this.accessToken;
	}

	getNewPosts(posts) {
		console.log(posts);
	}

	getPosts() {
		return this.posts;
	}

	handleActions(action) {
		switch(action.type) {
			case "LOAD_POSTS":
				this.posts = action.data;
				this.user_id = action.data.userID;
				this.accessToken = action.data.accessToken;
				this.emit("change");
				break;
		}
	}
}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));

window.store = appStore;

export default appStore;