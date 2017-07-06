import { AsyncStorage } from 'react-native';
import { Socket } from 'phoenix';

const SOCKET_URL = 'wss://t21.bearlab.io/socket';

const getToken = async () => {
  return await AsyncStorage.getItem('@session:token');
};

const configureChannel = async () => {
  let socket = new Socket(SOCKET_URL, {
    logger: (kind, msg, data) => {
    }
  });
  let token = await getToken();

  socket.connect({guardian_token: token});
  return socket;
}

const CHANNEL_TOPICS = ['posture:record'];

let socket = null;
let channels = {};

export const initialSocket = async () => {
  socket = await configureChannel();
  token = await getToken();

  CHANNEL_TOPICS.forEach(topic => (
    channels[topic] = socket.channel(topic, {guardian_token: token})
  ));
}

export const getChannel = (topic) => (
  channels[topic]
);
