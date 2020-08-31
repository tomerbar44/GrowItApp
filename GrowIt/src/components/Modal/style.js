import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalButtons: {
    marginTop: 5,
    flexDirection: 'row'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Comfortaa_600SemiBold'
  },
  greenColor: {
    color: Colors.green800
  },
  marginRedColor: {
    marginLeft: 100,
    color: Colors.red800
  }
});

export default styles;
