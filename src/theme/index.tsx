import { extendTheme } from "native-base";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { createTheme } from "react-native-whirlwind";
import { DARK_BLUE, LIGHT_BLUE, SEMI_DARK_BLUE } from "./colors";
import { fonts } from "./fonts";

// whirlwind theme provider
const t = createTheme();

export default t;

const VIEWPORT_HEIGHT = 812;
const VIEWPORT_WIDTH = 375;

export const wp = (v: number) =>
  widthPercentageToDP(`${(v * 100) / VIEWPORT_WIDTH}%`);
export const hp = (v: number) =>
  heightPercentageToDP(`${(v * 100) / VIEWPORT_HEIGHT}%`);

export const wPercent = (v: number) => `${(v * 100) / VIEWPORT_WIDTH}%`;
export const hPercent = (v: number) => `${(v * 100) / VIEWPORT_HEIGHT}%`;

export const theme = extendTheme({
  fonts: {
    ...fonts,
    heading: fonts.regular,
    body: fonts.regular,
    mono: fonts.regular,
    customFont: fonts.regular,
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  components: {
    Button: {
      baseStyle: {
        _pressed: {
          opacity: 0.8,
          backgroundColor: "primary.500",
        },
      },
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Text: {
      variants: {
        bold: {
          fontWeight: "bold",
        },
      },
    },
  },
  colors: {
    blue: {
      50: LIGHT_BLUE,
      100: DARK_BLUE,
      200: SEMI_DARK_BLUE,
    },
  },
});
