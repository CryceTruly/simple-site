import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { createMessage } from "../../actions/messages";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/auth";

export class Register extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    password_comfirm: ""
  };
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password_comfirm } = this.state;
    if (password !== password_comfirm) {
      this.props.createMessage({ passwordsNotMatch: "Passwords donot match" });
    } else {
      const newUser = {
        username,
        email,
        password
      };

      this.props.registerUser(newUser, this.props);
    }
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { email, username, password, password_comfirm } = this.state;
    return (
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6 mt-3">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Register for an account</h4>

              <form onSubmit={this.onSubmit}>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="username" className="col-form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      onChange={this.onChange}
                      className="form-control"
                      id="username"
                      value={username}
                      placeholder="Enter Username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      name="email"
                      onChange={this.onChange}
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      value={email}
                      placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      onChange={this.onChange}
                      className="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      value={password}
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputPassword2">
                      Comfirm Password
                    </label>
                    <input
                      type="password"
                      onChange={this.onChange}
                      className="form-control"
                      id="exampleInputPassword2"
                      name="password_comfirm"
                      value={password_comfirm}
                      placeholder="Password"
                    />
                  </div>

                  <button
                    disabled={this.props.isLoading}
                    type="submit"
                    className="btn btn-primary"
                  >
                    {this.props.isLoading ? "Please wait" : "Register"}
                  </button>
                  {this.props.isLoading ? (
                    <div className="center-block my-auto">
                      <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <p>Please wait...</p>
                    </div>
                  ) : (
                    ""
                  )}

                  <p>
                    Already have an account?<Link to="/login">Login</Link>
                  </p>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});
export default connect(
  mapStateToProps,
  { registerUser, createMessage }
)(Register);
