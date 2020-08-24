import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
//Connects component to Redux
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

/*username is passed in as a props from Profile.js component, 
getGithubRepos is an imported function, repos is props from global state*/
const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  //get the github user's repos projects
  useEffect(() => {
    getGithubRepos(username);
    //this is just filling in the [] as a dependency to avoid terminal error messages
  }, [getGithubRepos]);

  return (
    <section className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        // map through users repos and give each one individual element boxes
        //Display the LASTEST/NEWEST repo projects
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            {/*   */}

            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>

            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>

            {/*   */}
          </div>
        ))
      )}
    </section>
  );
};

/*propTypes aren't necessary they're just there to make sure if you're working in a team
that someone doesn't mess up and pass in the wrong expected prop like array, object, or function*/
ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

//this is the global state coming from the file reducer/profile
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
