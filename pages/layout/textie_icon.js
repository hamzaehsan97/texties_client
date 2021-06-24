import { FcBusinesswoman } from "react-icons/fc";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    minHeight: 100,
    minWidth: 100,
  },
}));
export default function TextieIcon() {
  const classes = useStyles();
  return <FcBusinesswoman className={classes.icon} />;
}
