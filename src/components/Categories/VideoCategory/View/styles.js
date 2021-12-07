import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  Card: {
    padding: "10px",
    minWidth: "650px",
  },
  Header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Icon: {
    cursor: "pointer",
  },
  Input: {
    margin: "10px",
  },
}));
