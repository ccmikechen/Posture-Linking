import ButtonTrigger from './ButtonTrigger';
import NotificationAction from './NotificationAction';
import LineNotifyAction from './LineNotifyAction';

const SERVICE_MAP = {
  'trigger': {
    'button': ButtonTrigger
  },
  'action': {
    'notification': NotificationAction,
    'line notify': LineNotifyAction
  }
}

export default SERVICE_MAP;