import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container, Row, Col, Modal
} from 'reactstrap';
import CourseCards from '../card/coursecard';
import GetStarted from '../registration/getStarted';
import sf from '../common/safeTraverse';

class FreeCourseSec extends Component {
  constructor (props) {
    super(props);
    this.register = this.register.bind(this);
    this.state = {
      modal: false
    };
  }

  getStarted () {
    this.setState({
      modal: true
    });
  }

  register () {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleClose () {
    this.setState({
      modal: false
    });
  }

  render () {
    const {
      modal
    } = this.state;
    const {
      courses
    } = this.props;
    const courseData = sf(courses, ['data']) || [];
    const instrctotLedCourses = courseData.length > 0 ? courseData
      .filter(course => !course.is_selfpaced && course.is_visible) : [];
    return (
      <React.Fragment>
        {((instrctotLedCourses || []).length) > 0 ? (
          <Container fluid className="justify-content-center">
            <Row className="freeCourseSecAlgn justify-content-center">
              <Col lg="10" xl="10" className="">
                <React.Fragment>
                  {/* <h1>
                    {'An Exclusive DevOps & Cloud-Centered Virtual Training Hub'}
                  </h1>
                  <h2 className="orange-text wiculty-blue">
                    {' Wiculty | Learning Replenished '}
                     <button
                     className="btn btn-sm btn-warning"
                    onClick={() => this.getStarted()}>Get Started</button>
                  </h2>
                  <h4 className="mt-20 font-weight-normal">Lifetime Access to Study Materials</h4>
                  <h4 className="mb-20 font-weight-normal">Professional SMEs</h4> */}
                </React.Fragment>
                <>
                  <h1 className="text-center wiculty-blue mb-4 mt-5">
                    <span className="self_paced_title p-2">
                      {'Instructor-Led Live Training'}
                    </span>
                  </h1>
                </>
                <Row className="justifyCenter">
                  <React.Fragment>
                    {
                      instrctotLedCourses.map((item, index) => (
                        <CourseCards
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          title={item.course_title}
                          is_selfpaced={item.is_selfpaced}
                          course_image={item.course_image}
                          short_description={item.short_description}
                          course_slug={item.course_slug}
                          unique_title={item.unique_title}
                          isFree={true} // eslint-disable-line
                          courseHighlighter={item.course_highlighter}
                          courseInfo={item}
                          isSharable="false"
                          {...this.props}
                        />
                      ))
                    }
                  </React.Fragment>
                </Row>
              </Col>
            </Row>
          </Container>
        ) : ''}
        <Modal
          isOpen={modal}
          toggle={this.register}
          className="modal-dialog-centered"
          data-backdrop="static"
        >
          <GetStarted
            onRegister={this.register}
            callSignIn={() => this.signIn()}
            handleClose={() => this.handleClose()}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.homeCourses
});

FreeCourseSec.propTypes = {
  courses: PropTypes.isRequired
};

export default connect(mapStateToProps, null)(FreeCourseSec);
