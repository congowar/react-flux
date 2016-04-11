import React from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Posts from "./Posts/Posts";

export default class Layout extends React.Component {
	render() {
		return(
			<div class="container">
				<Header />
				<Posts />
				<Footer />
			</div>
		) 
	}
};