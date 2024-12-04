import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
// import TrendingTopics from '../../landing/trendingTopics/trendingTopics';
// import BOGO from '../../common/BOGO/BOGO';
// import BatchDetails from '../batchDetails/batchDetails';
// redux actions import start
import TrendingTopicAction from '../../landing/trendingTopics/trendingTopicAction';
// redux actions import start

import sf from '../../common/safeTraverse';
import './enroll.scss';
import SpecialOfferCard from '../../CRMLeadForms/SpecialOfferCard';

const Enroll = ({
  courseDetails, scrollUp, getWebinars, history, signIn, UserPrefInfo
}) => {
  const [isSpecialOffer] = useState(false);

  const {
    sections = {},
    course_highlighter,
    unique_title
    // id
  } = courseDetails.course || {};

  const highlights = [];
  for (let i = 1; i <= 10; i += 1) {
    if (course_highlighter[`highlighter_${i}`]) {
      highlights.push(course_highlighter[`highlighter_${i}`]);
    }
  }

  // dividing array into equal chunks of 5 items
  const highlightsChunks = [];

  const chunk = 5;
  const size = highlights.length;
  for (let i = 0; i < size; i += chunk) {
    const temparray = highlights.slice(i, i + chunk);
    highlightsChunks.push(temparray);
  }

  const enrollData = sf(sections, ['why-to-enroll?', 'section_details']) || [];
  const [enrollInfo = {}] = enrollData;
  const { title = '', description = '' } = enrollInfo || {};
  // const { time_zone_label = 'IST' } = UserPrefInfo;
  return (
    <div className="container-fluid bg-white py-3">
      <div className="enroll-menu-container container">
        <Row>
          <Col xl={{ size: 8 }} lg={{ size: 7 }} md={{ size: 12 }} xs={{ size: 12 }}>
            <h2>
              {title}
            </h2>
            <div>
              {<div className="mgt20 enroll-desc">{parse(description)}</div>}
            </div>
          </Col>
          <Col xl={{ size: 3 }} lg={{ size: 5 }} md={{ size: 8 }} xs={{ size: 12 }} className="enroll-img d-none">
            {/* <BOGO
            course_title={course_title}
            unique_title={unique_title}
          /> */}
            {/* <BatchDetails
            courseDetails={courseDetails}
            signIn={() => signIn()}
            history={history}
            isFromEnroll
          /> */}
            {isSpecialOffer && <SpecialOfferCard course={unique_title} />}
            {/* Temperaroly commented the webinars code */}
            {/* {topics.length > 0 && (
            <Row className="cd-uw">
              <Col lg={{ size: 12 }} className="mb-4 mt-4">
                <h2>
                    Upcoming Webinars
                </h2>
              </Col>
              <TrendingTopics
                mobileView="true"
                courseID={id}
                time_zone_label={time_zone_label}
              />
            </Row>
          )} */}

          </Col>
        </Row>
      </div>
    </div>

  )
};

Enroll.propTypes = {
  courseDetails: PropTypes.isRequired,
  scrollUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  trendingTopics: PropTypes.shape({}).isRequired,
  getWebinars: PropTypes.func.isRequired,
  history: PropTypes.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

const mapDispatchToProps = dispatch => ({
  getWebinars: (payload, cb) => {
    dispatch(TrendingTopicAction(payload, cb))
  }
})

const mapStateToProps = state => ({
  trendingTopics: [],
  isLoading: state.courseDetails.isLoading,
  UserPrefInfo: state.UserPrefInfo
});

export default connect(mapStateToProps, mapDispatchToProps)(Enroll);
