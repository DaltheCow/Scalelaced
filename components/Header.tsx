import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Title from "./Title";
import CreateBar from "./CreateBar";
import Image from "next/image";
import logo from "../public/storivu.svg";
import { useTitleContext } from "./contexts/TitleContext";

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
  textField: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0,0,0,0)",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e0e0e0",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
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
  const { title, setTitle } = useTitleContext();
  const titleRef = React.useRef("Untitled");
  // const [title, setTitle] = React.useState("Untitled");
  const { user } = useAuth();
  const router = useRouter();
  const isLogin = router.pathname.includes("/login");
  const isCreate = router.pathname.includes("/create");
  const matches = useMediaQuery("(min-width:800px)");
  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ minWidth: "250px", display: "flex" }}>
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
          <Link href="/">
            <Box style={{ display: "flex", cursor: "pointer" }}>
              <Image src={logo} alt="logo" />
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "3.5px 0 0 8px",
                }}
              >
                <NoSelect className={classes.title} fontSize="32px">
                  Storivu
                </NoSelect>
              </a>
            </Box>
          </Link>
        </div>
        {isCreate && <Title />}
        <div
          style={{
            // maybe only minwidth with title present
            minWidth: matches ? "100px" : "",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {!user && !isLogin && !isCreate && (
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
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
