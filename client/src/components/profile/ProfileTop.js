import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div class="profile-top bg-primary p-2">
      <img class="round-img my-1" src={avatar} alt="" />
      <h1 class="large">{name}</h1>
      <p class="lead">
        {/* if company is true/exist THEN output element with company */}
        {status} {company && <span>at {company}</span>}
      </p>
      {/* if location is true/exist THEN output element with location */}
      <p>{location && <span>{location}</span>}</p>
      <div class="icons my-1">
        {/* if website is true/exist THEN output element*/}
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x"></i>
          </a>
        )}
        {/* if social is true/exist THEN do next statement and if that statement is true THEN output element */}
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {/* if social is true/exist THEN do next statement and if that statement is true THEN output element */}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {/* if social is true/exist THEN do next statement and if that statement is true THEN output element */}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {/* if social is true/exist THEN do next statement and if that statement is true THEN output element */}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {/* if social is true/exist THEN do next statement and if that statement is true THEN output element */}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
