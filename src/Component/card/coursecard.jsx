import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom'

import SocialShare from '../common/socialShare/socialShare';

class CourseCards extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: props.title,
      course_image: props.course_image,
      short_description: props.short_description, //eslint-disable-line
      unique_title: props.unique_title, //eslint-disable-line
      isFree: props.isFree, //eslint-disable-line
      isSelfpaced: props.is_selfpaced, //eslint-disable-line
      courseHighlighter: props.courseHighlighter //eslint-disable-line
    };
  }

  handleCourseRouting () {
    const { history, course_slug, reloadPage } = this.props;
    history.push(`/${course_slug}`);
    if (reloadPage) {
      window.location.reload();
    }
  }

  render () {
    const {
      title,  //eslint-disable-line
      course_image
    } = this.state;

    const {
      isSharable,
      shareUrl,
      promoCode,
      course_slug,
      courseInfo = {}
    } = this.props;

    const {
      course_duration,
      project_duration,
      course_color = '#122865',
      trending_topic = false
    } = courseInfo;

    const sectionStyle = {
      backgroundImage: `url(${course_image})`
    }

    return (
      <React.Fragment>
        <Col xl="3" lg="3" md="6" sm="6" className="homeCard mt-2 mb-2">
          <div className="horizantalCourseCard">
            <Card className="horizantalCourseCard outer-div shadow-lg">
              <CardBody className="" onClick={() => this.handleCourseRouting()}>
                <p style={sectionStyle} className="bg_height" />
                <p className="courseTitle">{title}</p>
                <div>
                  <p className="courseDuration">
                    {`Duration : ${course_duration}+ hrs`}
                    <br />
                    {`Project : ${project_duration} hrs`}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
          {isSharable === 'true' ? (
            <SocialShare
              shareUrl={shareUrl}
              quote={`Promocode : ${promoCode} Course: ${title}`}
            />
          ) : (
            trending_topic && (
              <Row className="mb-4 d-none">
                <Col className="p-0">
                  <Link to={course_slug}>
                    <div className="card-trend" style={{ backgroundColor: course_color }}>
                      <small>With Trending</small>
                      <br />
                      <div className="animated infinite pulse delay-4s font-weight-bold" style={{ fontSize: '18px' }}>
                        {trending_topic}
                      </div>
                    </div>
                  </Link>
                </Col>
              </Row>
            )
          )}
        </Col>

      </React.Fragment>
    );
  }
}

CourseCards.propTypes = {
  title: PropTypes.string.isRequired,
  course_image: PropTypes.string.isRequired,
  course_slug: PropTypes.string.isRequired,
  unique_title: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  shareUrl: PropTypes.string,
  promoCode: PropTypes.string,
  isSharable: PropTypes.string.isRequired,
  courseInfo: PropTypes.shape({}).isRequired,
  reloadPage: PropTypes.bool
};

CourseCards.defaultProps = {
  promoCode: undefined,
  shareUrl: undefined,
  history: {},
  reloadPage: false
}

export default CourseCards;
