const BASE_URL = process.env.REACT_APP_USER_API_END_POINT;
const local = {
  RESOURCES: {
    SERVICE_URL: {
      SIGNIN_URL: `${BASE_URL}login`,
      SIGNUP_URL: `${BASE_URL}register`,
      COURSE_SEARCH_HINT_URL: `${BASE_URL}search/hint/`,
      COURSE_DETAILS_URL: `${BASE_URL}course`,
      REVIEW_URL: `${BASE_URL}reviews`,
      COUNTRY_LIST_URL: `${BASE_URL}country/list`,
      ORDER_SUMMARY_URL: `${BASE_URL}price-info`,
      ORDER_CREATE_URL: `${BASE_URL}order-create`,
      APPLY_COUPON_URL: `${BASE_URL}apply-coupon`,
      PROFILE_URL: `${BASE_URL}profile`,
      HOME_PAGE: `${BASE_URL}home`,
      ALL_COURSES: `${BASE_URL}all-courses`,
      SEARCH_HINT: `${BASE_URL}search/hint/`,
      CATEGORY: `${BASE_URL}category/`,
      SEARCH: `${BASE_URL}search/`,
      MYCOURSES_URL: `${BASE_URL}my-course`,
      UPDATE_PROFILE_INFO: `${BASE_URL}profile`,
      UPDATE_GROOMIN_INFO: `${BASE_URL}career`,
      UPDATE_PROFESSIONAL_INFO: `${BASE_URL}professional`,
      UPDATE_QUALIFICATION_INFO: `${BASE_URL}qualification`,
      RELEVANT_COURSES_INFO: `${BASE_URL}related/courses`,
      LMS_DETAILS: `${BASE_URL}course/content/`,
      ENQUIRY: `${BASE_URL}enquiry`,
      COURSE_LIST: `${BASE_URL}course-list`,
      SEO: `${BASE_URL}seo-content`,
      OFFER: `${BASE_URL}offer/banner`,
      TRENDING_TOPICS: `${BASE_URL}get-webinars`,
      ENQUIRY_OTP: `${BASE_URL}enquiry-otp`,
      VERIFY_OTP: `${BASE_URL}verify-otp`,
      INSTRUCTOR_INFO: `${BASE_URL}become-instructor`,
      CORPORATE_INFO: `${BASE_URL}get-started`,
      UPCOMING_CLASSES: `${BASE_URL}upcoming-classes`,
      RESET_PASSWORD: `${BASE_URL}reset-password`,
      RESEND_OTP: `${BASE_URL}resend-otp`,
      COURSE_FEED_BACK: `${BASE_URL}feedback`,
      LBAY_BATCH_DETAILS: `${BASE_URL}batch/`,
      GET_STARTED: `${BASE_URL}get-started`,
      REGISTER_WEBINAR: `${BASE_URL}webinar-request`,
      VERIFY_ANSWER: `${BASE_URL}quiz/verify-answers`,
      WICULTY_CAREER_INFO: `${BASE_URL}career/apply`,
      SUGGEST: `${BASE_URL}suggest-course`,
      AFFILIATE: `${BASE_URL}affiliate`,
      CHANGE_PASSWORD: `${BASE_URL}change-password`,
      RECORDINGS: `${BASE_URL}recordings/`,
      ATTENDANCE: `${BASE_URL}attendance/`,
      CALLBACK: `${BASE_URL}request-call-back`,
      MYORDERS: `${BASE_URL}my-orders`,
      BATCHSELECT: `${BASE_URL}enroll/batch`,
      BATCHES: `${BASE_URL}my-batch`,
      CURRENCY_LIST: `${BASE_URL}currency/list`,
      PROMO_CODE: `${BASE_URL}apply-coupon`,
      REFERRALS: `${BASE_URL}my-referrals`,
      CLASS_FEEDBACK: `${BASE_URL}class-feedback`,
      REQUEST_CERTIFICATE: `${BASE_URL}request/certificate/`,
      REDEEM_WALLET: `${BASE_URL}redeem-wallet`,
      USER_PREF_INFO: `${BASE_URL}preference`,
      COUNTRY_REALTED_BATCH_INFO: `${BASE_URL}course/batch`,
      LOG_OUT: `${BASE_URL}logout`,
      ALL_WEBINARS: `${BASE_URL}events`,
      EVENT_INFO: `${BASE_URL}event`,
      EVENT_REGISTER: `${BASE_URL}event-enroll`,
      REQUEST_BATCH: `${BASE_URL}request-batch`,
      FREE_COURSE_ENROLL_URL: `${BASE_URL}enroll/free-course`
    }
  }
};

export default local;
