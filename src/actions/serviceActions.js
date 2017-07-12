import { getServices } from '../../lib/helper';

export const IS_GETTING_SERVICES = 'IS_GETTING_SERVICES';
export const IS_NOT_GETTING_SERVICES = 'IS_NOT_GETTING_SERVICES';
export const GET_SERVICES = 'GET_SERVICES';

export const getServiceList = () => (dispatch) => {
  dispatch({ type: IS_NOT_GETTING_SERVICES });
  let services = getServices();
  dispatch({ type: GET_SERVICES, services });
  dispatch({ type: IS_GETTING_SERVICES });
};