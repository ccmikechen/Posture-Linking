import EventEmitter from 'events';
import PostureDetector from '../modules/PostureDetector';

const DATA_LIST_LENGTH = 16;
const RECOGNITION_EVENT_TITLE = 'posture:recognition';

const typeMap = {
   "1": "A0001",
   "2": "A0002",
   "3": "A0003",
   "4": "A0004",
   "5": "A0005",
   "6": "A2006",
   "7": "A0007",
   "8": "A2008",
   "9": "A0009",
   "10": "B3001",
   "11": "B1002",
   "12": "B1003",
   "13": "B1004",
   "14": "B3005",
   "15": "B3006",
   "16": "C3001",
   "17": "C3002",
   "18": "D0001",
   "19": "D0002",
   "20": "D0003",
   "21": "D0004",
   "22": "D0005",
   "23": "D0006",
   "24": "D0007",
   "25": "D2008",
   "26": "D0009",
   "27": "E0001",
   "28": "E0002",
   "29": "E0003",
   "30": "E0004"
};

class PostureRecognizer {
  constructor(dataEmitter) {
    this.eventEmitter = new EventEmitter();
    this.dataList = [];
    this.handleDataNotification = this.handleDataNotification.bind(this);
    this.dataEmitter = dataEmitter;
    dataEmitter.on('posture:notification', this.handleDataNotification);
  }

  handleDataNotification(data) {
    this.dataList.push(this.parseDataToArray(data));

    if (this.dataList.length > DATA_LIST_LENGTH) {
      this.dataList.shift();

      let flattenClone = this.flattenDataList(this.dataList);
      this.predictPosture(flattenClone);
    }
  }

  parseDataToArray(data) {
    let normalizedData = [
      ...this.normalizeAcc(data.insole.left),
      ...this.normalizePressure(data.insole.left),
      ...this.normalizeAcc(data.insole.right),
      ...this.normalizePressure(data.insole.right),
      ...this.normalizeAcc(data.band.acc),
//      ...this.normalizeAcc(data.band.gyro)
    ];

    return normalizedData;
  }

  predictPosture(dataList) {
    let result = PostureDetector.detect(dataList, (result, label) => {
      this.eventEmitter.emit(RECOGNITION_EVENT_TITLE, {
        result,
        label,
        id: typeMap[label]
      });
    });
  }

  normalize(data, {max, min}) {
    return (data - min) / (max - min);
  }

  normalizeAcc({x, y, z}) {
    const accRange = { min: -2, max: 2 };

    return [
      this.normalize(x, accRange),
      this.normalize(y, accRange),
      this.normalize(z, accRange)
    ];
  }

  normalizePressure({a, b, c, d}) {
    const pressureRange = { min: 0, max: 255 };

    return [
      this.normalize(a, pressureRange),
      this.normalize(b, pressureRange),
      this.normalize(c, pressureRange),
      this.normalize(d, pressureRange)
    ];
  }

  flattenDataList(dataList) {
    let json = JSON.stringify(dataList);
    let flattenJson = json.slice(1, json.length - 1).replace(/\],\[/g, ',');

    return JSON.parse(flattenJson);
  }

  addListener(callback) {
    this.eventEmitter.on(RECOGNITION_EVENT_TITLE, callback);
  }

  removeListener(callback) {
    this.eventEmitter.removeListener(RECOGNITION_EVENT_TITLE, callback);
  }

  removeAllListeners(callback) {
    this.eventEmitter.removeAllListeners();
  }

  destroy() {
    this.removeAllListeners();
    this.dataEmitter.removeListener('posture:notification', this.handleDataNotification);
  }
}

export { PostureRecognizer as default };
