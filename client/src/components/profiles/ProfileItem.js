import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//props passed in form Profile.js file and now we are destructuring
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <section className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={'/profile/{_id}'} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {/* display a maximum of 4 skills, also use that 'skill's index in the array as a key */}
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i>
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
