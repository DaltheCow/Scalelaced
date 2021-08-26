import { createTheme } from "@material-ui/core/styles";
import { lightBlue, amber } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    secondary: amber,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
