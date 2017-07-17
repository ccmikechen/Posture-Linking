import ButtonTrigger from './ButtonTrigger';
import NotificationAction from './NotificationAction';
import LineNotifyAction from './LineNotifyAction';
import TimerTrigger from './TimerTrigger';
import LineMessagingTrigger from './LineMessagingTrigger';
import CameraAction from './CameraAction';
import SheetMusicTurnerAction from './SheetMusicTurnerAction';
import SlideShowAction from './SlideShowAction';
import SmartBulbAction from './SmartBulbAction';
import PostureTrigger from './PostureTrigger';

const SERVICE_MAP = {
  'trigger': {
    'button': ButtonTrigger,
    'timer': TimerTrigger,
    'line messaging': LineMessagingTrigger,
    'posture': PostureTrigger
  },
  'action': {
    'notification': NotificationAction,
    'line notify': LineNotifyAction,
    'sheet music turner': SheetMusicTurnerAction,
    'slide show': SlideShowAction,
    'smart bulb': SmartBulbAction,
    'camera': CameraAction
  }
};

export default SERVICE_MAP;
