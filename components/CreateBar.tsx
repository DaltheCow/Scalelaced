import { Button } from "@material-ui/core";
import { Flex } from "./StyledComponents";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuth } from "../auth";

const CreateBar = ({ title }: { title: string }) => {
  const { user } = useAuth();

  // console.log(user);
  const save = async () => {
    // try {
    //   console.log("saving...");
    //   const request = await firebase
    //     .firestore()
    //     .collection("stories")
    //     .doc(user?.uid || undefined)
    //     //to read, onSnapshot(doc => doc.data)
    //     .set({
    //       delta: quill?.getContents().ops,
    //       title,
    //       id: 234,
    //     });
    //   console.log("successfully sent to cfs");
    //   alert("data was successfully sent to cloud firestore");
    // } catch (error) {
    //   console.log(error);
    //   alert(error);
    // }
  };
  return (
    <Flex>
      <Button
        style={{ marginRight: "4px" }}
        variant="contained"
        color="secondary"
      >
        Save
      </Button>
      <Button variant="contained" color="secondary">
        Submit
      </Button>
    </Flex>
  );
};

export default CreateBar;
