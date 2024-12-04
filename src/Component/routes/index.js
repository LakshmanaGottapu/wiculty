import React, { lazy } from 'react';
import {
  Route
} from 'react-router-dom';
// Landing Page
import BannerSection from '../landing/landing';
import Search from '../search/search';
import NotFound from '../common/404';
import publicReferal from '../reffer/publicReferal';
// lazy load
const Allcourses = lazy(() => import('../allcourses/allcourses'));
const PaymentSucess = lazy(() => import('../payment/payment_success'));
const PaymentFailure = lazy(() => import('../payment/payment_fail'));
const RazorPayComp = lazy(() => import('../payment/razorpay'));
const orderSummary = lazy(() => import('../orderSummary/orderSummary'));
const ProfileInfo = lazy(() => import('../profile/profileContainer'));
// const ProfileInfo = lazy(() => import('../newprofile/profile'));
const MycourseContainer = lazy(() => import('../mycourses/mycourseContainer'));
const MybatchesContainer = lazy(() => import('../mybatches/myBatchesContainer'));
const PrivacyPolicy = lazy(() => import('../static/privacyPolicy'));
const AboutUs = lazy(() => import('../static/aboutUs/aboutUs'));
const TermsAndConditions = lazy(() => import('../static/terms'));
const ContactUs = lazy(() => import('../static/contactUs'));
const OurTeam = lazy(() => import('../static/ourTeam'));
const Affiliate = lazy(() => import('../static/affiliate/affiliate'));
const Career = lazy(() => import('../static/career/career'));
const Instructor = lazy(() => import('../instructor/instructor'));
const CorporateTrainning = lazy(() => import('../B2B/corporateTraining'));
const Homepage = lazy(() => import('../subscripition/homepage'));
const Jobfirst = lazy(() => import('../subscripition/jobfirst'));
const LMSContainer = lazy(() => import('../LMS/LMSContainer'));
const Orders = lazy(() => import('../myorders/myorders'));
const myReferal = lazy(() => import('../reffer/myReferal'));
const AllWebinars = lazy(() => import('../Events/webinarsContainer'));
const EventDetails = lazy(() => import('../Events/eventDetails/eventContainer'));
const TechPreferenceCategory = lazy(() => import('../profile/techPreference/techPreferenceCategory'));
const MyTechPrefs = lazy(() => import('../profile/techPreference/myTechPrefs'));

const commonRoutes = [
  {
    path: '/',
    component: BannerSection
  },
  {
    path: '/all-courses',
    component: Allcourses
  },
  {
    path: '/search/:query',
    component: Search
  },
  {
    path: '/affiliate',
    component: Affiliate
  },
  {
    path: '/instructor',
    component: Instructor
  },
  {
    path: '/corporate-training',
    component: CorporateTrainning
  },
  {
    path: '/careers',
    component: Career
  },
  {
    path: '/our-team',
    component: OurTeam
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: '/about-us',
    component: AboutUs
  },
  {
    path: '/terms-conditions',
    component: TermsAndConditions
  },
  {
    path: '/contact-us',
    component: ContactUs
  },
  {
    path: '/refer-earn',
    component: publicReferal
  },
  {
    path: '/my-referal',
    component: myReferal
  },
  {
    path: '/order-summary',
    component: orderSummary
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '/events',
    component: AllWebinars
  },
  {
    path: '/homepage',
    component: Homepage
  },
  {
    path: '/jobfirst',
    component: Jobfirst
  },
  {
    path: '/event/:eventSlug',
    component: EventDetails
  }
];

const authenticatedRoutes = [
  {
    path: '/my-batches',
    component: MybatchesContainer
  },
  {
    path: '/profile',
    component: ProfileInfo
  },
  {
    path: '/my-orders',
    component: Orders
  },
  {
    path: '/my-courses',
    component: MycourseContainer
  },
  {
    path: '/class-room/:slug',
    component: LMSContainer
  },
  {
    path: '/topic-categories',
    component: TechPreferenceCategory
  },
  {
    path: '/my-topic-preferences',
    component: MyTechPrefs
  }
]

const privateRoutes = [
  {
    path: '/payment-success',
    component: PaymentSucess
  },
  {
    path: '/payment-fail',
    component: PaymentFailure
  },
  {
    path: '/razor-pay',
    component: RazorPayComp
  }
];
const noFooterRoutes = ['/class-room/'];

const authenticatedRoutesArray = authenticatedRoutes.map(routeObj => routeObj.path);
const privateRoutesArray = privateRoutes.map(routeObj => routeObj.path);

const getRoutes = (isAuthenticated, privateRoute) => {
  let routes = [];
  if (isAuthenticated && privateRoute) {
    routes = [
      ...privateRoutes,
      ...authenticatedRoutes,
      ...commonRoutes
    ];
  } else if (isAuthenticated) {
    routes = [
      ...authenticatedRoutes,
      ...commonRoutes
    ];
  } else {
    routes = commonRoutes;
  }
  return routes.map(route => (
    <Route exact path={route.path} component={route.component} />
  ))
}

export {
  getRoutes, authenticatedRoutesArray,
  noFooterRoutes, privateRoutesArray
};
