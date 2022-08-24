
import React, { useState, useContext } from "react";
import { Context } from '../Context';
import { Link, useLocation, useHistory } from "react-router-dom";
import ValidationError from "./ValidationError";

// Sign-in page
function UserSignIn() {
  const location = useLocation();
  const context = useContext(Context);
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({ emailAddress: '', password: '' });

  // Update local copy of user data
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(user => ({ ...user, [name]: value }))
  }

  /// Makes API call to authenticate
  const onSubmit = (e) => {
    e.preventDefault();
    const { emailAddress, password } = user;
    context.actions.signIn(emailAddress, password).then(() => {
      if (emailAddress === '' || password === '') {
        setErrors(['Incorrect password or email']);
      } else {
        if (location.state?.from) {
          history.push(location.state.from);
        } else {
          history.push('/');
        }
      }
    })
      .catch(err => {
        console.log(err);
        history.push('/error');
      })
  }


  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <ValidationError errors={errors} title="" />
      <form
        onSubmit={onSubmit} >
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={user.emailAddress}
          onChange={onChange} />

        <label htmlFor="password">Password</label>
        <input
          id='password'
          name='password'
          type='password'
          value={user.password}
          onChange={onChange} />
        <div>
          <button type="submit" className="button"> Sign In </button>
        </div>

      </form>

      <p>
        Don't have a user account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  )
}

export default UserSignIn;