import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Modal } from 'reactstrap';

// redux actions import start
import courseDetailsAction from './courseDetailsAction';
import orderSummaryAction from '../orderSummary/orderSummaryAction';
import authService from '../../services/authService';
import batchInfoAction from './batchDetails/batchInfoAction';
import userPrefAction from '../userPrefInfo/Get_UP_Action';
import courseListAction from '../../Actions/courseListAction';
// redux actions import end

// custom components import start
import CourseMenu from './courseMenu/courseMenuContainer';
import Enroll from './enroll/enroll';
import BatchDetails from './batchDetails/batchDetails';
import CurriCulum from './curriculum/curriculum';
import RecommendedCourses from './recommendedCourses/recommendedCourses';
import CoursePreview from './coursePreview/coursePreview';
import Faqs from './faqs/faqs';
import Projects from './projects/projects';
import RoadMap from './roadmap/roadmap';
import Reviews from './reviews/reviews';
import CertificateComp from './certification/certification';
import BlogSec from '../landing/blogsec';
import CareerProspect from './careerProspect/careerProspect';
import NotListedMenuItem from './notListedItem';
import GifContainer from '../common/gifContainer';
import KeyFeatures from './keyFeatures/keyFeatures';
import CourseTakeAways from './courseTakeAways/courseTakeAways';
import KeySkills from './keySkills';
import CourseRegions from './courseRegions/courseRegions';

import sf from '../common/safeTraverse';

// utils import
import {
  scrollDown,
  scrollUp,
  filterInstrLedCourse,
  stripTrailingSlash
} from '../common/utilFunctions/utilFunction';
// import handleDataLayer from '../common/utilFunctions/seoUtil';

import MobileCourseMenu from './mobileCourseMenu/mobileCourseMenu';
import RegestrationSignInSection from '../registration/registration-signIn';
import RegestrationSignUpSection from '../registration/registration-signUp';
import ForgotPassword from '../registration/forgotPassword';
import CourseDetailsProgressBar from './courseDetailsProgressBar'
// custom components import end
import { authenticatedRoutesArray } from '../routes/index';
import globalDataAction from '../../Actions/globalDataAction';
import EventsSchema from './schemas/eventSchema';
// import ReviewSchema from './schemas/reviewSchema';
import {
  breadcrumSchema, localBussSchema,
  reviewSchema, faqSchema
} from './schemas/schemaUtils';

import './courseDetailsContainer.scss';

const CourseDetailsContainer = (props) => {
  const {
    match: { params: { courseSlug } }, history
  } = props || {};
  const { location: { pathname } } = history;

  const [courseDetails, setCourseInfo] = useState(false);
  const [metaInfo, setMetaInfo] = useState(false);
  const [projectObj, setProjectObj] = useState({});
  const [projectPopUp, setProjectPopUp] = useState(false);
  const [scrollTopFlag, setScrollFlag] = useState(0);
  const [modalObj, setmodalObj] = useState({});
  const [refferalCode, setReferalCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { setGlobalDetails } = props || {};
    scroll();
    const { href } = window.location;
    const isAuthenticated = authService.isAuthenticated();

    if (isAuthenticated) {
      history.push(pathname);
    } else if (!isAuthenticated) {
      // open login popup
      if (authenticatedRoutesArray.includes(pathname)) {
        setmodalObj({ currentStatus: 'signIn', isModalOpen: true });
      } else if ((href).includes('?promo=')) {
        // open signup form for referal link
        const refferalCode = (href.split('?promo=')[1]).split('&')[0]; //eslint-disable-line
        setGlobalDetails({ refferalCode }, () => { })
        setmodalObj({
          currentStatus: 'signUp',
          isModalOpen: true
        });
        setReferalCode(refferalCode);
      } else {
        history.push(pathname);
      }
    }
  }, [])

  useEffect(() => {
    // handleDataLayer({
    //   userProject: 'Wiculty',
    //   page: 'course details page',
    //   url: window.location.href,
    //   course: unique_title
    // })
    callCourseAPI();
    fetchBatchDetails();
  }, [courseSlug]);

  const fetchCourseDetails = () => {
    const {
      availablecoursesList,
      getCourseList
    } = props || {};
    let courseSlugList = [];

    if (!availablecoursesList.length) {
      // do course list API call if courselist data not present
      getCourseList({}, (resp = {}) => {
        const { courses = [] } = resp;
        courseSlugList = courses.map(courseItem => courseItem.course_slug);
        callCourseAPI(courseSlugList, props)
      })
    } else {
      courseSlugList = availablecoursesList.map(courseItem => courseItem.course_slug);
      callCourseAPI(courseSlugList, props)
    }
  }

  const callCourseAPI = () => {
    const {
      getCourseDetails
    } = props || {};
    // check whether course is there in the courselist or not
    getCourseDetails({ courseSlug }, (resp) => {
      setIsLoading(false);
      if (resp.status === 206) {
        history.push('/')
      } else {
        const courseInformation = sf(resp, ['data']) || {};
        setCourseInfo(courseInformation);
        const metaData = sf(courseInformation, ['data', 'course', 'meta_info']) || false;
        setMetaInfo(metaData);
      }
    });
    // history.push(pathname);
  }

  const fetchBatchDetails = () => {
    const {
      getBatchInfo, fetchUserPref
    } = props;
    const { courseID, countryID } = batchAPIReqInfo(props)
    if (countryID && courseID) {
      getBatchInfo({ courseID, countryID }, () => {});
    } else if (courseID) {
      fetchUserPref({}, (resp) => {
        const UR_info = sf(resp, ['data', 'data']) || {}
        if (resp.status === 200) {
          const { country } = UR_info
          getBatchInfo({ courseID, countryID: country }, () => {});
        }
      })
    }
  }

  const batchAPIReqInfo = () => {
    const {
      UserPrefInfo, availablecoursesList
    } = props;
    // const course = sf(courseDetails, ['course']) || {};
    const { country } = UserPrefInfo;
    // const { id } = course
    const courseSlugItem = availablecoursesList &&
     availablecoursesList.length > 0 ? availablecoursesList
        .filter(courseItem => courseItem.course_slug === courseSlug) : [];

    const [courseData = {}] = courseSlugItem;
    const { id } = courseData;
    return {
      courseID: id,
      countryID: country
    }
  }
  const getMenuItems = () => {
    const courseData = sf(courseDetails, ['data', 'course']) || {};
    const regions = sf(courseData, ['regions']) || [];
    const { is_selfpaced } = courseData;
    const menuItems = [
      'why-to-enroll?',
      'job-assistance',
      'key-skills',
      'curriculum',
      'projects',
      'roadmap_url',
      'career_prospect_url',
      'certification',
      // 'blogs',
      'faqs',
      'reviews',
      'course-regions',
      'recommended-courses'
      // 'course-preview'
    ];
    let categoriesOrder = is_selfpaced ? menuItems : menuItems.splice(1, 0, 'batchDetails');
    categoriesOrder = menuItems;
    const staticCategories = ['key-skills', 'certification', 'blogs', 'reviews', 'batchDetails', 'recommended-courses', 'job-assistance', 'course-preview'];

    if (regions && regions.length > 0) {
      staticCategories.push('course-regions');
    }
    const noSectionCategories = ['career_prospect_url', 'roadmap_url'];
    const items = [];

    if (Object.keys(courseData).length > 0) {
      categoriesOrder.forEach((category) => {
        if (noSectionCategories.includes(category)) {
          const sections = Object.keys(courseData).filter(section => section === category);
          items.push(...sections)
        } else if (staticCategories.includes(category)) {
          items.push(category)
        } else {
          const sections = Object.keys(courseData.sections).filter(section => section === category);
          items.push(...sections)
        }
      });
    }
    return items;
  }

  const getCertificationInfo = () => {
    const programType = sf(courseDetails, ['data', 'course', 'program_type']) || 'Master';

    return [
      {
        id: 511,
        title: 'Earn Your Degree of Excellence',
        description: `Our Certified ${programType} Program is exclusive in nature of training, which promotes your proficiency in the domain by achieving the particular certificate.`
      },
      {
        id: 512,
        title: `Differentiate Yourself with a ${programType} Certification`,
        description: `Our ${programType} Certification will inculcate Hands-on practical skill sets through learning by doing methodology on each module covered as part of the course`
      },
      {
        id: 513,
        title: 'Share Your Qualified Achievement ',
        description: 'Promote your brilliance on social platforms to boost your career graph. Show this eminence to your friends,co-workers and recruiters! Get head-hunted'
      }
    ]
  }

  const getMenuComponents = (menuItem) => {
    const courseData = sf(courseDetails, ['data', 'course']) || {};
    switch (menuItem) {
      case 'why-to-enroll?':
        return (
          <Enroll
            courseDetails={courseDetails.data || []}
            scrollUp={() => scrollUp()}
            signIn={() => signIn()}
            scrollDown={() => scrollDown()}
            scrollTopFlag={scrollTopFlag}
            slug={courseSlug}
            history={history}
          />
        );
      case 'job-assistance':
        return (
          <CourseTakeAways />
        );
      case 'curriculum':
        return (
          <CurriCulum courseDetails={courseDetails.data || []} />
        );
      case 'key-skills':
        return (
          <KeySkills courseDetails={courseDetails.data || []} />
        );
      case 'projects':
        return (
          <Projects
            projectPopUp={projectPopUp}
            projectObj={projectObj}
            projectPopupClose={() => projectPopupClose()}
            projectPopupShow={project => projectPopupShow(project)}
            courseDetails={courseDetails.data || []}
          />
        );
      case 'faqs':
        return (
          <Faqs />
        );
      case 'batchDetails':
        return (
          <BatchDetails
            courseDetails={courseDetails.data || []}
            signIn={() => signIn()}
            history={history}
          />
        );
      case 'roadmap_url':
        return (
          <RoadMap
            courseDetails={courseDetails.data || []}
          />
        );
      case 'career_prospect_url':
        return (
          <CareerProspect
            courseDetails={courseDetails.data || []}
          />
        );
      case 'certification':
        return (
          <>
            <CertificateComp
              certificationDetails={getCertificationInfo() || []}
              title={(courseData && courseData.certificate_title)
                ? courseData.certificate_title
                : 'Certification'
              }
            />
          </>
        );
      case 'reviews':
        return (
          <Reviews page="course-details" courseId={Number(courseData.id)} />
        );
      case 'recommended-courses':
        return (
          <RecommendedCourses
            courseId={Number(courseData.id)}
            history={history}
            courseData={courseData}
          />
        );
      case 'course-regions':
        return (
          <CourseRegions
            courseData={courseData}
          />
        );
      case 'blogs':
        return (
          <BlogSec />
        );
      default:
        return <NotListedMenuItem menuItem={menuItem} />;
    }
  }

  const handleScroll = (event) => {
    const scrollPosition = window.scrollY > (window.screen.height - 100);
    setScrollFlag(scrollPosition);
  }

  const scroll = () => {
    window.addEventListener('scroll', handleScroll, true);
  }

  const projectPopupShow = (project) =>  { //eslint-disable-line
    if (!project.title) {
      return null
    }
    setProjectPopUp(true);
    setProjectObj(project);
  }

  const projectPopupClose = () => {
    setProjectPopUp(false);
  }

  /* autnetication code section starts here ... */
  const signIn = () => {
    setmodalObj({ currentStatus: 'signIn', isModalOpen: true });
  }

  const signUp = () => {
    setmodalObj({ currentStatus: 'signUp', isModalOpen: true })
  }

  const forgotPassword = () => {
    setmodalObj(prevState => ({ ...prevState, currentStatus: 'forgotPass' }))
  }

  const handleClose = (type) => {
    const { href } = window.location;
    const isAuthenticated = authService.isAuthenticated();

    const IS_FROM_SHARE_LINK = (type === 'signUp' && (href).includes('?promo='))
    if (IS_FROM_SHARE_LINK) {
      fetchCourseDetails()
      history.push(`/${courseSlug}`)
    } else if (!isAuthenticated && authenticatedRoutesArray.includes(pathname)) {
      history.push('/')
    } else {
      history.push(pathname)
    }
    setmodalObj({ currentStatus: '', isModalOpen: false });
    setReferalCode('')
  }

  const handleForgetClose = () => {
    setmodalObj({ currentStatus: '', isModalOpen: false })
  }

  const renderModalBody = () => {
    const { currentStatus } = modalObj;
    switch (currentStatus) {
      case 'signIn':
        return (
          <RegestrationSignInSection
            callSignUp={() => signUp()}
            forgotPassword={() => forgotPassword()}
            handleClose={() => handleClose('signIn')}
          />
        );
      case 'signUp':
        return (
          <RegestrationSignUpSection
            callSignIn={() => signIn()}
            handleClose={() => handleClose('signUp')}
            refferalCode={refferalCode}
          />
        );
      case 'forgotPass':
        return (
          <ForgotPassword
            handleForgetClose={() => handleForgetClose()}
          />
        );
      default:
        return null;
    }
  }
  /* autnetication code section Ends here .... */

  const { isModalOpen } = modalObj;
  const menuItems = getMenuItems();
  const pageUrl = stripTrailingSlash(window.location.href);
  const url = window.location.href;
  const courseData = sf(courseDetails, ['data', 'course']) || {};
  const {
    course_demo_video,
    display_title
  } = courseData;
  return (
    <React.Fragment>
      <Helmet>
        <title>{metaInfo.meta_title}</title>
        <meta charSet="utf-8" />
        <link rel="canonical" href={pageUrl} />
        <meta name="description" content={metaInfo.meta_description} />
        <meta name="keyword" content={metaInfo.meta_keyword} />
        <meta name="twitter:url" content={metaInfo.twitter_url} />
        <meta name="twitter:site" content={metaInfo.twitter_site} />
        <meta name="twitter:title" content={metaInfo.twitter_title} />
        <meta name="twitter:description" content={metaInfo.twitter_description} />
        <meta name="twitter:image" content={metaInfo.twitter_image} />
        <meta property="og:locale" content="en-US" />
        <meta property="og:site_name" content={metaInfo.og_site_name} />
        <meta property="og:url" content={metaInfo.og_url} />
        <meta property="og:title" content={metaInfo.og_title} />
        <meta property="og:description" content={metaInfo.og_description} />
        <meta property="og:image" content={metaInfo.og_image} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(breadcrumSchema(display_title, url))}</script>
        <script type="application/ld+json">{JSON.stringify(localBussSchema(url))}</script>
        <script type="application/ld+json">{JSON.stringify(reviewSchema(url))}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema(url))}</script>
      </Helmet>
      <Modal
        isOpen={isModalOpen}
        toggle="true"
        className="modal-dialog-centered"
        data-backdrop="static"
      >
        {renderModalBody()}
      </Modal>
      <div className="course-details-container">
        {!isLoading && (
          <Row>
            <CourseMenu
              courseDetails={courseDetails.data || []}
              menuItems={menuItems}
              isLoading={isLoading}
              signIn={() => signIn()}
              history={history}
            />
            <MobileCourseMenu
              menuItems={menuItems}
            />
          </Row>
        )}
        <KeyFeatures courseDetails={courseDetails.data || []} />
        {!isLoading ? menuItems.map(menuItem => (
          getMenuComponents(menuItem) &&
            (
              <div className="px-0">
                <Row className="">
                  {getMenuComponents(menuItem)}
                </Row>
              </div>
            )
        )) : (
          <div className="loading-gif-container">
            <GifContainer />
            <GifContainer />
            <GifContainer />
            <GifContainer />
          </div>
        )}
        {course_demo_video && <CoursePreview course_demo_video={course_demo_video || {}} />}
      </div>
      <CourseDetailsProgressBar />
      <EventsSchema />
      {/* <ReviewSchema /> */}
      {/* <FAQSchema /> */}
    </React.Fragment>
  )
}
export const mapDispatchToProps = dispatch => ({
  getCourseDetails: (payload, cb) => {
    dispatch(courseDetailsAction(payload, cb));
  },
  getOrderDetails: (payload, cb) => {
    dispatch(orderSummaryAction(payload, cb));
  },
  setGlobalDetails: (payload, cb) => {
    dispatch(globalDataAction(payload, cb))
  },
  getBatchInfo: (payload, cb) => {
    dispatch(batchInfoAction(payload, cb));
  },
  fetchUserPref: (payload, cb) => {
    dispatch(userPrefAction(payload, cb));
  },
  getCourseList: (payload, cb) => {
    dispatch(courseListAction(payload, cb));
  }
});
export const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo,
  availablecoursesList: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || [])
});

CourseDetailsContainer.propTypes = {
  getBatchInfo: PropTypes.func.isRequired,
  fetchUserPref: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  availablecoursesList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailsContainer);
