import React from "react";

export default class Comment extends React.Component {
	render() {
		return(
			<div class="comment-item">
				<p class="author">
					<a href={"https://www.facebook.com/" + this.props.userId} target="_blank">{this.props.userName}</a>
				</p>
				<p class="message">{this.props.message}</p>
			</div>
		)
	}
}