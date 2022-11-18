import t from "../../theme";

import { GRAY, PRIMARY } from "../../theme/colors";
export const inputStyles = [
  t.roundedSm,
  t.pX5,
  t.pY4,
  { borderWidth: 1, borderColor: GRAY },
  t.wFull,
  t.fontSansMedium,
];
export const inputErrorStyle = [t.borderError, t.border0_5];
export const focusInputStyle = [
  ...inputStyles,
  { borderColor: PRIMARY, borderWidth: 1 },
];
export const errorStyle = [
  { fontSize: 14 },
  t.textError,
  { textAlign: "right" },
  t.wFull,
  t.mT1,
];
export const labelStyle = [{ fontSize: 16, marginBottom: 20 }];
