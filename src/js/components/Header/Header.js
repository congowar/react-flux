import React from "react";

import Logout from "../FacebookButtons/Logout";

export default class Header extends React.Component {
	render() {
		return(
			<header class="header">
				<Logout />
			</header>
		)
	}
}