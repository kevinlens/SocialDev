import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//helps format our dates
import Moment from 'react-moment';

//{experience} passed through from Dashboard.js
const Experience = ({ experience }) => {
  //the experience section of the profile is an array, therefore loop through the array
  //for every item in array, create new unique elements(<tr></tr>) for each one of them
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Present'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2>Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

//'experience' from profile is an array so ptar
Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
