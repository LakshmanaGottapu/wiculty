import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { JSONLD, Generic } from 'react-structured-data';
import TagManager from 'react-gtm-module';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import BannerCarousel from '../common/homeBannerCarousel';
import FreeCourseSec from './freecoursesec';
import SelfPacedCourses from '../selfPacedCourses/selfPacedCourses'
import TrendingTopics from './trendingTopics/trendingTopics';
import NewLaunchSec from './newlaunch';
import NurtureComp from './nurtureComp/nurtureComp';
import BlogSec from './blogsec';
import CorprateSec from './corpratesec';
import CharmingPartners from '../common/charmingPartners/charmingPartners';
import Reviews from '../courseDetails/reviews/reviews';
import SeoContentComp from '../common/seoContentComp';
import MarketigTagFirstSec from '../marketingtag/marketingtagfirstsec';
import seoAction from './seoAction';

class BannerSection extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    window.scroll(0, 0);
  }

  render () {
    const tagManagerArgs = {
      dataLayer: {
        userProject: 'Wiculty',
        page: 'Home',
        url: window.location.href
      },
      dataLayerName: 'PageDataLayer'
    }

    TagManager.dataLayer(tagManagerArgs);
    return (
      <React.Fragment>
        <div className="landingPageBannersec page-fixed-top">
          <BannerCarousel {...this.props} />
          <SeoContentComp seoKey="home" />
          <MarketigTagFirstSec />
          <FreeCourseSec {...this.props} />
          <SelfPacedCourses {...this.props} />
          <Row className="mt-2 mb-4 mt-4 text-center">
            <Col>
              <Link to="/all-courses">
                <button type="button" className="btn btn-theme btn-md rounded-pill">
                View All Courses
                </button>
              </Link>
            </Col>
          </Row>
          <TrendingTopics homepage />
          <NewLaunchSec />
          <NurtureComp />
          <BlogSec {...this.props} />
          <CorprateSec />
          <Reviews page="home" />
          <CharmingPartners />
        </div>
        <JSONLD>
          <Generic
            type="organization"
            jsonldtype="Organization"
            schema={
              {
                name: 'Wiculty',
                url: 'https://www.wiculty.com',
                sameAs: [
                  'https://www.facebook.com/Wiculty-Learning-Solutions-Pvt-Ltd-101761581198728/?modal=admin_todo_tour',
                  'https://www.instagram.com/wiculty/',
                  'https://www.youtube.com/channel/UCWO5BNZBkNWzXRgg5axQJPw?guided_help_flow=3',
                  'https://www.quora.com/profile/Wiculty-Learning',
                  'https://www.linkedin.com/company/wiculty',
                  'https://twitter.com/WicultyL',
                  'https://api.whatsapp.com/send?phone=918951066177&text=Hello%20Wiculty%20Learning%20Solutions%20Please%20let%20me%20know%20more%20about%20trending%20courses%20and%20your%20offerings'
                ],
                logo: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/img/New-wiculty-logo.png',
                telephone: '+91 8951066177',
                email: 'info(at)wiculty.com'
              }
            }
          >
            <Generic
              type="address"
              jsonldtype="PostalAddress"
              schema={
                {
                  streetAddress: '3rd Floor, Sigma Tech Park Gamma Block, Varthur Kodi',
                  addressLocality: 'Bangalore',
                  addressRegion: 'Karnataka',
                  postalCode: '560066'
                }
              }
            />
          </Generic>
        </JSONLD>
        <JSONLD>
          <Generic
            type="webSite"
            jsonldtype="WebSite"
            schema={
              {
                url: 'https://www.wiculty.com'
              }
            }
          >
            <Generic
              type="potentialAction"
              jsonldtype="SearchAction"
              schema={
                {
                  target: 'https://www.wiculty.com/search/{searchTerm}',
                  'query-input': 'required name=searchTerm'
                }
              }
            />
          </Generic>
        </JSONLD>
      </React.Fragment>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getSeoContent: (payload, cb) => {
    dispatch(seoAction(payload, cb));
  }
});

BannerSection.propTypes = {
  getSeoContent: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(BannerSection);
