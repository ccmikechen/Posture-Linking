import { AsyncStorage } from 'react-native';
import { Socket } from 'phoenix';

const SOCKET_URL = 'wss://t21.bearlab.io/socket';

const getToken = async () => {
  return await AsyncStorage.getItem('@session:token');
};

const configureChannel = async () => {
  let token = await getToken();
  let socket = new Socket(SOCKET_URL, {
    logger: (kind, msg, data) => {
    },
    params: {
      'guardian_token': token
    }
  });

  socket.connect();

  socket.onOpen(event => console.log('Socket connection opened', event));
  socket.onError(event => console.log('Socket connection error', event));
  socket.onClose(event => console.log('Socket connection closed', event));

  return socket;
};

let socket = null;
let channels = {};

export const initialSocket = async () => {
  socket = await configureChannel();
  token = await getToken();
};

export const getChannel = async (topic) => {
  token = await getToken();
  return socket.channel(topic, {guardian_token: token});
};
