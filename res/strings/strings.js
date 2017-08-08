const strings = {
  APP_NAME: 'Posture Linking',
  DEVELOP_MODE: 'Development Mode',
  FETCH_TIMEOUT_MESSAGE: 'Server connection timeout',
  BLUETOOTH_CANCELED_MESSAGE: 'You must turn on the Bluetooth',
  SCAN_TITLE: 'Scan',
  POSTURE_TITLE: 'Posture',
  COMBINATION_TITLE: 'Combinations',
  BUTTON_LIST_TITLE: 'Button List',
  SERVICE_LIST_TITLE: 'Service List',
  AUTHORIZING_FAILED: 'Authorizing failed',
  AUTHORIZING_SUCCESSED: 'Authorizing successed',
  SCANNING_DEVICE_TITLE: 'Scanning Device',
  SCANNING_POSTURE_DEVICE_TITLE: '正在找尋附近的Posture Linking智慧手環',
  postureDeviceConnectingTips: [
    '1.將智慧鞋墊電池依左右腳放入智慧鞋墊電池槽內，請確保電量指示燈為綠色。',
    '2.將智慧手環開關打開，並靠近智慧鞋墊等待10秒。',
    '3.將手機靠近智慧手環，並等待連接',
    '4.若經過一分鐘仍未掃描到裝置，請將智慧手環關閉，並將智慧鞋墊電池拔除後，返回步驟1繼續操作'
  ],
  LOGOUT: 'Logout',
  LOGIN: 'Login',
  SIGNUP: 'Sign Up',
  USERNAME: 'User Name',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  EMAIL: 'Email Address',
  OK: 'OK',
  IF_USE: 'IF use',
  THEN_USE: ',then use',
  SELECT_TIME: 'Please select the time',
  NO_SETTING: 'No settings are required',
  IF_TEXT: 'IF ○○○',
  THEN_TEXT: 'THEN ○○',
  DETAILED_SETTING: 'Detailed settings',
  NUMBERS_ONLY_WARNING: 'Please enter numbers only',
  SAVE_BUTTON_TEXT: 'Save',

  services : {
    1 : 'Button',
    2 : 'Timer',
    3 : 'LINE Messaging',
    4 : 'Posture',
    5 : 'Notification',
    6 : 'LINE Notify',
    7 : 'Sheet Music Turner',
    8 : 'Smart Bulb',
    9 : 'Slide Show',
    10 : 'Camera'
  },

  //events
  events: {
    //trigger
    1 : {
      description : 'When button has been clicked',
      options: []
    },
    2 : {
      description : 'At every specific time',
      options: ['time'],
    },
    3 : {
      description : 'When a message has been received',
      options: ['message']
    },
    15: {
      description : 'When standing',
      options: []
    },
  //action
    4: {
      description : 'Notify to smart phone',
      options: ['message']
    },
    5: {
      description : 'Notify to LINE',
      options: ['message']
    },
    6: {
      description : 'Turn to next page of sheet music',
      options: ['']
    },
    7: {
      description : 'Turn to previous page of sheet music',
      options: ['']
    },
    8: {
      description : 'Start from first page of sheet music',
      options: ['']
    },
    9: {
      description : 'Turn the smart bulb on',
      options: ['']
    },
    10: {
      description : 'Turn the smart bulb off',
      options: ['']
    },
    11: {
      description : 'Turn to next page of slide show',
      options: ['']
    },
    12: {
      description : 'Turn to previous page of slide show',
      options: ['']
    },
    13: {
      description : 'Start from first page of slide show',
      options: ['']
    },
    14: {
      description : '"Capture the photo"',
      options: ['']
    }
  },

  postureNames: {
    'lying down': '躺著',
    'lying on front': '趴著',
    'sitting': '坐著',
    'shaking hand when sitting': '坐著揮手',
    'claping hands when sitting': '坐著拍手',
    'right step when sitting': '坐著踏右腳',
    'left step when sitting': '坐著踏左腳',
    'cross right leg': '翹右腳',
    'cross left leg': '翹左腳',
    'play computer': '打電腦',
    'standing': '站著',
    'shaking hand when standing': '站著揮手',
    'jumping': '跳躍',
    'claping hands when standing': '站著拍手',
    'right step when standing': '站著踏右腳',
    'left step when standing': '站著踏左腳',
    'walking': '走路',
    'running': '跑步'
  }
};

export default strings;
