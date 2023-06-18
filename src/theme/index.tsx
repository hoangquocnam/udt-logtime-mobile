import { extendTheme } from "native-base";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { createTheme } from "react-native-whirlwind";
// whirlwind theme provider
const t = createTheme();

export default t;

const VIEWPORT_HEIGHT = 812;
const VIEWPORT_WIDTH = 375;

export const wp = (v: number) => widthPercentageToDP(`${(v * 100) / VIEWPORT_WIDTH}%`);
export const hp = (v: number) =>
  heightPercentageToDP(`${(v * 100) / VIEWPORT_HEIGHT}%`);

export const wPercent = (v: number) => `${(v * 100) / VIEWPORT_WIDTH}%`;
export const hPercent = (v: number) => `${(v * 100) / VIEWPORT_HEIGHT}%`;
