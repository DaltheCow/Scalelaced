import { Button } from "@material-ui/core";
import { Flex } from "./StyledComponents";

const CreateBar = () => {
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
