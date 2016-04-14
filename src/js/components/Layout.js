import React from "react";

import AppStore from "../stores/AppStore";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Posts from "./Posts/Posts";

export default class Layout extends React.Component {
	constructor() {
		super();
		this.getUserData = this.getUserData.bind(this);
		this.state = {
			userData: AppStore.getUserData(),
		}
	}

	componentWillMount() {
		AppStore.on("change", this.getUserData);
	}

	componentWillUnMount() {
		AppStore.removeListener("change", this.getUserData);
	}

	getUserData() {
		this.setState({
			userData: AppStore.getUserData(),
		})
	}


	render() {
		// var counter = 0;

		// const check = setInterval(() => { 
		// 	counter++;
		// 	(counter >= 20) ? clearInterval(check) : false;
		// 	console.log(this.state);
		// }, 2000);

		return(
			<div class="container">
				<Header />
				<Posts />
				<Footer />
			</div>
		) 
	}
};