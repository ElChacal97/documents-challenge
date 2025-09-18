import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

interface TextProps extends RNTextProps {
  fontFamily?: TextStyle["fontFamily"];
}

const Text = ({ children, style, fontFamily, ...props }: TextProps) => {
  return (
    <RNText
      style={[style, { fontFamily: fontFamily || "Inter-Regular" }]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
