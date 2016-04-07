import React from "react";

import * as actions from "../../actions/actions";

export default class PostItem extends React.Component {
	showPostInfo(postId) {
		actions.showPostInfo(postId);
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
			<div class="post list-group-item">
				<h3>{this.props.name}</h3>
				<p><strong>Created Time: </strong>{date.toLocaleString("ru", dateOptions)}</p>
				<div class="post-img" style={styles}></div>
				<p class="description">{this.props.text}</p>
				<p class="text-right">
					<button onClick={this.showPostInfo.bind(null, this.props.id)} class="btn btn-succes">Open</button>
				</p>
			</div>
		)
	}
}