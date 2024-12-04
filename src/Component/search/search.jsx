import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import TagManager from 'react-gtm-module';
import { withRouter } from 'react-router-dom';
import {
  Container
} from 'reactstrap';
import CoursesListing from '../allcourses/coursesListing';
import sf from '../common/safeTraverse';
import searchAction from '../common/navbar/searchAction';
import allCourse from '../common/navbar/allCoursesAction';
import { filterInstrLedCourse } from '../common/utilFunctions/utilFunction';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      courses: []
    };
    this.response = [];
    window.scroll(0, 0);
  }

  static getDerivedStateFromProps (props, state) {
    const { searchCourses, allCourses } = props || {}
    let courses = sf(searchCourses, ['data', 'data', 'courses']) || [];
    if (!courses.length) {
      courses = sf(allCourses, ['data', 'data', 'courses']) || [];
    }

    if (courses.length > 0) {
      return {
        courses
      }
    }
    return null
  }

  componentDidMount () {
    const {
      match: { params: { query } }, getSearchResults
    } = this.props || {};
    getSearchResults(query, () => {})
  }

  render () {
    let {
      courses
    } = this.state;
    const {
      match: { params: { query } }
    } = this.props || {};
    courses = filterInstrLedCourse(courses);

    const tagManagerArgs = {
      dataLayer: {
        userProject: 'Wiculty',
        page: 'Search',
        url: window.location.href
      },
      dataLayerName: 'PageDataLayer'
    }

    TagManager.dataLayer(tagManagerArgs);
    return (
      <React.Fragment>
        <Helmet>
          <title>Wiculty - Search</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Wiculty - Search" />
        </Helmet>
        <Container className="allCourses" style={{ marginTop: '50px' }}>
          <h3 className="mb-4">
            {`Search Results for "${query}"` }
          </h3>
          {
            courses.map(item => (
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
                {...this.props}
              />
            ))
          }
        </Container>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getSearchResults: (payload, cb) => {
    dispatch(searchAction(payload, cb));
  },
  getAllCourses: (payload, cb) => {
    dispatch(allCourse(payload, cb));
  }
});
export const mapStateToProps = state => ({
  allCourses: state.allCourses,
  searchCourses: state.searchCourses
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
