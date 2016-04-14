import React from "react";
import AppStore from "../../stores/AppStore";
import PostItem from "./PostItem";
import * as actions from "../../actions/actions";

export default class Posts extends React.Component {
	constructor() {
		super();
		this.getPosts = this.getPosts.bind(this);
		this.getPaging = this.getPaging.bind(this);
		this.state = {
			posts: AppStore.getPosts(),
			paging: AppStore.getPaging(),
		};
	}

	componentWillMount() {
		AppStore.on("change", this.getPosts);
		AppStore.on("change", this.getPaging);
	}

	componentWillUnmount() {
		AppStore.removeListener("change", this.getPosts);
		AppStore.removeListener("change", this.getPaging);
	}

	getPosts() {
		this.setState({
			posts: AppStore.getPosts(),
		});
	}

	getPaging() {
		this.setState({
			paging: AppStore.getPaging(),
		})
	}

	loadNewPosts() {
		actions.getNewPosts(this.state.paging.next);
	}

	render() {
		const { posts } = this.state;
		const PostsComponents = posts.map((current, index) => {
			return (
				<PostItem 
					key={index}
					text={current.description}
					time={current.created_time}
					picture={current.full_picture}
					link={current.link}
					name={current.name}
					postId={current.parent_id}
					postNum={index}
					comments={current.comments}
				/>
			);
		})

		return(
			<div>
				<h1 class="text-center">User Posts</h1>
					{PostsComponents}

				<div class="load-posts-wrapper">
					<button 
						class="btn"
						onClick={this.loadNewPosts.bind(this)}>Load Next Posts</button>
				</div>
			</div>
		)
	}
};