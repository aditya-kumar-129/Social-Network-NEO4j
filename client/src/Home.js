import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { getConnections } from "./API/ServerConnection";
import { Navbar } from "./components/Navbar";
import { Profile } from "./Profile";
import { GetSuggestions } from "./getSuggestions";
import { IncomingConnections } from "./IncomingConnections.js";
import { ConnectionCard } from "./components/ConnectionsCard";

export const Home = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);

  const handleProfileOnClick = (event) => {
    let str = `/user/${event.target.value}`;
    navigate(str);
  };

  useEffect(() => {
    if (cookies.get("token") === undefined) {
      navigate("/");
    } else {
      getConnections(cookies.get("token")).then((response) => {
        setConnections(response.data);
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ mx: 2, mt: 4, display: "flex", flexDirection: "row" }}>
        <Box
          m={2}
          sx={{ mx: 2, mt: 4, display: "flex", flexDirection: "column" }}
        >
          <Profile connections={connections} />
          <ConnectionCard connections={connections} />
        </Box>

        <Box sx={{ mx: 2, mt: 4, display: "flex", flexDirection: "column" }}>
          <Box
            m={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 3,
              backgroundColor: "white",
              borderRadius: 7,
            }}
          >
            <Typography sx={{ fontSize: 20 }}>
              Incoming Connections:{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: 870,
                minHeight: 508,
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                "& > :not(style)": {
                  m: 1,
                  mb: 2,
                  borderRadius: 5,
                  width: 180,
                  height: 250,
                },
                "& > :hover": {
                  cursor: "pointer",
                  backgroundColor: "secondary.main",
                  boxShadow: 6,
                },
              }}
            >
              <IncomingConnections
                handleProfileOnClick={handleProfileOnClick}
              />
            </Box>
          </Box>
          <Box
            m={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 3,
              backgroundColor: "white",
              borderRadius: 7,
            }}
          >
            <Typography sx={{ fontSize: 20 }}>
              Suggested Connections:{" "}
            </Typography>
            <Box
              sx={{
                p: 2,
                backgroundColor: "white",

                borderRadius: 7,
                display: "flex",
                width: 870,
                minHeight: 508,
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                "& > :not(style)": {
                  m: 1,
                  mb: 2,
                  borderRadius: 5,
                  width: 180,
                  height: 250,
                },
                "& > :hover": {
                  cursor: "pointer",
                  backgroundColor: "secondary.main",
                  boxShadow: 6,
                },
              }}
            >
              <GetSuggestions handleProfileOnClick={handleProfileOnClick} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
