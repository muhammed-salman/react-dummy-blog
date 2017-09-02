import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{
	renderField(field){
		//destructuring : pulling meta from field and 
		//touched and error from meta
		const {meta: {touched,error}} =field;
		const className=`form-group ${ touched && error ? 'has-danger' : ''}`;
		// without destructuring 
		// const className=`form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
		return(
			<div className={className}>
				<label>{field.label}</label>
				<input 
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched?error:''}
				</div>
			</div>
			);

	}
	
	onSubmit(values){
		this.props.createPost(values,()=>this.props.history.push('/'));
	}
	
	render(){
		const {handleSubmit}=this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

				<Field 
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field
				label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">Save</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
			);
	}
}

function validate(values){
	//values--> {title:"asdf", categories:"asdf", content:"asdf"}
	const errors={};
	//validate inputs from 'values'
	if(!values.title){
		errors.title="Please enter a title!";
	}
	if(!values.categories){
		errors.categories="Please enter a categories!";
	}
	if(!values.content){
		errors.content="Please enter a content!";
	}
	
	//if errors is empty, the form is fine to submit
	//if errors has any properties, redux form assumes form is invalid
	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null,{createPost})(PostsNew)
);