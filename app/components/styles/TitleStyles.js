import { StyleSheet, Platform } from 'react-native';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#313842',
    borderRadius: 2,
    borderColor: '#1B2127',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    height: APPBAR_HEIGHT,
    justifyContent: 'center',
  },

  title: {
    textAlign: 'center',
    color: '#e7d629',
    fontWeight: '600',
  },

  langButton: {
    color: 'red',
    top:0,
    bottom: 0,
    right: 0,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent:'center',
    backgroundColor: '#DDDDDD',
    position: 'absolute',
  },
});

export default styles;
