import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF'
  },
  message: {
    fontSize: 26,
    textAlign: 'center',
  },
  activityIndator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'white'
  },
  itemList: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor:'#A1DEC0',
    marginTop:15
    },
    typeIcon: {
      margin: 10,
      width: 100,
      height: 100,
      backgroundColor:'#A1DEC0',
    },
    typeIconContainer: {
      flex:1,
      flexDirection:'row',
      justifyContent: 'space-evenly'
    },
    slogenContainer: {
      margin:10,
      height:'15%',
      borderWidth: 2,
      borderRadius: 2,
      borderStyle: 'dashed',
      borderColor: '#A1DEC0',
    },



    textArea: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 5,
      paddingLeft: 8
    },
    textList: {
      flex: 1,
      fontSize: 14,
      color: 'grey'
    },
    titleList: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      paddingTop:12
    },
    buttonStyle:{
      paddingBottom:20
    }
})

export default styles