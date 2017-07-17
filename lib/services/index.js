import ButtonTrigger from './ButtonTrigger';
import NotificationAction from './NotificationAction';
import LineNotifyAction from './LineNotifyAction';
import TimerTrigger from './TimerTrigger';
import LineMessagingTrigger from './LineMessagingTrigger';
import CameraAction from './CameraAction';
import SheetMusicFumerAction from './SheetMusicFumerAction';
import SlideShowAction from './SlideShowAction';
import SmartBulbAction from './SmartBulbAction';

const SERVICE_MAP = {
  'trigger': {
    'button': ButtonTrigger,
    'timer': TimerTrigger,
    'line messaging': LineMessagingTrigger
  },
  'action': {
    'notification': NotificationAction,
    'line notify': LineNotifyAction,
    'sheet music fumer': SheetMusicFumerAction,
    'slide show': SlideShowAction,
    'smart bulb': SmartBulbAction,
    'camera': CameraAction
  }
};

export default SERVICE_MAP;
