const globalDetails = (data = {}, cb) => (dispatch) => {
  const status = 'Data updated successfully'
  dispatch({ type: 'GET_GLOBAL_DETAILS', data });
  cb(status);
};
export default globalDetails;
