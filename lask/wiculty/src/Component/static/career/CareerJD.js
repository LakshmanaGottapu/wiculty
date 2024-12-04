import React, { Component } from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Collapse, CardBody, Card
} from 'reactstrap';

class CareerJD extends Component {
  constructor (props) {
    super(props);
    this.state = {
      collapseObj: {}
    };
  }

  toggle (selectedTab) {
    this.setState(state => ({
      collapseObj: { [selectedTab]: !state.collapseObj[selectedTab] }
    }));
  }

  render () {
    const { collapseObj } = this.state
    const { openingsSectionJD = [], handleWicultyOpening } = this.props;

    return (
      <div className="opening-JD-container mgt20">
        {openingsSectionJD.map(item => (
          <div>
            <div>
              <div className={classnames('opening-JD-tab rounded', { active: collapseObj[item.title] })} onClick={() => this.toggle(item.title)} style={{ marginBottom: 2 }}> {/* eslint-disable-line */}
                <h3 className=" text-left collapse-name c-p mb-0 d-flex align-items-center font-weight-normal">
                  {item.title}
                </h3>
                <p style={{ marginRight: 20 }} className="collapse-icon">
                  {collapseObj[item.title] ? (<p className="minus"><span>-</span></p>) : (<p className="plus"><span>+</span></p>)}
                </p>
              </div>
              <p>Business Process Delivery</p>
            </div>
            <Collapse isOpen={(collapseObj[item.title])}>
              <Card>
                <CardBody className="text-left">
                  <p className="ft26">
                    {item.description ? parse(item.description) : ''}
                  </p>
                  <h5>Job Description:</h5>
                  <div className="JD-points-container text-muted">
                    <ul className="JD-points">
                      {item.jobDescription.map(point => (
                        <li>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h5>Qualifications:</h5>
                  <div className="JD-points-container text-muted">
                    <ul className="JD-points">
                      {item.qualification.map(point => (
                        <li>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {item.experience && (
                  <>
                    <h5>Experience:</h5>
                    <p className="JD-points text-muted">
                      <ul className="JD-points">
                        <li>
                          {item.experience}
                        </li>
                      </ul>
                    </p>
                  </>
                  )}
                  <div className="JD-button-section mgt20">
                    <button type="button" className="btn btn-theme rounded-pill" onClick={() => handleWicultyOpening(item.title)}>
                      {'Apply Now'}
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        ))}
        <style jsx="true">
          {
            `
            .JD-button-section {
              float: right;
            }
            button.JD-button {
              height: 40px;
              font-size: 20px;
              width: 150px;
          }
            `
          }
        </style>
      </div>
    );
  }
}
CareerJD.propTypes = {
  openingsSectionJD: PropTypes.isRequired,
  handleWicultyOpening: PropTypes.func.isRequired
};
export default CareerJD;
