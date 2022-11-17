
import t from "../../theme";
export const inputStyles = [
  t.roundedSm,
  t.pX5,
  t.pY4,
  { borderWidth: 1 },
  t.wFull,
  t.fontSansMedium,
];
export const inputErrorStyle = [t.borderError, t.border0_5];
export const focusInputStyle = [...inputStyles, { borderWidth: 1 }];
export const errorStyle = [{ fontSize: 14 }, t.textError, { textAlign: 'right' }, t.wFull, t.mT1];
export const labelStyle = [{  fontSize: 16, marginBottom: 20 }];

export const passwordInputStyles = [...inputStyles, t.pY3];
export const focusPasswordInputStyles = [...passwordInputStyles, {  borderWidth: 1 }];
