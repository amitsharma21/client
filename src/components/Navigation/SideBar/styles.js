import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  SideBar: {
    position: "sticky",
    top: 0,
  },
  Paper: {
    height: "100vh",
    width: "100%",
    overflow: "auto",
  },
  LinkList: {
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
  SingleLink: {
    margin: "5px 5px",
    width: "100%",
    cursor: "pointer",
  },
  Link: {
    color: "white",
    textDecoration: "none",
    width: "100%",
  },
}));
