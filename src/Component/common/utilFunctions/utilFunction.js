import React from 'react';
import { UncontrolledAlert } from 'reactstrap';
import { uploadFile } from 'react-s3';
import sf from '../safeTraverse';
import authService from '../../../services/authService';
import { authenticatedRoutesArray, privateRoutesArray } from '../../routes/index';

const {
  REACT_APP_S3_BUCKET, REACT_APP_SECRET_KEY, REACT_APP_AWS_KEY, REACT_APP_S3_REGION
} = process.env;
const aws = {
  bucketName: REACT_APP_S3_BUCKET,
  dirName: 'users',
  region: REACT_APP_S3_REGION,
  accessKeyId: REACT_APP_AWS_KEY,
  secretAccessKey: REACT_APP_SECRET_KEY
}

const validateFile = (e, accept = [], maxSize = 10) => {
  const files = sf(e, ['target', 'files']) || [];
  if (files.length > 0) {
    const [file] = files;
    const { name, size } = file;
    const fileSize = (size / (1024 * 1024)).toFixed(2);
    if (fileSize > maxSize) {
      return { success: false, message: `File size should be less than ${maxSize}MB.` };
    }
    const extension = name.split('.').pop().toLowerCase();
    if (!accept.includes(extension)) {
      return { success: false, message: `Invalid file type. Allowed file types are ${accept.join(', ')}.` };
    }
  }
  return { success: true };
};

const upload = (e, pageName, uploadDir = 'users') => {
  const files = sf(e, ['target', 'files']) || [];
  const [file] = files;
  const { name } = file;
  const fileExt = name.split('.').pop().toLowerCase();
  const inputFileName = `${pageName}_${(Date.now()).toString(36).substring(5) + (Math.random() + 1).toString(36).substring(10)}.${fileExt}`;
  Object.defineProperty(files[0], 'name', {
    value: inputFileName,
    writable: true
  });
  aws.dirName = uploadDir;
  return uploadFile(files[0], aws)
}

const Message = (message, color) => (
  <UncontrolledAlert color={color} style={{ marginTop: 10 }}>
    {message}
  </UncontrolledAlert>
);

const getErrorStatus = (state) => {
  const {
    current_city, current_ctc, jobs_interested, realocate, employment_type
  } = state;
  if (current_city && current_ctc && jobs_interested && realocate && employment_type) {
    return false
  }
  return true
}

const getYears = () => {
  const years = [];
  for (let yearStart = 1970; yearStart <= new Date().getFullYear(); yearStart++) { //eslint-disable-line
    years.push(yearStart)
  }
  return years;
}

const validateDateSelection = (from_month, from_year, to_month, to_year) => {
  if (from_month && to_month && to_year && from_year && (to_year === from_year)) {
    if (to_month < from_month) {
      return true
    }
    return false
  } else if (from_month && to_month && to_year && from_year && (to_year < from_year)) { //eslint-disable-line
    return true
  }
  return false
}

// <!-- time functions start -->

const getTimeZone = (timeZoneStr) => {
  if (timeZoneStr) {
    return timeZoneStr;
  }
  const storageInfo = JSON.parse(localStorage.getItem('persist:root')) || {}
  const UP_TimeZone_Obj = storageInfo.UserPrefInfo;
  const timeZone = UP_TimeZone_Obj ? JSON.parse(UP_TimeZone_Obj).time_zone : 'America/Chicago';
  return timeZone;
}

const handleIntervalFormat = (time, formatVal, timeZoneStr = '') => {
  const timeZone = getTimeZone(timeZoneStr);
  let indiaTime = new Date(time).toLocaleString('en-US', { timeZone });
  indiaTime = new Date(indiaTime);
  return timeFormat(indiaTime, formatVal)
};

const timeFormat = (date, format) => {
  let formatedDate;
  // const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  switch (format) {
    case 'DD':
      formatedDate = date.getDate();
      break;
    case 'MMM':
      formatedDate = mS[date.getMonth()];
      break;
    case 'MM':
      formatedDate = date.getMonth() + 1;
      break;
    case 'YYYY':
      formatedDate = date.getFullYear();
      break;
    case 'hh:mma':
      formatedDate = formatAMPM(date);
      break;
    default:
      formatedDate = '';
  }
  return formatedDate;
}

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

const getOrdinal = n => ['st', 'nd', 'rd'][((n + 90) % 100 - 10) % 10 - 1] || 'th';
const zeroPad = number => (number < 10 ? '0' : '') + number;
// <!-- time functions end -->

const emptyFile = () => {
  const emptyFileName = document.createElement('input');
  emptyFileName.type = 'file';
  document.getElementById('resume').files = emptyFileName.files;
}

const scrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const scrollDown = () => {
  window.scrollTo({
    top: 5000,
    behavior: 'smooth'
  });
}

const getCapitalisedName = (name) => {
  const capitalisedName = name ? (`${name.charAt(0).toUpperCase()}${name.slice(1)}`) : ''
  return capitalisedName
}

const getDisplayName = (menuItem = '') => {
  const displayMenuObj = {
    'why-to-enroll?': 'WHY TO ENROLL',
    'faqs': 'FAQs',
    'batchDetails': 'BATCH DETAILS',
    'job-assistance': 'JOB ASSISTANCE',
    'projects': 'PROJECT',
    'roadmap_url': 'ROADMAP',
    'key-skills': 'KEY SKILLS',
    'career_prospect_url': 'CAREER PROSPECT'
  }
  return ((displayMenuObj[menuItem] && displayMenuObj[menuItem].toLowerCase()) ||
    menuItem.toLowerCase());
}

const handleScroll = (menuName) => {
  const mapObj = {
    'why-to-enroll?': 'enroll',
    'batchDetails': 'batch',
    'projects': 'project',
    'curriculum': 'curriculum',
    'key-skills': 'skills',
    'roadmap_url': 'roadmap',
    'career_prospect_url': 'career',
    'certification': 'certificate',
    'blogs': 'blogs',
    'faqs': 'faqs',
    'reviews': 'reviews',
    'recommended-courses': 'recommended-courses',
    'course-regions': 'course-regions',
    'job-assistance': 'job-assistance'
  }
  const id = mapObj[menuName]
  const [Ele] = (menuName === 'curriculum' && isDesktop()) ? document.getElementsByClassName('curriculumSection_chapters') : document.getElementsByClassName(`${id}-menu-container`)

  const top = Ele && (Ele.offsetTop - getOffSetVal());
  window.scrollTo({
    top,
    behavior: 'smooth'
  });
}

const scrollToSkills = () => {
  const [Ele] = document.getElementsByClassName('skills-menu-container');
  const top = Ele && (Ele.offsetTop - getOffSetVal());
  window.scrollTo({
    top,
    behavior: 'smooth'
  });
}

const getOffSetVal = () => (isMobileDevice() ? 100 : 150);

const getBrowserSize = () => window.screen.availWidth
const bannerMarginTop = () => {
  const offerBannerEle = document.getElementsByClassName('offerBannersec')[0]; //eslint-disable-line
  const searchBarEle = document.getElementsByClassName('customNavbar')[0]; //eslint-disable-line
  const offerBannerHeight = offerBannerEle && offerBannerEle.clientHeight;
  const searchBarHeight = searchBarEle && searchBarEle.clientHeight;
  return (offerBannerHeight || 0 + searchBarHeight || 0)
}

const getBannerMarginTop = (deskTopMargin = 0, subTractMargin = 0) => {
  // deskTopMargin: marginTop which was given to tablet & desktop
  // subTractMargin: number to subtract from offerbanner & searcheight
  let bannerMargin;
  if (window.screen.availWidth <= 767) {
    bannerMargin = bannerMarginTop() - subTractMargin;
  } else {
    bannerMargin = deskTopMargin;
  }
  return bannerMargin;
}

const getOfferbannerHeight = () => {
  const offerBannerEle = document.getElementsByClassName('offerBannersec')[0]; //eslint-disable-line
  const offerBannerHeight = (offerBannerEle && offerBannerEle.clientHeight) || 0;
  return offerBannerHeight;
}

const getSearchNavHeight = () => {
  const searchBarEle = document.getElementsByClassName('customNavbar')[0]; //eslint-disable-line
  const searchNavHeight = (searchBarEle && searchBarEle.clientHeight) || 0;
  return searchNavHeight;
}

const getDenomination = (value = 0) => value && value.toLocaleString();

const scrollIntoView = (selector, offset = 0) => {
  window.scroll(0, document.querySelector(selector).offsetTop - offset);
}

// auto filling user info
const getAutoFillDetails = (profileInfo) => {
  const { user = {} } = sf(profileInfo, ['data', 'data']) || {};
  const userInfo = authService.isAuthenticated() ? user : {}
  const {
    first_name = '', email, contact_no, last_name = ''
  } = userInfo;
  const Name = first_name ? `${first_name} ${last_name || ''}` : undefined;
  return {
    Name,
    email,
    contact_no
  }
}

const buttonize = (handlerFn, ...customArgs) => ({
  role: 'button',
  onClick: evt => (customArgs ? handlerFn(...customArgs) : handlerFn(evt)),
  onKeyDown: (evt) => {
    if (evt.keycode === 13) (customArgs ? handlerFn(...customArgs) : handlerFn(evt));
  }
});

const stripTrailingSlash = (text) => {
  const url = text.endsWith('/') ? text.slice(0, -1) : text;
  return url;
};

const getCountryVals = (UR_info = {}) => {
  const { country_code, country, phone_code } = UR_info
  return {
    country_code,
    country,
    phone_code
  }
}

// get random numbers b/w min and max
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// get device type functions

const isMobileDevice = () => {
  const { availWidth } = window.screen;
  return availWidth < 576;
}
const isDesktop = () => {
  const { availWidth } = window.screen;
  return availWidth > 1024;
}

const isAuthenticatedRoute = pathname => authenticatedRoutesArray.includes(pathname)
const isPrivateRoute = pathname => privateRoutesArray.includes(pathname)

// filtering selfpaced courses
const filterInstrLedCourse = (courses = []) => (courses &&
   courses.length > 0 ? courses.filter(course => course.is_visible) : [])

const getFilteredCourses = (filterSlug, courses = []) => (courses && courses.length > 0
  ? getFilteredList(filterSlug, courses) : []);

const getFilteredList = (filterSlug, courses) => {
  switch (filterSlug) {
    case 'instructorLed':
      return courses.filter(course => !course.is_selfpaced && course.is_visible);
    case 'selfPaced':
      return courses.filter(course => course.is_selfpaced && course.is_visible);
    default:
      return courses;
  }
}

const isShowGift = slug => slug !== 'linux-and-unix-shell-scripting-certification-training';
const getLinuxSlug = () => 'linux-and-unix-shell-scripting-certification-training';

export {
  getErrorStatus, getYears, validateDateSelection,
  Message, upload, getOrdinal, zeroPad, emptyFile,
  scrollUp, scrollDown, getCapitalisedName,
  getDisplayName, handleScroll, getBannerMarginTop,
  getOfferbannerHeight, getSearchNavHeight,
  getDenomination, validateFile, bannerMarginTop, scrollIntoView,
  getAutoFillDetails, getBrowserSize, buttonize, handleIntervalFormat,
  stripTrailingSlash, getCountryVals, isMobileDevice,
  isAuthenticatedRoute, isPrivateRoute, isDesktop,
  randomIntFromInterval, filterInstrLedCourse, scrollToSkills,
  isShowGift, getLinuxSlug, getFilteredCourses
}
