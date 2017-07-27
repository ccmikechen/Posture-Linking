import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  userView:{
  	flex:6,
  	flexDirection: 'column',
  	justifyContent: 'center',
  	borderBottomWidth: 1,
  	borderBottomColor: R.colors.BORDER,
  	backgroundColor: R.colors.USER_VIEW
  },
  userImg:{
  	flex:3,
  	justifyContent: 'flex-end',
  	paddingLeft: 10
  },
  userText:{
  	flex:2,
  	justifyContent: 'space-between',
  	paddingLeft: 20,
  	paddingRight: 20,
  	paddingTop: 10
  },
  logoutView:{
  	flex:1,
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  },
  username:{
  	fontSize: 14,
  	color: R.colors.USER_TEXT
  },
  content:{
  	flex:15,
  	flexDirection: 'column',
  	backgroundColor: R.colors.MENU_BACKGROUND
  },
  items:{
  	flexDirection: 'row',
  	alignItems: 'center',
  	height: 70,
  	borderBottomWidth: 1,
  	borderBottomColor: R.colors.BORDER,
  	paddingLeft: 20
  },
  itemsText:{
  	marginLeft: 10,
  	fontSize: 16
  },
  version:{
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
    backgroundColor: R.colors.MENU_BACKGROUND
  },
  versionText:{
    fontSize:14
  }
});
