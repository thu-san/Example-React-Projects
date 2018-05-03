import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../actions";

class PostsShow extends Component {
	componentDidMount() {
		if (!this.props.post) {
			const { id } = this.props.match.params;
			this.props.fetchPost(id);
		}
	}

	onDeleteClick() {
		const { id } = this.props.match.params;
		this.props.deletePost(id, () => {
			this.props.history.push("/");
		});
	}

	render() {
		const { post } = this.props;

		if (!post) {
			return <div>loading...</div>;
		}

		return (
			<div>
				<Link to="/">Back To Index</Link>
				<button
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}
				>
					Delete
				</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

export default connect(
	({ posts }, ownProps) => ({ post: posts[ownProps.match.params.id] }),
	{ fetchPost, deletePost }
)(PostsShow);