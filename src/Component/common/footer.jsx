import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CountryDD from '../country_dropdown/country_dropdown';
import { socialMediaJSON } from '../staticJSON/staticIconJson';

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  toExt = (link) => {
    window.open(link, '_blank')
  }

  handleSelectCountry = (countryObj = {}) => {}

  render () {
    const filteredSocialSites = socialMediaJSON
      .filter(socialSite => socialSite.id !== 'email');
    return (
      <React.Fragment>
        <Container fluid className="footerSec pt-3 mb-o mb-md-5">
          <Row>
            <Col lg="6" md="6" sm="12" className="wicultythemeColor">
              <a
                href="https://www.wiculty.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                    Wiculty.com
              </a>
                  &nbsp;| Learning Replenished
            </Col>
            <Col>
              <div className="wicultythemeColor float-right">
                    Connect with us:
                <br />
                {filteredSocialSites.map(socialItem => (
                  <>
                    <a
                      href={socialItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`avatar-bg mb-2 mt-2 avatar-${socialItem.id}`}
                    >
                      <FontAwesomeIcon
                        icon={socialItem.icon}
                        className="footerSocialIcons"
                      />
                    </a>
                    <style jsx="true">
                      {
                        `.avatar-${socialItem.id}:hover {
                          background: transparent;
                        }
                        .avatar-${socialItem.id} {
                          background: ${socialItem.bg_color};
                        }
                        `
                      }
                    </style>
                  </>

                ))}
              </div>
            </Col>
          </Row>
          <Row className="linkContainer">
            <Col lg="4" md="4" sm="12">
              <ul>
                <li>
                  <h4>Company</h4>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/terms-conditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </Col>
            <Col lg="4" md="4" sm="12">
              <ul>
                <li>
                  <h4>Accelerate with us</h4>
                </li>
                <li>
                  <Link to="/instructor">Join as Instructor</Link>
                </li>
                <li>
                  <Link to="/affiliate">Affiliate Program</Link>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_COMMUNITY_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {'Wiculty Community'}
                  </a>
                </li>
              </ul>
            </Col>
            <Col lg="4" md="4" sm="12">
              <ul>
                <li>
                  <h4>Support & feedback</h4>
                </li>
                <li>
                  <Link to="/careers">
                    {'Career - '}
                    <span className="lylac-text">We are hiring!</span>
                  </Link>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_SUPPORT_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {'Support Desk'}
                  </a>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="justify-content-start">
            <Col lg="6" md="6" sm="12">
              <p className="wicultythemeColor mist">
              &copy;
                {`${new Date().getFullYear()} Wiculty Learning Solutions Pvt. Ltd. All rights Reserved.`}
              </p>
            </Col>
            <Col className="d-flex footer-DD mb-3" lg="3" md="3" sm="12">
              <h3 className="mr-2 wicultythemeColor flex-vertical-center"> Country:</h3>
              <CountryDD
                onSelectCountry={this.handleSelectCountry}
                isPhoneCode={false}
                classFlag="DD-dark-theme"
              />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default withRouter(Footer)
