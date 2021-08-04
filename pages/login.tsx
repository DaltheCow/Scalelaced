import React, { useState } from "react";
import Link from "next/link";
import firebase from "firebase/app";
import { Box, Paper } from "@material-ui/core";
import { Text } from "../components/kit/text";
import { useAuth } from "../auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Login = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  React.useEffect(() => {
    setIsInitialized(Boolean(firebase.apps.length));
  }, []);

  const FirebaseAuthConfig = {
    signInFlow: "popup",
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: "/",
    credentialHelper: "none",
  };
  // how do I send em back to where they were after login or signup?
  // I guess if they click on a link that redirects them to login/sign up then I should retry that link after they login or sign up
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box marginTop={3}>
          <Paper
            elevation={isHovered ? 4 : 2}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Box
              display="flex"
              flexDirection="column"
              paddingX={5}
              paddingY={7}
            >
              <Box fontSize={32} fontWeight="bold">
                <Text>Log in to Scalelaced</Text>
              </Box>
              <Box display="flex" flexDirection="column" width={300}>
                {isInitialized ? (
                  <StyledFirebaseAuth
                    uiConfig={FirebaseAuthConfig}
                    firebaseAuth={firebase.auth()}
                  />
                ) : null}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
