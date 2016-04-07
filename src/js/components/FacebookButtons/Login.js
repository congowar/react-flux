import React from "react";

import { Link } from "react-router";

import * as actions from "../../actions/actions";

export default class Login extends React.Component{
	login() {
		actions.login();
	}

	render() {
		return(
			<div id="facebook-login">
				<Link to="user">
					<button 
						id="login" 
						class="btn btn-primary" 
						onClick={this.login.bind(this)}>

						<i class="fa fa-facebook"></i>
						<span>Log in the Facebook</span>
					</button>
				</Link>
			</div>
		);
	}
}