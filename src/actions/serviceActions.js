import { getServices, getServiceById, reloadService } from '../../lib/helper';
import poselink from '../api/poselink';

export const IS_GETTING_SERVICES = 'IS_GETTING_SERVICES';
export const IS_NOT_GETTING_SERVICES = 'IS_NOT_GETTING_SERVICES';
export const GET_SERVICES = 'GET_SERVICES';
export const SELECT_SERVICE = 'SELECT_SERVICE';
export const GET_SERVICE = 'GET_SERVICE';
export const DISCONNECT_SERVICE = 'DISCONNECT_SERVICE';
export const IS_AUTHORIZING = 'IS_AUTHORIZING';
export const IS_NOT_AUTHORIZING = 'IS_NOT_AUTHORIZING';
export const SUCCESS_AUTHORIZE = 'SUCCESS_AUTHORIZE';
export const CONNECT_SERVICE = 'CONNECT_SERVICE';

export const getServiceList = () => (dispatch) => {
  let services = getServices();
  dispatch({ type: GET_SERVICES, services });
  dispatch({ type: IS_GETTING_SERVICES });
};

export const selectService = (id) => (dispatch) => {
  dispatch({ type: SELECT_SERVICE, id});
};

export const getService = (id) => (dispatch) => {
  let selectService = getServiceById(id);
  let service = {
    id: selectService.id,
    name: selectService.name,
    icon: selectService.icon,
    classification: selectService.classification,
    isConnected: selectService.isConnected()
  };
  console.log(service)
  dispatch({ type: GET_SERVICE, service });
};

export const isNotGettingServices = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_SERVICES });
}

export const disconnectService = (service) => (dispatch) => {
  let id = service.id;
  dispatch({ type: IS_AUTHORIZING });
  return service.unauthorize()
    .then(() => {
      dispatch({ type: DISCONNECT_SERVICE , id })
      dispatch({ type: IS_NOT_AUTHORIZING })
    })
};

export const connectService = (id) => (dispatch) => {
  dispatch({ type: IS_AUTHORIZING });
  reloadService(id).then(()=> {
    let selectService = getServiceById(id);
    let service = {
      id: selectService.id,
      name: selectService.name,
      icon: selectService.icon,
      classification: selectService.classification,
      isConnected: selectService.isConnected()
    };
    dispatch({ type: SUCCESS_AUTHORIZE, service });
    dispatch({ type: CONNECT_SERVICE, id });
    dispatch({ type: IS_NOT_AUTHORIZING })
  })
}