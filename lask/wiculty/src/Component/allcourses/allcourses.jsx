import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import TagManager from 'react-gtm-module';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Container, Row, Col
} from 'reactstrap';
import CoursesListing from './coursesListing';
import allCourse from '../common/navbar/allCoursesAction';
// import MarketingAllCources from '../marketingtag/marketingAllCources';
import { filterInstrLedCourse } from '../common/utilFunctions/utilFunction';

class Allcourses extends Component {
  constructor (props) {
    super(props);
    this.state = {
      courses: []
    };
    this.response = [];
    window.scroll(0, 0);
  }

  static getDerivedStateFromProps (props, state) {
    const { allCourses } = props || {}

    if (allCourses.data) {
      return {
        courses: allCourses.data.data.courses
      }
    }
    return null
  }

  componentDidMount () {
    const { getAllCourses } = this.props;
    getAllCourses('all-courses', (data) => { })
  }

  render () {
    let {
      courses = []
    } = this.state;

    courses = filterInstrLedCourse(courses);

    const tagManagerArgs = {
      dataLayer: {
        userProject: 'Wiculty',
        page: 'All Courses',
        url: window.location.href
      },
      dataLayerName: 'PageDataLayer'
    }

    TagManager.dataLayer(tagManagerArgs);

    return (
      <React.Fragment>
        <Helmet>
          <title>Wiculty - All Courses</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Wiculty - All Courses" />
        </Helmet>
        <Container className="allCourses" style={{ marginTop: '50px' }}>
          <React.Fragment>
            <h1 className="mb-4 text-center">
              All Courses
            </h1>
            {courses.length > 0 ? courses.map(item => (
              <CoursesListing
                image={item.course_image}
                key={item.id}
                displayTitle={item.display_title}
                courseTitle={item.course_title}
                rating={item.rating}
                description={item.description}
                search_text={item.search_text}
                slug={item.course_slug}
                isSelfpaced={item.is_selfpaced}
                no_of_learners={item.no_of_learners}
                no_of_reviews={item.no_of_reviews || 0}
                key_skills={item.key_skills || []}
                trending_topic={item.trending_topic}
                free_video_hrs={item.free_videos_hrs || 0}
                course_duration={item.course_duration}
                project_duration={item.project_duration}
                course_slug={item.course_slug}
                {...this.props}
              />
            )) : (
              <Row>
                <Col lg="11" className="noResultsBlock">
                  <h3>No Results Found</h3>
                </Col>
              </Row>
            )
            }
          </React.Fragment>
        </Container>
        {/* <MarketingAllCources /> */}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAllCourses: (payload, cb) => {
    dispatch(allCourse(payload, cb));
  }
});

export const mapStateToProps = state => ({
  allCourses: state.allCourses
});

Allcourses.propTypes = {
  getAllCourses: PropTypes.func.isRequired,
  history: PropTypes.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Allcourses));
