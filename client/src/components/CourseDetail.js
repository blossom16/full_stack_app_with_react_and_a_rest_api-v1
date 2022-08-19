import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../Context';
import { useParams, Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


const CourseDetail = () => {
  const { id } = useParams();
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  const [course, setCourse] = useState([]);
  const history = useHistory();

  // Fetch API from ApiProvider.js
  useEffect(() => {
    context.data.courseDetail(id)
      .then(res => setCourse(res))
      .catch(err => {
        console.log(err);
        history('/notfound');
      })

  }, [id, context.data]);

  // Deletes course & requires athentication
  const deleteCourse = () => {
    const { emailAddress, password } = authUser;
    context.data
      .deleteCourse(id, { emailAddress, password })
      .then(errors => {
        if (errors) {
          console.log(errors);
        } else {
          console.log('Course deleted');
        }
      })
      .then(() => history('/'))
      .catch(err => console.log(err))
  }

  // Renders CourseDetail page
  return (
    <div>
      <div className="actions--bar">
        <div className="wrap">
          {authUser && authUser.id === course.userId ?
            <React.Fragment>
              <Link className="button" to={`${id}/update`} >Update Course</Link>
              <button className="button" href="#" onClick={deleteCourse}>Delete Course</button>
              <Link className="button button-secondary" to="/">Return to List</Link>
            </React.Fragment>
            :
            <Link className="button button-secondary" to="/">Return to List</Link>

          }
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              {course.user && (
                <p>
                  By {course.user.firstName} {course.user.lastName}
                </p>
              )}
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseDetail;