import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
    };
    // this.onSubmit=this.onSubmit.bind(this)
  }

  componentWillReceiveProps(newProps){
    if(newProps.errors){
      this.setState({errors:newProps.errors})
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newcomment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };
    this.props.addComment(postId, newcomment);
    this.setState({ text: "" });
  };
onChange(e){
  this.setState({[e.target.name]: e.target.value})
}
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Make a comment...</div>
          <div className="card-body">
            <form onSubmit={(e) => this.onSubmit(e)}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to Post"
                  name="text"
                  value={this.state.text}
                  onChange={(e)=>this.onChange(e)}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
CommentForm.propTypes = {
  addComment: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  postId:propTypes.string.isRequired,
  errors: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { addComment })(CommentForm);
