import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {commonColors, textStyles} from '../../docs/config';

interface ButtonProps {
  loading?: boolean;
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  onPress,
  title,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[styles.submitButton, style]}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={styles.submitButtonText}>
          {loading ? <ActivityIndicator color={'white'} size={30} /> : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: commonColors.primaryColor,
    // paddingVertical: 7,
    // paddingHorizontal: 15,

    height: hp("2.7%"),
    width: hp('5%'),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // marginTop: 10,
  },
  submitButtonText: {
    fontSize: hp('1.2%'),
    color: '#FFFFFF',
    fontFamily: textStyles.mediumFont,
  },
});
