import * as React from 'react';
import {Dimensions, Keyboard, StyleSheet, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const dim = Dimensions.get('window');

const SignUpCover = props => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <Svg
        width={dim.width * 1.55}
        height={dim.height * 0.4}
        viewBox="0 0 52.917 26.458"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
          d="M.018 26.46h52.977V12.832C45.362 11.405 37.735 4.98 30.102.018H.018V26.46"
          fill="#222c39"
          fillOpacity={1}
          fillRule="nonzero"
          stroke="none"
          strokeWidth={0.00748558}
        />
        <Path
          d="M18.656 26.467h34.128V12.838c-4.917-1.426-9.83-7.852-14.748-12.814h-19.38v26.443"
          fill="#222c39"
          fillOpacity={1}
          fillRule="nonzero"
          stroke="none"
          strokeWidth={0.00600812}
        />
        <Path
          d="M52.955 26.077V-.003H37.82c-3.774 1.407-7.548 2.83-11.325 4.111C17.67 7.1 8.857 9.311.033 8.898v17.18h52.922"
          fill="#1a2431"
          fillOpacity={1}
          fillRule="nonzero"
          stroke="none"
          strokeWidth={0.00743014}
        />
        <Path
          d="M52.997 26.405V3.984c-8.83 0-17.65 2.001-26.483 4.376-8.832 2.378-17.653 5.128-26.482 7.544v10.501h52.965"
          fill="#111d2b"
          fillOpacity={1}
          fillRule="nonzero"
          stroke="none"
          strokeWidth={0.00759714}
        />
        <Text style={isKeyboardVisible ? styles.headingSmall : styles.heading}>
          Join Us
        </Text>
      </Svg>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Raleway-Bold',
    alignSelf: 'flex-start',
    paddingLeft: 40,
    fontSize: 36,
    color: 'white',
    position: 'absolute',
    marginTop: dim.height * 0.28,
  },
  headingSmall: {
    fontFamily: 'Raleway-Bold',
    alignSelf: 'flex-start',
    paddingLeft: 40,
    fontSize: 28,
    color: 'white',
    position: 'absolute',
    marginTop: dim.height * 0.15,
  },
});

export default SignUpCover;
