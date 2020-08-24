import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div class="profile-about bg-light p-2">
      {/* if bio is true/exist THEN output element */}
      {bio && (
        <>
          split will turn a string into an array
          <h2 class="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <div class="line"></div>
        </>
      )}
      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">
        {/* loop through skills array and get each item and set their current index as a key */}
        {skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check"></i>
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
