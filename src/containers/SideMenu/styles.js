import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  userView:{
  	flex:5,
  	flexDirection: 'row',
  	justifyContent: 'center',
  	borderBottomWidth: 1,
  	borderBottomColor: R.colors.BORDER,
  	backgroundColor: R.colors.USER_VIEW
  },
  userInfo:{
  	flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
  	paddingLeft: 10
  },
  userImg:{
    flex: 6,
    justifyContent: 'flex-end'
  },
  username:{
    flex: 2,
    fontSize: 14,
    color: R.colors.USER_TEXT
  },
  logoutView:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5
  },
  logoutEmpty:{
    flex: 6
  },
  logoutContent:{
    flex: 2
  },
  logoutTouch:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logoutText:{
    fontSize: 14,
    color: R.colors.USER_TEXT,
    marginLeft:5
  },


  content:{
  	flex:14,
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
  	marginLeft: 20,
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
	},
	cover: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
