import React, { useState } from 'react';
import {
  Row, Col
} from 'reactstrap';

import PropTypes from 'prop-types';
import Slider from 'react-slick';
import parse from 'html-react-parser';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sf from '../../common/safeTraverse';
import './projects.scss';

const Project = ({
  projectObj, courseDetails
}) => {
  const [showMore, setShowMore] = useState({});
  const { sections = {}, course_icon } = courseDetails.course || {};
  const projects = sf(sections, ['projects', 'section_details']) || [];
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

  function getcommentsData (commentsText, flag) {
    return (flag === 'less' ? `${commentsText.substr(0, 250)} ...` : `${commentsText} ...`)
  }

  const commentsToggle = (id) => {
    setShowMore(prevState => ({ ...prevState, [id]: !showMore[id] }))
  }
  return (
    <div className="container project-container project-menu-container mt-5">
      <Row>
        <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
          <h2>
            {'Project  |  Witness the Mastery Out of Our Projects'}
          </h2>
          <Slider {...sliderSettings}>
            {projects.map(project => (
              <div className="project-item card px-0 d-flex">
                <div className="card-body px-0">
                  <div className="px-4">
                    <h5 className="mb-4">
                      {project.title}
                    </h5>
                    {showMore[project.id] ? (
                      <p className="more project-desc mb-0">
                        {parse(getcommentsData(project.description, 'more'))}
                        <button type="button" className="btn btn-link see-more p-0 mx-1" onClick={() => commentsToggle(project.id)} tabIndex={0} onKeyPress={() => {}}>
                          {'See less'}
                        </button>
                      </p>
                    ) : (
                      <p className="less project-desc mb-0">
                        {parse(getcommentsData(project.description, 'less'))}
                        <button type="button" className="btn btn-link see-more p-0 mx-1" onClick={() => commentsToggle(project.id)} tabIndex={0} onKeyPress={() => {}}>
                          {'See more'}
                        </button>
                      </p>
                    ) }
                  </div>
                  <div className="project-logo bg-light px-3 py-2 mt-2 mb-3">
                    <img src={course_icon} alt="project icon" />
                  </div>
                </div>
              </div>

            ))}
          </Slider>
        </Col>
      </Row>
    </div>
  )
};

Project.propTypes = {
  projectObj: PropTypes.isRequired,
  courseDetails: PropTypes.isRequired
};

export default Project;
