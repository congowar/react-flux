import React from "react";
import * as actions from "../../actions/actions";
import AppStore from "../../stores/AppStore";
import Comments from "./Comments";

export default class PostItem extends React.Component {
	showPostInfo(postId, postNum) {
		const fields = "comments.summary(true).limit(5)";
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
						class="btn btn-succes open-post" 
						onClick={this.showPostInfo.bind(null, this.props.postId, this.props.postNum)} 
						>Open
					</button>
				</p>

				<Comments comments={this.props.comments} />
			</div>
		)
	}
}