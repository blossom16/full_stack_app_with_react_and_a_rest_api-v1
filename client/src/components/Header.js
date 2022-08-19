import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";


const Header = () => {
  const context = useContext(Context);
  const authUser = context.authenticatedUser;

  // Renders header with either user signed in or sign in option
  let items;
  if (authUser) {
    items = [
      <li key={1}><span>Welcome, {authUser.firstName} {authUser.lastName}!</span></li>,
      <li key={2}><Link to="/signout">Sign Out</Link></li>
    ];
  } else {
    items = [
      <li key={3}><Link className="signup" to="/signup">Sign Up</Link></li>,
      <li key={4}><Link className="signin" to="/signin">Sign In</Link></li>
    ];
  }
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><Link to="/">Courses</Link></h1>
        <nav>
          <ul className="header--signedout">
            {items}
          </ul>

        </nav>
      </div>
    </header >
  )
}

export default Header;