import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col
} from 'reactstrap';

// utils common functions
import Accordian from '../../common/accordians/accordian';
import sf from '../../common/safeTraverse';

// CRM leads
import CODOForm from '../../CRMLeadForms/CODOForm';
import CurrmDownload from './currmDownload';
import CareerCounseling from '../careerCounseling/careerCounseling';
import KeyStats from '../keyStats/keyStats';

import './curriculum.scss';

const CurriCulum = ({ courseDetails }) => {
  const {
    sections = {}, unique_title, course_curriculum, course_slug
  } = courseDetails.course || {};
  const sectionInfo = sf(sections, ['curriculum', 'section_details']) || [];
  return (
    <div className="curriculum-menu-container w-100 container">
      {/* <Row>
        <Col className="mb-4 mt-4 p-0">
          <h2>
            {'Course Takeaways'}
          </h2>
          <div className="curriculumSection_overview">
            <h2>
              Prerequisites
            </h2>
            <p>
              Analytical skills, Problem solving skills, Dedication & Commitement
              to learn are the prerequisites for this program.
            </p>
          </div>
        </Col>
      </Row> */}
      <CurrmDownload
        course_curriculum={course_curriculum}
        unique_title={unique_title}
        course_slug={course_slug}
      />
      <Row className="curriculum-view mt-2">
        <Col className="curriculumSection_chapters mb-4" lg={{ size: 8 }} md={{ size: 12 }} xs={{ size: 12 }}>
          <div className="mr-0">
            {sectionInfo && sectionInfo.length > 0 ? (
              <Accordian
                tabArray={sectionInfo}
                openFirst
              />
            ) : ''}
          </div>
        </Col>
        <Col className="py-0" lg={{ size: 4 }} md={{ size: 12 }} xs={{ size: 12 }}>
          <KeyStats courseDetails={courseDetails} />
          <CareerCounseling />
        </Col>
      </Row>
      <CODOForm unique_title={unique_title} />

    </div>
  )
};

CurriCulum.propTypes = {
  courseDetails: PropTypes.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired

};

export default CurriCulum;
