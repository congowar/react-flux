import React from "react";

import Comment from "./Comment";

export default class Comments extends React.Component {
	render() {
		const { comments } = this.props;
		var commentsItems = null;

		if (comments.hasOwnProperty('data') && comments.data.length > 0) {
			commentsItems = comments.data.map((current, index) => {
				return (
					<Comment 
						key={index} 
						message={current.message}
						userName={current.from.name}
						userId={current.from.id}
					/>
				);
			})
		} else {
			commentsItems = 'No Comments Yet';
		};

		return(
			<div class="comments">
				<h3>Comments</h3>
				{commentsItems}
			</div>
		)
	}
}
