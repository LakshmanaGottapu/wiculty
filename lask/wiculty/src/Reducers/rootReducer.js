import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';
import courseDetailsReducer from '../Component/courseDetails/courseDetailsReducer';
import searchCourses from '../Component/search/searchReducer';
import allCourses from '../Component/allcourses/allCoursesReducer';
import orderSummaryReducer from '../Component/orderSummary/orderSummaryReducer';
import profileReducer from '../Component/profile/profileReducer';
import mycourseReducer from '../Component/mycourses/mycourseReducer';
import LMSReducer from '../Component/LMS/LMSReducer';
import countryList from '../Component/country_dropdown/countryDdReducer';
import homeCourses from '../Component/landing/coursecardFirstsecReducer';
import seoContent from '../Component/landing/seoReducer';
import offerReducer from '../Component/banner/bannerReducer';
import upcomingClasses from '../Component/LMS/upcomingClassesReducer';
import globalReducer from './globalReducer';
import LBayBatchReducer from '../Component/mycourses/lectureBayBatchDetails/LBayBatchDetailsReducer';
import recordingsReducer from '../Component/LMS/LMSModulePanel/recordingsReducer';
import attendanceReducer from '../Component/LMS/LMSModulePanel/attendanceReducer';
import myOrdersReducer from '../Component/myorders/myOrdersReducer';
import mybatchDetails from '../Component/mybatches/myBatchesReducer';
import refferalInfo from '../Component/registration/refferalInfo';
import currencyList from './currencyListReducer';
import trendingTopics from '../Component/landing/trendingTopics/trendingTopicsReducer';
import redeemWallet from '../Component/reffer/redeemReducer';
import homeContent from '../Component/landing/homePageContent/homeReducer';
import UserPrefInfo from '../Component/userPrefInfo/UP_Reducer'
import batchInfo from '../Component/courseDetails/batchDetails/batchInfoReducer'
import sessionExpireInfo from '../Component/session_handle/Reducer/sessionExpire';
import allEvents from '../Component/Events/webinarsReducer';
import eventInfo from '../Component/Events/eventDetails/eventInfoReducer';
import requestBatch from '../Component/courseDetails/requestBatch/requestBatchReducer'

export default history => combineReducers({
  router: connectRouter(history),
  courseDetails: courseDetailsReducer,
  searchCourses,
  allCourses,
  countryList,
  orderSummaryDetails: orderSummaryReducer,
  profileDetails: profileReducer,
  mycourseDetails: mycourseReducer,
  LMSDetails: LMSReducer,
  homeCourses,
  offerReducer,
  loadingBar: loadingBarReducer,
  globalDetails: globalReducer,
  upcomingClasses,
  seoContent,
  LBayBatchDetails: LBayBatchReducer,
  recordingsReducer,
  attendanceReducer,
  myOrdersReducer,
  mybatchDetails,
  currencyList,
  refferalInfo,
  trendingTopics,
  redeemWallet,
  homeContent,
  UserPrefInfo,
  batchInfo,
  sessionExpireInfo,
  allEvents,
  eventInfo,
  requestBatch
})
