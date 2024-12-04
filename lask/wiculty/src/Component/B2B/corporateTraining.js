import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagManager from 'react-gtm-module';
import { Row, Col, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CourseCards from '../card/coursecard';
import SecondSecMarketingTag from '../marketingtag/marketingtag';
import CharmingPartners from '../common/charmingPartners/charmingPartners';
import { IMAGES } from '../locales/images';
import { getBannerMarginTop, filterInstrLedCourse } from '../common/utilFunctions/utilFunction';
import SeoContentComp from '../common/seoContentComp';
import B2BForm from './b2bForm';
import './b2b.scss';
import {
  acuraData,
  QAArray,
  corporateTabContent,
  corporateTraining
} from '../staticJson';
import sf from '../common/safeTraverse';

const tagManagerArgs = {
  dataLayer: {
    userProject: 'Wiculty',
    page: 'Corporate Training',
    url: window.location.href
  },
  dataLayerName: 'PageDataLayer'
};

class CorporateTraining extends Component {
  constructor (props) {
    super(props);
    this.state = {
      courses: []
    }
    window.scroll(0, 0);
    TagManager.dataLayer(tagManagerArgs);
  }

  static getDerivedStateFromProps (props, state) {
    const { homeCourses } = props || {}
    const courses = homeCourses;
    if (courses && courses.length > 0) {
      return {
        courses
      }
    }
    return null
  }

  render () {
    const {
      courses = []
    } = this.state;
    return (
      <React.Fragment>
        <SeoContentComp seoKey="corporate-training" />
        <div id="b2b-conatiner" style={{ marginTop: getBannerMarginTop(0, 100) }}>
          <div className="upper-section flex-vertical-center" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.CORPORATE_BANNER})` }}>
            <h1 className="wicultythemeColor text-center d-none">
              {'Wiculty  Corporate Training'}
            </h1>
            <h2 className="text-center d-none">
              {'Unlock your team capabilities through upskilling'}
            </h2>
          </div>
          <Container>
            <Row className="section-gap">
              <Col sm="12">
                <h2 className="text-center">
                  {'Just happily sink into our training effectiveness before on-boarding!'}
                </h2>
              </Col>
              <Col sm="12" className="mt-4">
                <Row>
                  <Col sm="6" className="flex-vertical-center">
                    <Row>
                      {QAArray.map(QaItem => (
                        <Col sm="12">
                          <h5 className="font-italic bold">
                            {QaItem.Thought}
                          </h5>
                          <p>
                            {QaItem.Question}
                          </p>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col sm="6">
                    <B2BForm />
                  </Col>
                </Row>
              </Col>
            </Row>
            <div id="middle-section" className="section-gap">
              <Row className="b2b-acura mt-4 text-center">
                <Col className="b2b-acura-info-container">
                  <Row>
                    <Col>
                      <h2>
                        {'Wiculty Acura'}
                      </h2>
                      <h5 className="font-weight-normal">
                        {'When Specificity Meets the Notion of Learning. Our features to equip your learning expedition'}
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    {acuraData.map(({
                      icon, alt, title, desc
                    }) => (
                      <Col md="4" sm="6" xs="12" className="feature-section hover-card">
                        <div className="worldmap-info-tab">
                          <div className="feature-icon">
                            <FontAwesomeIcon icon={icon} alt={alt} />
                          </div>
                          <div className="feature-title">
                            <h4>
                              {title}
                            </h4>
                          </div>
                          <div className="feature-desc mt-2">
                            <p>
                              {desc}
                            </p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
          <Container fluid className="p-0 section-gap">
            <Row>
              <Col className="text-center">
                <h2>
                  {'Wiculty Training Effectiveness'}
                </h2>
                <h5 className="font-weight-normal">
                  {'Edge up your overall results through our enhancement.'}
                </h5>
              </Col>
            </Row>
            <Row className="matrix-section content-gap">
              {corporateTraining.map(item => (
                <Col>
                  <div className="fa-icon-size">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <h5 className="font-weight-normal">
                    {item.title}
                  </h5>
                </Col>
              ))}
            </Row>
          </Container>
          <Container>
            <Row className="b2b-tabs section-gap">
              <Col className="text-center">
                <h2>
                  {'Wiculty ProPhase'}
                </h2>
                <h5 className="font-weight-normal">
                  {'Breaking the Blockers and Bridging the Gaps in Corporate Training'}
                </h5>
                <SecondSecMarketingTag tabContent={corporateTabContent} />
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="referText section-gap">
              <Col>
                <h2 className="text-center">
                  {'Our Courses'}
                </h2>
              </Col>
              {((courses).length) > 0 ? (
                <Container fluid className="freeCourseSec">
                  <Row className="freeCourseSecAlgn">
                    <Col lg="12" xl="12" className="freeCourseSecCardAlgn">
                      <Row className="justifyCenter refer-course-cards">
                        <React.Fragment>
                          {courses.map(item => (
                            <CourseCards
                              title={item.course_title}
                              is_selfpaced={item.is_selfpaced}
                              course_image={item.course_image}
                              short_description={item.short_description}
                              course_slug={item.course_slug}
                              unique_title={item.unique_title}
                              isFree
                              courseHighlighter={item.course_highlighter}
                              courseInfo={item}
                              isSharable="false"
                              {...this.props}
                            />
))} {/*eslint-disable-line */}
                        </React.Fragment>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              ) : ''}
            </Row>
            <Row className="section-gap">
              <Col>
                <CharmingPartners />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  homeCourses: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || [])
});

export default connect(mapStateToProps, null)(CorporateTraining);
