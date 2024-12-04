import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Accordion from '../../common/accordians/accordian';
import sf from '../../common/safeTraverse';
import TalkToUs from '../../common/talkToUs'

import './faqs.scss';

const Faqs = ({ courseDetails }) => {
  const faqData = sf(courseDetails, ['data', 'data', 'course', 'sections', 'faqs', 'section_details']) || [];
  return (
    <div className="container-fluid bg-white p-4 mt-4">
      <div className="faqs-menu-container container">
        <h2 className="faqs-title mb-4 py-2">
          {'FAQs '}
        </h2>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-8">
            <Accordion tabArray={faqData} openFirst />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <TalkToUs />
          </div>
        </div>
      </div>
    </div>

  )
};

Faqs.propTypes = {
  courseDetails: PropTypes.isRequired

};

export const mapStateToProps = state => ({
  courseDetails: state.courseDetails
});

export default connect(mapStateToProps, null)(Faqs);
