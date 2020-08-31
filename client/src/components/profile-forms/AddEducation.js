import React, { useState } from 'react';
//'withRouter' allows you to work with history Object like 'history.push'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
//Connects component to Redux(for global state accessibility)
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };
  return (
    <>
      <h1 className="large text-primary">Add An Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            value={degree}
            onChange={(e) => onChange(e)}
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            value={school}
            onChange={(e) => onChange(e)}
            name="school"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            value={from}
            onChange={(e) => onChange(e)}
            name="from"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              value={current}
              checked={current}
              //change the 'current' value to the opposite of what it is now
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
              }}
              name="current"
            />{' '}
            Still Enrolled
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            value={to}
            onChange={(e) => onChange(e)}
            name="to"
            disabled={current ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => onChange(e)}
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

//'withRouter' allows you to work with history Object like 'history.push'
export default connect(null, { addEducation })(withRouter(AddEducation));
