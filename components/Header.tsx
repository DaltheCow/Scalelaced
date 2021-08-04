import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Box,
  styled,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuth } from "../auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { SideMenu } from "./Menu";

const NoSelect = styled(Box)({
  webkitTouchCallout: "none",
  WebkitUserSelect: "none",
  KhtmlUserSelect: "none",
  mozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Cinzel",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const isLogin = router.pathname.includes("/login");
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </IconButton>
        <SideMenu
          open={() => setIsOpen(true)}
          close={() => setIsOpen(false)}
          isOpen={isOpen}
        />
        <NoSelect className={classes.title} fontSize="32px">
          Scalelaced
        </NoSelect>
        {!user && !isLogin && (
          <Link href="/login" passHref>
            <Button variant="contained" size="small">
              Login
            </Button>
          </Link>
        )}
        {user && (
          <Link href={`/${user.displayName}`} passHref>
            <Button variant="text" color="secondary" size="small">
              {user.displayName}
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
