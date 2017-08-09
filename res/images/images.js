const images = {
	icon: [
      { name: 'Trigger', icon: require('./serviceIcon/defult.png'), color: '#F39FB3', serviceType: 0 },
      { name: 'Action', icon: require('./serviceIcon/defult.png'), color: '#F3D29C', serviceType: 0 },
      { name: 'button', icon: require('./serviceIcon/button.png'), color: '#F78D8D', serviceType: 0 },
      { name: 'line notify', icon: require('./serviceIcon/line.png'), color: '#4ECD00', serviceType: 1 },
      { name: 'line messaging', icon: require('./serviceIcon/line.png'), color: '#4ECD00', serviceType: 1 },
      { name: 'notification', icon: require('./serviceIcon/notify.png'), color: '#6A9CCC', serviceType: 0 },
      { name: 'timer', icon: require('./serviceIcon/timer.png'), color: '#2aceba', serviceType: 0 },
      { name: 'gmail', icon: require('./serviceIcon/gmail.png'), color: '#DB4639', serviceType: 1 },
      { name: 'facebook', icon: require('./serviceIcon/facebook.png'), color: '#23599B', serviceType: 1 },
      { name: 'smart bulb', icon: require('./serviceIcon/homeDevice.png'), color: '#5EBBE7', serviceType: 0 },
      { name: 'camera', icon: require('./serviceIcon/camera.png'), color: '#FC8B29', serviceType: 0 },
      { name: 'sheet music turner', icon: require('./serviceIcon/musicStand.png'), color: '#3FA9F5', serviceType: 0 },
      { name: 'posture', icon: require('./serviceIcon/posture.png'), color: '#F47777', serviceType: 0 },
      { name: 'slide show', icon: require('./serviceIcon/briefing.png'), color: '#ab20a0', serviceType: 0 }
  ],
  ADD_ANDROID: require('./icon/add@64.png'),
  ADD_IOS: require('./icon/add@20.png'),
  CLOSE_ANDROID: require('./icon/close@64.png'),
  CLOSE_IOS: require('./icon/close@20.png'),
  MENU_IOS: require('./icon/menu@20.png'),
  ANIMATED_CHECK: require('./icon/check.png'),
  BLUETOOTH: require('./icon/blueTooth.png'),
  SEARCH: require('./icon/search.png'),
  HORTRIGGER: require('./puzzle/horTrigger.png'),
  HORACTION: require('./puzzle/horAction.png'),
  VERTRIGGER: require('./puzzle/verTrigger.png'),
  VERACTION: require('./puzzle/verAction.png'),
  APP_ICON: require('./appLogo/posture-linking@64.png'),
	
  postures: {
    SITTING: require('./posture/sitting.png'),
    STANDING: require('./posture/standing.png'),
		WALKING: require('./posture/walking.png'),
    JUMPING: require('./posture/jumping.png'),
		AKIMBO: require('./posture/akimbo.png'),
		COMPUTER: require('./posture/computer.png'),
		UPSTAIRS: require('./posture/upstairs.png'),
		DOWNSTAIRS: require('./posture/downstairs.png'),
		DRINK_WHEN_SITTING: require('./posture/drink_when_sitting.png'),
		DUCK: require('./posture/duck.png'),
		LEFT_LEG_CROSS: require('./posture/left_leg_cross.png'),
		RIGHT_LEG_CROSS: require('./posture/right_leg_cross.png'),
		PHONE_WHEN_SITTING: require('./posture/phone_when_sitting.png'),
		PHONE_WHEN_STANDING: require('./posture/phone_when_standing.png')
  }
};

export default images;
