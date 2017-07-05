import ButtonTrigger from './ButtonTrigger';
import NotificationAction from './NotificationAction';
import LineNotifyAction from './LineNotifyAction';
import TimerTrigger from './TimerTrigger';

const SERVICE_MAP = {
  'trigger': {
    'button': ButtonTrigger,
    'timer': TimerTrigger
  },
  'action': {
    'notification': NotificationAction,
    'line notify': LineNotifyAction
  }
}

export default SERVICE_MAP;