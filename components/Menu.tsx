import * as React from "react";
import {
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CreateIcon from "@material-ui/icons/Create";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "next/link";
import { useAuth } from "../auth";
import { firebaseClient } from "../firebaseClient";
import { useRouter } from "next/router";

type SideMenuProps = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

type ListItemType = {
  text: string;
  icon: JSX.Element;
  action: "button" | "link";
  link?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  isCurrentPage?: boolean;
};

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export const SideMenu: React.FC<SideMenuProps> = ({ open, close, isOpen }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const isBrowser = typeof window !== "undefined";
  const iOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const userOnlyItems: ListItemType[] = [];
  const router = useRouter();

  const logout = async () => {
    await firebaseClient
      .auth()
      .signOut()
      .then(() => {
        router.push("/");
      });
  };

  if (user) {
    userOnlyItems.push(
      {
        text: "Create",
        icon: <CreateIcon />,
        link: "/create",
        action: "link",
        isCurrentPage: router.pathname.includes("create"),
      } as ListItemType,
      {
        text: "Profile",
        icon: <AccountBoxIcon />,
        link: `/${user.displayName}`,
        action: "link",
        isCurrentPage: router.pathname.includes(user?.displayName || ""),
      } as ListItemType
    );
  } else {
    //signup will need to know that a user came from here so it can redirect them back after
    userOnlyItems.push({
      text: "Create",
      icon: <CreateIcon />,
      link: "/signup?redirect=create",
      action: "link",
      isCurrentPage: router.pathname.includes("create"),
    });
  }

  const menuItemOptions: ListItemType[] = [
    {
      text: "Browse",
      icon: <LibraryBooksIcon />,
      link: "/",
      action: "link",
    },
    {
      text: "Read",
      icon: (
        <BookIcon
          color={router.pathname.includes("read") ? "secondary" : "inherit"}
        />
      ),
      link: "/read",
      action: "link",
      isCurrentPage: router.pathname.includes("read"),
    },
    ...userOnlyItems,
  ];

  const lowerMenuItemOptions: ListItemType[] = [
    {
      text: "Account Settings",
      icon: <SettingsIcon />,
      link: "/settings",
      action: "link",
      isCurrentPage: router.pathname.includes("settings"),
    },
    // check for delicate operations before logout
    // do you want to logout while writing a story? it should auto save progress though...so maybe not
    // but I think for story edits it may not auto save since it would be overwriting something.
    // will it save past version of your story then?
    // do you want to logout while writing a comment? won't save progress
    // I imagine logout would have a thing like prompt inside where it won't go through with the logout until you confirm you want to lose the stuff
    // TODO: make action button work
    // TODO: make action button work
    // TODO: make action button work
    // TODO: make action button work
    // TODO: make action button work
    {
      text: "Logout",
      icon: <ExitToAppIcon />,
      action: "button",
      onClick: () => logout(),
    },
  ];

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={close}
      onKeyDown={close}
    >
      <List>
        {menuItemOptions.map((option, i) => (
          <Link key={i} href={option?.link || ""} passHref>
            <ListItem button key={option.text}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText
                color={(option.isCurrentPage || undefined) && "secondary"}
                primary={option.text}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      {user && (
        <>
          <Divider />
          <List>
            {lowerMenuItemOptions.map((option) =>
              option.action === "link" ? (
                <Link key={option.text} href={option.link || ""} passHref>
                  <ListItem button>
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.text} />
                  </ListItem>
                </Link>
              ) : (
                <ListItem
                  button
                  key={option.text}
                  onClick={
                    option.action === "button" ? option.onClick : undefined
                  }
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItem>
              )
            )}
          </List>
        </>
      )}
    </div>
  );

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="left"
      open={isOpen}
      onClose={close}
      onOpen={open}
    >
      {list()}
    </SwipeableDrawer>
  );
};
