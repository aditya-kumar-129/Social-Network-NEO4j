import { useEffect, useState } from "react";
import { SuggestionCard } from "./components/SuggestionCard";
import { getSuggestions } from "./API/ServerConnection";

export const GetSuggestions = (props) => {
  const [getSuggestion, setGetSuggestion] = useState([]);

  const handleSendConnection = (username) => {
    let suggestionList = getSuggestion;
    suggestionList.filter((element) => element.username !== username);
    setGetSuggestion(suggestionList);
  };

  useEffect(() => {
    getSuggestions().then((response) => {
      setGetSuggestion(response.data);
    });
  }, []);

  return (
    <>
      {getSuggestion?.map((userData) => (
        <SuggestionCard
          userData={userData}
          handleSendConnection={handleSendConnection}
          handleProfileOnClick={props.handleProfileOnClick}
        />
      ))}
    </>
  );
};
