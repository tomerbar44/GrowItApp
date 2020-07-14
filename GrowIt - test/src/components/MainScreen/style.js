import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF'
  },
  sloganContainer: {
    margin: 10,
    height: '18%',
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    borderColor: '#A1DEC0',
    justifyContent:'center',
    alignItems:'center'
  },
  txtStyle: {
    fontSize: 18,
    padding: 5,
    fontFamily: 'Comfortaa_600SemiBold',
    
  },
  cardStyle: {
    borderStyle: 'solid',
    borderColor: '#A1DEC0',
    borderWidth: 1
  },
  imgStyle: {
    height: 200,
    width: null,
    flex: 1
  },
  margin: {
    margin: 10
  }
});

export default styles;
