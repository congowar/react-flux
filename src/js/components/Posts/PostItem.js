import React from "react";
import * as actions from "../../actions/actions";
import AppStore from "../../stores/AppStore";
import Comments from "./Comments";

export default class PostItem extends React.Component {
	// constructor() {
	// 	super();
	// 	this.getComments = this.getComments.bind(this);
	// 	this.state = {
	// 		comments: AppStore.getComments(),
	// 	};
	// }

	// componentWillMount() {
	// 	AppStore.on("change", this.getComments);
	// }

	// componentWillUnmount() {
	// 	AppStore.removeListener("change", this.getComments);
	// }

	// getComments() {
	// 	this.setState({
	// 		comments: AppStore.getComments(),
	// 	});
	// }

	showPostInfo(postId, postNum) {
		const fields = "comments.summary(true).limit(2)";
		actions.showPostInfo(postId, fields);

		const commentsContainer = $("[data-postid=" + postNum + "]").find(".comments");
		$('.comments').hide();

		setTimeout(() => { commentsContainer.show() }, 300);
	}

	render() {
		const styles = {
			background: `url("${this.props.picture}") center center no-repeat`,
			backgroundSize: "cover",
			width: 350,
			height: 230,
		}

		const date = new Date(this.props.time);
		const dateOptions = {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		};

		return (
			<div class="post list-group-item" data-postid={this.props.postNum}>
				<h3>{this.props.name}</h3>
				<p>
					<strong>Created Time: </strong>
					{date.toLocaleString("ru", dateOptions)}
				</p>
				<div class="post-img" style={styles}></div>
				<p class="description">{this.props.text}</p>
				<p class="text-right">
					<button 
						onClick={this.showPostInfo.bind(null, this.props.postId, this.props.postNum)} 
						class="btn btn-succes open-post"
						>Open
					</button>
				</p>

				<Comments comments={this.props.comments} />
			</div>
		)
	}
}