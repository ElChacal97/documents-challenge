import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Modalize, ModalizeProps } from "react-native-modalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: screenHeight } = Dimensions.get("window");

interface Props {
  children?: React.JSX.Element | React.JSX.Element[];
  showCloseButton?: boolean;
  showHandle?: boolean;
  onCloseModal?: () => void;
  visible: boolean;
  fullHeight?: boolean;
}

const DrawerModal = forwardRef(
  (props: Props & ModalizeProps, parentRef): React.JSX.Element => {
    const modalizeRef = useRef<Modalize>(null);
    const bottomInset = useSafeAreaInsets().bottom;

    useImperativeHandle(parentRef, () => ({ close, open }));

    useEffect(() => {
      if (props.visible) {
        modalizeRef.current?.open();
      }
    }, [props.visible]);

    const close = () => {
      modalizeRef.current?.close();
    };

    const open = () => {
      modalizeRef.current?.open();
    };

    return (
      <Modalize
        {...props}
        ref={modalizeRef}
        onClose={props.onCloseModal}
        HeaderComponent={
          <View style={styles.header}>
            <View style={styles.leftContainer}>
              {props.showCloseButton && (
                <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
                  <Ionicons name="close-circle" size={22} color={COLORS.text} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.handleContainer}>
              {props.showHandle && <View style={styles.handle} />}
            </View>
            <View style={styles.rightContainer}></View>
          </View>
        }
        modalStyle={[styles.modal, props.modalStyle]}
        withHandle={false}
      >
        <View
          style={[
            styles.container,
            { paddingBottom: bottomInset },
            props.fullHeight && styles.fullHeightContainer,
          ]}
        >
          {props.children}
        </View>
      </Modalize>
    );
  }
);

DrawerModal.displayName = "DrawerModal";

export default DrawerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  fullHeightContainer: {
    minHeight: screenHeight * 0.88,
  },
  modal: {
    borderTopLeftRadius: 49,
    borderTopRightRadius: 49,
  },
  header: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    paddingHorizontal: 16,
  },
  leftContainer: {
    flex: 1,
  },
  handleContainer: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
  },
  handle: {
    borderRadius: 20,
    backgroundColor: COLORS.border,
    width: 37,
    height: 6,
  },
});
