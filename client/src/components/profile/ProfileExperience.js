import React from 'react';
import PropTypes from 'prop-types';
//helps format our date and time bc the raw date that we get is unorganized
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <section>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -
        {!to ? ' Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </section>
  );
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
