export const UPDATE_COMBINATION_LIST = 'UPDATE_COMBINATION_LIST';
export const UPDATE_ACTION_LIST = 'UPDATE_ACTION_LIST';
export const IS_GET_ACTION_LIST = 'IS_GET_ACTION_LIST';

export const updateCombinationList = () => (dispatch) => {
  let data = ['test1', 'test2', 'test3', 'test4'];
  dispatch({ type: UPDATE_COMBINATION_LIST , data});
}

export const getActionList = () => (dispatch) => {
  let actions = [{
    'api_name': 'Facebook',
    'url': 'https://www.facebook.com'
   },{
     'api_name': 'LINE',
     'url': 'https://line.me'
   }];
   dispatch({ type: UPDATE_ACTION_LIST, actions})
   dispatch({ type: IS_GET_ACTION_LIST})
}
