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
    marginLeft: R.sizes.WIDTH*0.06
  },
  userImg:{
    flex: 6,
    justifyContent: 'flex-end',
  },
  username:{
    flex: 2,
    fontSize: R.sizes.USERNAME_FONT,
    color: R.colors.USER_TEXT
  },
  logoutContent:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  logoutTouch:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10
  },
  logoutText:{
    fontSize: R.sizes.LOGOUT_FONT,
    color: R.colors.USER_TEXT,
    marginLeft: 5
  },
  content:{
  	flex: 14,
  	flexDirection: 'column',
  	backgroundColor: R.colors.MENU_BACKGROUND
  },
  items:{
  	flexDirection: 'row',
  	alignItems: 'center',
  	height: R.sizes.HEIGHT*0.1,
  	borderBottomWidth: 1,
  	borderBottomColor: R.colors.BORDER,
  	paddingLeft: R.sizes.WIDTH*0.06
  },
  itemsText:{
  	marginLeft: R.sizes.WIDTH*0.06,
  	fontSize: R.sizes.ITEM_FONT
  },
  version:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 5,
    backgroundColor: R.colors.MENU_BACKGROUND
  },
  versionText:{
    fontSize: R.sizes.VERSION_FONT
	}
});
