import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//helps format our dates
import Moment from 'react-moment';

//{educationd} passed through from Dashboard.js
const Education = ({ education }) => {
  //the education section of the profile is an array, therefore loop through the array
  //for every item in array, create new unique elements(<tr></tr>) for each one of them
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Present'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2>Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

//'education' from profile is an array so ptar
Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
