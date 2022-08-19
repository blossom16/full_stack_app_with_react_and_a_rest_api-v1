import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import { useHistory, Link } from 'react-router-dom';


const CreateCourse = () => {
  const context = useContext(Context);
  const history = useHistory();
  const authUser = context.authenticatedUser;
  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: authUser.id
  });

  // Event handler for onchange event, updates fields for the course
  const onChange = (e) => {
    const { name, value } = e.target;
    setCourse(course => ({ ...course, [name]: value }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    context.data.createCourse(course, authUser)
      .then(errors => {
        if (errors.length) {
          setErrors(errors)
        } else {
          history('/');
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='wrap'>
      <h2>Create Course</h2>
      {errors.length ? (
        <>
          <div className="validation--errors">
            <h3>Validation errors</h3>
            <ul>
              {errors.map((error, index) => <li key={index}>{error}</li>)}
            </ul>
          </div>
        </>
      ) : (<></>)}
      <form onSubmit={onSubmit}>
        <div className='main--flex'>
          <div>
            <label htmlFor='title'>Course Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={course.title}
              onChange={onChange}
            />
            <p>By {authUser.firstName} {authUser.lastName}</p>

            <label htmlFor='description'>Course Description</label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor='estimatedTime'>Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course.estimatedTime}
              onChange={onChange}
            />
            <label htmlFor='materialsNeeded'>Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={course.materialsNeeded}
              onChange={onChange}
            />
          </div>
        </div>
        <button className='button' type='submit'>Create Course</button>
        <Link className='button button-secondary' to='/'>Cancel</Link>
      </form>
    </div>
  )
}

export default CreateCourse;
