const logOut = (data = {}, cb) => (dispatch) => {
  dispatch({ type: 'RESET', data });
};
export default logOut;
