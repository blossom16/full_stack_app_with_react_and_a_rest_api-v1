import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import { useHistory, Link } from 'react-router-dom';
import ValidationError from "./ValidationError";

// Properties for new user model
function UserSignUp() {
  const { data, signIn } = useContext(Context);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const history = useHistory();

  // Update local copy of user data
  const onChange = (e) => {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value }));
  }

  // Makes API call to create user
  const onSubmit = (e) => {
    e.preventDefault()
    data.createUser(user)
      .then(errors => {
        if (errors.length) {
          setErrors(errors);
        } else {
          signIn(user.emailAddress, user.password)
            .then(() => history.push('/'));
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      })
  }

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <ValidationError errors={errors} title="Please fix user info" />
      <form onSubmit={onSubmit} >
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={user.firstName}
          onChange={onChange} />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={user.lastName}
          onChange={onChange} />

        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={user.emailAddress}
          onChange={onChange} />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={user.password}
          onChange={onChange} />

        <div>
          <button type="submit" className="button">
            Sign Up
          </button>
          <Link className='button button-secondary' to='/'>Cancel</Link>
        </div>

      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  )
}

export default UserSignUp;