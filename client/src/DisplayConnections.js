import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const DisplayConnections = ({ connections }) => {
  const navigate = useNavigate();

  return (
    <>
      <ListItemButton onClick={() => navigate(`/user/${connections}`)}>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary={connections} />
      </ListItemButton>
    </>
  );
};
