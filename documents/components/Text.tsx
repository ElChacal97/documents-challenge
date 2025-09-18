import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface TextProps extends RNTextProps {}

const Text = ({ children, style, ...props }: TextProps) => {
  return (
    <RNText style={style} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
