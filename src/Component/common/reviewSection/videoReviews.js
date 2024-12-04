import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay
} from '@fortawesome/free-solid-svg-icons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import reviewDetailsAction from '../../../Actions/reviewDetailsAction';
import { buttonize } from '../utilFunctions/utilFunction';
import AssetModal from '../modals/assetModal';
import sf from '../safeTraverse';

const VideoReviews = ({
  page,
  courseId,
  getReviewDetails
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoURL, setVideoURL] = useState('https://www.youtube.com/embed/HvOoxjQBMJE');
  const [reviews, setReviews] = useState([]);
  function onModalClose () {
    setIsOpen(false);
  }
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  useEffect(() => {
    getReviewDetails({ page, courseId }, (resp) => {
      const data = sf(resp, ['data', 'data', 'reviews']) || [];
      const videoReviews = data.filter(o => o.review_type === 2);
      setReviews(videoReviews);
    })
  }, []);

  function toggleModal (url) {
    setVideoURL(url);
    setIsOpen(true);
  }
  return (
    reviews.length > 0 ? (
      <Row>
        <Col xs="12" className="review-card-container">
          <Slider {...sliderSettings}>
            {reviews.map(({ review_thumbnail, review_video_url }) => (
              <div className="video-review-card">
                <div className="mb-4 course-video">
                  <img src={review_thumbnail} className="img img-fluid c-p" alt="Review video" {...buttonize(() => { toggleModal(review_video_url) })} />
                  <span className="play-button" {...buttonize(() => { toggleModal(review_video_url) })}>
                    <FontAwesomeIcon icon={faPlay} />
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </Col>
        <AssetModal
          type="video"
          src={videoURL}
          showModal={isOpen}
          onModalClose={onModalClose}
        />
      </Row>
    ) : ''
  );
};

VideoReviews.propTypes = {
  page: PropTypes.number.isRequired,
  courseId: PropTypes.string.isRequired,
  homeContent: PropTypes.isRequired,
  getReviewDetails: PropTypes.isRequired
}

const mapDispatchToProps = dispatch => ({
  getReviewDetails: (payload, cb) => {
    dispatch(reviewDetailsAction(payload, cb));
  }
});

export default connect(null, mapDispatchToProps)(VideoReviews);
