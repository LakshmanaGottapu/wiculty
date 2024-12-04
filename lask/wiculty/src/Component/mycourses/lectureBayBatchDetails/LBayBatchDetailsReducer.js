// import LBayBatchJson from '../../test/LBayBatchDetails.json';

export default function LBayBatchDetails (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_LBAY_BATCH_DETAILS__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_LBAY_BATCH_DETAILS__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_LBAY_BATCH_DETAILS__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
