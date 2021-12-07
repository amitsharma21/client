import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  Card: {
    padding: "10px",
    minWidth: "820px",
  },
  Header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Form: {
    minWidth: "800px",
  },
  Icon: {
    cursor: "pointer",
  },
  Input: {
    margin: "10px",
  },
  FileInput: {
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid gray",
    borderRadius: "2px",
  },
  Button: {
    display: "flex",
    justifyContent: "center",
  },
}));
