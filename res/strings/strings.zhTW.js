const strings = {
  FETCH_TIMEOUT_MESSAGE: '伺服器連線發生錯誤，請檢查網路連線。',
  BLUETOOTH_CANCELED_MESSAGE: '你必須開啟藍牙才可搜尋及連接藍牙裝置。',
  SCAN_TITLE: '掃描裝置',
  POSTURE_TITLE: '姿態',
  COMBINATION_TITLE: '組合列表',
  BUTTON_LIST_TITLE: '按鈕列表',
  SERVICE_LIST_TITLE: '服務列表',
  AUTHORIZING_FAILED: '認證失敗',
  AUTHORIZING_SUCCESSED: '認證成功',
  SCANNING_DEVICE_TITLE: '裝置掃描',
  SCANNING_POSTURE_DEVICE_TITLE: '正在找尋附近的Posture Linking智慧手環',
  SERVICE_DISCONNECT_DIRECTION: '透過下方 "認證解除" 來取消不必要的服務項目',
  SERVICE_CONNECT_DIRECTION: '透過下方 "認證授權" 來增加可使用的服務項目',
  VERSION: '版本',
  LOGOUT: '登出',
  LOGIN: '登入',
  SIGNUP: '註冊',
  USERNAME: '帳號',
  PASSWORD: '密碼',
  CONFIRM_PASSWORD: '確認密碼',
  EMAIL: '電子信箱地址',
  OK: '確定',
  IF_USE: '如果使用',
  THEN_USE: '，則觸發',
  SELECT_TIME: '請選擇時間',
  NO_SETTING: '無需做任何設定',
  IF_TEXT: '如果 ○○○',
  THEN_TEXT: '則 ○○',
  DETAILED_SETTING: '詳細設定',
  ADD_COMBINATION : '新增組合',
  services : {
    1 : '按鈕',
    2 : '定時',
    3 : 'LINE Messaging',
    4 : '姿態',
    5 : '手機通知',
    6 : 'LINE Notify',
    7 : '電子樂譜',
    8 : '智慧燈泡',
    9 : '簡報',
    10 : '相機'
  },

  //events
  events: {
    //trigger
    1 : {
      description : '當按鈕按下的時候',
      options: []
    },
    2 : {
      description : '在每個特別的時間點',
      options: ['時間'],
    },
    3 : {
      description : '當收到一則訊息',
      options: ['訊息']
    },
    15: {
      description : '當站立時',
      options: []
    },
  //action
    4: {
      description : '在手機上通知',
      options: ['訊息']
    },
    5: {
      description : '在LINE Notify通知',
      options: ['訊息']
    },
    6: {
      description : '在電子譜上翻下一頁',
      options: ['']
    },
    7: {
      description : '在電子譜上翻上一頁',
      options: ['']
    },
    8: {
      description : '在電子譜上跳回第一頁',
      options: ['']
    },
    9: {
      description : '開啟智慧燈泡',
      options: ['']
    },
    10: {
      description : '關閉智慧燈泡',
      options: ['']
    },
    11: {
      description : '簡報換下一頁',
      options: ['']
    },
    12: {
      description : '簡換換上一頁',
      options: ['']
    },
    13: {
      description : '簡報跳回第一頁',
      options: ['']
    },
    14: {
      description : '相機快門',
      options: ['']
    }
  }
};

export default strings;
