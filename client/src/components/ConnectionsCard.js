import { Button, Card, CardContent, Input, List, Box } from "@mui/material";
import { useState } from "react";
import { DisplayConnections } from "../DisplayConnections";
import { sendsConnection } from "../API/ServerConnection";

export const ConnectionCard = (props) => {
  const handleAddConnections = () => {
    setInputBox(!inputBox);
  };
  const [inputBox, setInputBox] = useState(false);
  const [input, setInput] = useState("");

  const handleInputChange = (input) => {
    setInput(input.target.value);
  };

  const handleAddConnectionsSubmit = () => {
    sendsConnection(input);
  };
  return (
    <>
      <Card sx={{ px: 2, m: 3, borderRadius: 8, minWidth: 275 }} align="center">
        <CardContent>
          <List>
            {props.connections.length > 0
              ? props.connections.map((con) => {
                  return <DisplayConnections key={con} connections={con} />;
                })
              : "No connections"}
          </List>
        </CardContent>
      </Card>
      <div>
        <Button
          variant="contained"
          sx={{ ml: 3, mb: 2 }}
          onClick={handleAddConnections}
        >
          Add Connections
        </Button>
      </div>
      {inputBox ? (
        <Box ml={3}>
          <Input
            autoFocus="true"
            placeholder="username"
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleAddConnectionsSubmit}>
            Submit
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};
