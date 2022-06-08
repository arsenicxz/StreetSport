import * as React from "react";
import { SvgXml } from "react-native-svg";

const BackButton = ({ color }) => {
  const xml = `
<svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3137 23.6274L1.00001 12.3137L12.3137 1.00002" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
  return <SvgXml xml={xml} width="100%" height="100%" />;
};

export default BackButton;
