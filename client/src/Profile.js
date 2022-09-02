import { useEffect, useState } from "react";
import { ProfileCard } from "./components/ProfileCard";
import { getProfile } from "./API/ServerConnection";

export const Profile = () => {
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    getProfile().then((response) => {
      setProfileData(response.data);
    });
  }, []);

  return (
    <>
      {profileData ? (
        <div>
          <ProfileCard profileData={profileData} />
        </div>
      ) : (
        "EMPTY"
      )}
    </>
  );
};
