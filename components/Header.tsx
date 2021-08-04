import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuth } from "../auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { SideMenu } from "./Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const isLogin = router.pathname.includes("/login");
  const isSignUp = router.pathname.includes("/signup");
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
        <Typography variant="h5" className={classes.title}>
          Scalelaced
        </Typography>
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
