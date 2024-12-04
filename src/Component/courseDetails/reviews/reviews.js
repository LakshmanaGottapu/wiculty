import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import ReviewCard from '../../common/reviewSection/reviewCard';
import VideoReviews from '../../common/reviewSection/videoReviews';

import './reviews.scss';

const Reviews = ({ page, courseId }) => (
  <Container className="reviews-menu-container mt-4">
    <Row className="review-text">
      <Col className="reviewsHeader" lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
        <h2 className="text-center">
          {'Wiculty Testimonials |  Who else can proclaim us better than our learners'}
        </h2>
      </Col>
    </Row>
    <Row>
      <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
        <div className="mt-4">
          <VideoReviews page={page} courseId={courseId} />
          <ReviewCard page={page} courseId={courseId} />
        </div>
      </Col>
    </Row>
  </Container>
);

Reviews.defaultProps = {
  courseId: 0
}

Reviews.propTypes = {
  page: PropTypes.string.isRequired,
  courseId: PropTypes.bool
};
export default Reviews;
