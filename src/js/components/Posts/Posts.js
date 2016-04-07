import React from "react";

import AppStore from "../../stores/store";
import PostItem from "./PostItem";

export default class Posts extends React.Component {
	constructor() {
		super();
		this.getPosts = this.getPosts.bind(this);
		this.state = {
			posts: AppStore.getPosts(),
		};
	}

	componentWillMount() {
		AppStore.on("change", this.getPosts);
	}

	componentWillUnmount() {
		AppStore.removeListener("change", this.getPosts);
	}

	getPosts() {
		this.setState({
			posts: AppStore.getPosts(),
		});
	}

	render() {
		const { posts } = this.state;
		const PostsComponents = posts.map((current, index) => {
			return (
				<PostItem 
					key={index}
					id={current.id}
					text={current.description}
					time={current.created_time}
					picture={current.full_picture}
					link={current.link}
					name={current.name}
				/>
			);
		})

		return(
			<div>
				<h1 class="text-center">User Posts</h1>
					{PostsComponents}
			</div>
		)
	}
};