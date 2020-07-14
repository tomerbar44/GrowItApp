import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Comfortaa_600SemiBold',
  },
  emptyList: {
    fontSize: 22,
    textAlign: 'center',
    paddingTop: '20%'
  },
  buttons: {
    marginTop: 5,
    marginRight: 2,
    flex: 1,
    justifyContent: 'space-between'
  },
  irrigateBtn: {
    marginBottom: 15
  },
  clock: {
    paddingRight: 75,
    paddingTop: 5
  },
  clockDigitTxtStyle: {
    color: '#666666'
  },
  clockDigitStyle: {
    backgroundColor: '#A1DEC0',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  clockTimeLabelStyle: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  clockSeparatorStyle: {
    color: '#A1DEC0'
  },
  clockTimeToShow: {},
  clockTimeLabels: {}
});

export default styles;
