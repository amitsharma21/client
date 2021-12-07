import React from "react";

import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RedeemIcon from "@mui/icons-material/Redeem";
import GavelIcon from "@mui/icons-material/Gavel";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CategoryIcon from "@mui/icons-material/Category";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";

const SideBar = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid item xs={6} sm={4} md={2}>
      <div className={classes.SideBar}>
        <Paper
          elevation={6}
          className={classes.Paper}
          style={{ position: "static" }}
        >
          <List>
            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/users");
              }}
            >
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/blogs");
              }}
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Blogs" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/audiotracks");
              }}
            >
              <ListItemIcon>
                <MusicNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Audio Tracks" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/videotracks");
              }}
            >
              <ListItemIcon>
                <OndemandVideoIcon />
              </ListItemIcon>
              <ListItemText primary="Video Tracks" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/motivation");
              }}
            >
              <ListItemIcon>
                <AirplaneTicketIcon />
              </ListItemIcon>
              <ListItemText primary="Motivation" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/guidedmeditation");
              }}
            >
              <ListItemIcon>
                <OndemandVideoIcon />
              </ListItemIcon>
              <ListItemText primary="Guided Meditation" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/categories");
              }}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/coupons");
              }}
            >
              <ListItemIcon>
                <RedeemIcon />
              </ListItemIcon>
              <ListItemText primary="Coupons" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/tac");
              }}
            >
              <ListItemIcon>
                <GavelIcon />
              </ListItemIcon>
              <ListItemText primary="Terms and Conditions" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/privacypolicy");
              }}
            >
              <ListItemIcon>
                <PrivacyTipIcon />
              </ListItemIcon>
              <ListItemText primary="Privacy Policy" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                history.push("/dashboard/faq");
              }}
            >
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItem>
          </List>
        </Paper>
      </div>
    </Grid>
  );
};

export default SideBar;
