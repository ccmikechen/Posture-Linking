import net from 'react-native-tcp';

class RemoteController {

  constructor() {
    this.ip = '192.168.43.27';
    this.port = '7007';
    this.client = new net.Socket();
    console.log('client', this.client);
  }

  press(key) {
    this._connect().then(() => {
      console.log('connected');
      switch (key) {
        case 'RIGHT':
          this.send(0x31);
          break;
        case 'LEFT':
          this.send(0x32);
          break;
        case 'UP':
          this.send(0x33);
          break;
        case 'DOWN':
          this.send(0x34);
          break;
        case 'HOME':
          this.send(0x35);
          break;
        case 'END':
          this.send(0x36);
          break;
        case 'F5':
          this.send(0x37);
          break;
        case 'SHIFT-F5':
          this.send(0x38);
          break;
        case 'ESC':
          this.send(0x39);
          break;
      }
    });
  }

  async _connect() {
    try {
      await this.client.connect(this.port, this.ip);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  _disconnect() {
    this.client.destroy();
  }

  send(byte) {
    this.client.write(Buffer.from([byte, 0x0a]));
  }
}

export default RemoteController;
