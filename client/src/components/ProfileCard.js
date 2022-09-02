import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardMedia,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import PersonIcon from "@mui/icons-material/Person";

export const ProfileCard = (props) => {
  let numConnections = props?.connections?.length + " Connections ";
  return (
    <Card sx={{ px: 2, m: 3, borderRadius: 8, minWidth: 275 }} align="center">
      <CardMedia sx={{ mt: 2 }} align="center">
        <Avatar
          sx={{ width: 76, height: 76 }}
          alt="Remy Sharp"
          src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
        />
      </CardMedia>
      <CardContent>
        <Typography sx={{ fontSize: 20 }}>
          {props.profileData.username}
        </Typography>
        <Typography
          sx={{ mt: 2, fontSize: 15 }}
          color="text.secondary"
          gutterBottom
        >
          {props.profileData.about}
        </Typography>

        <hr />
        <List
          sx={{
            mt: 2,
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={numConnections} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={props.profileData.email} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={props.profileData.about} />
          </ListItemButton>
        </List>
      </CardContent>
    </Card>
  );
};
