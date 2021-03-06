import { I18nManager, StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#1B2127',
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#1B2127',
  },

  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'green',
  },

  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FE4D33',
  },

  icon: {
    color: 'white',
  },

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#182129',
  },
});

export default commonStyles;
