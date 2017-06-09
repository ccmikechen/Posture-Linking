export const UPDATE_COMBINATION_LIST = 'UPDATE_COMBINATION_LIST';


export const updateCombinationList = () => (dispatch) => {
  let data = ['test1', 'test2', 'test3', 'test4'];
  dispatch({ type: UPDATE_COMBINATION_LIST , data});
}
