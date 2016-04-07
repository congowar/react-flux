import React from "react";

import { Link } from "react-router";

import * as actions from "../../actions/actions";

export default class Login extends React.Component{
	logout() {
		actions.logout();
	}

	render() {
		return(
			<div id="facebook-logout">
				<Link to="/">
					<button 
						id="logout" 
						class="btn btn-danger" 
						onClick={this.logout.bind(this)}>
						<span>Logout</span>
					</button>
				</Link>
			</div>
		);
	}
}