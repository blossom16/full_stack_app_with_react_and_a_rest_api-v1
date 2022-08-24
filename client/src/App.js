
import './styles/global.css';
import './styles/reset.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import PrivateRoute from "./PrivateRoute";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut.js";
import UserSignUp from "./components/UserSignUp";

//import { withContext } from "./Context";

/*Components with Context
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);
//const DeleteCourseWithContext = withContext(DeleteCourse);
*/

//Component routes
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute exact path="/courses/create" component={CreateCourse} />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signout" component={UserSignOut} />
          <Route path="/signup" component={UserSignUp} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
