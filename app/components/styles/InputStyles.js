import { StyleSheet, Dimensions, I18nManager } from 'react-native';

const styles = StyleSheet.create({
  input: {
    padding: 12,
    backgroundColor: '#526373',
    color: 'white',
    fontSize: 15,
    borderRadius: 3,
    width: Dimensions.get('window').width * 0.7,
    textAlign :  I18nManager.isRTL ? 'right' : 'left',
  },
})

export default styles;