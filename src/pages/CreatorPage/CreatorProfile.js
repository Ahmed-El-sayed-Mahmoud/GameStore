// CreatorProfile.js

import './css/creator_profile.css';

const CreatorProfile = ({FNAME,LNAME,Image,description}) => {
  return (
    <div className="creator-profile">
      <img src={Image} alt={`${FNAME+" "+LNAME}'s Profile`} className="profile-image" />
      <div className="profile-details">
        <h2 className="profile-name">{FNAME+" "+LNAME}</h2>
        <p className="profile-description">{description}</p>
      </div>
    </div>
  );
};

export default CreatorProfile;
