import EventEmitter from 'events';
import PostureDetector from '../modules/PostureDetector';
import api from '../api/poselink';

const DATA_COLS = 17;
const DATA_LIST_LENGTH = 8;
const BATCH_GAP = 1;
const RECOGNITION_EVENT_TITLE = 'posture:recognition';

class PostureRecognizer {
  constructor(dataEmitter) {
    this.setPostures = this.setPostures.bind(this);
    this.predictPosture = this.predictPosture.bind(this);
    this.handlePredictResult = this.handlePredictResult.bind(this);
    this.handleDataNotification = this.handleDataNotification.bind(this);
    this.init = this.init.bind(this);

    this.dataEmitter = dataEmitter;
  }

  async init() {
    let postures = await api.getPostures();
    this.setPostures(postures);
    PostureDetector.reloadModel(postures.length, DATA_COLS, DATA_LIST_LENGTH);
    this.eventEmitter = new EventEmitter();
    this.dataList = [];
    this.dataEmitter.on('posture:notification', this.handleDataNotification);
  }

  handleDataNotification(data) {
    this.dataList.push(this.parseDataToArray(data));

    if (this.dataList.length + 1 > DATA_LIST_LENGTH + BATCH_GAP) {
      this.dataList = this.dataList.slice(BATCH_GAP, this.dataList.length);

      let flattenClone = this.flattenDataList(this.dataList);
      this.predictPosture(flattenClone);
    }
  }

  setPostures(postures) {
    console.log('postures', postures);
    this.postures = postures.reduce(({ id, name }, acc) => {
      acc[id] = name;
      return acc;
    }, {});
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
    PostureDetector.detect(dataList, this.handlePredictResult);
  }

  handlePredictResult(result, id) {
    this.eventEmitter.emit(RECOGNITION_EVENT_TITLE, {
      result,
      id,
      name: this.postures[id]
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

export default PostureRecognizer;
