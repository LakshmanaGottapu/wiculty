import React from 'react'
// import { Row, Col } from 'reactstrap';
import './mycourses.scss';

const CourseLeftPanel = () => (
  <div className="left-cards ft16">
    <div className="top-section">
      <div className="tac">
        <p className="mg0">
          {'LEARNING THROUGH DISCUSSION,'}
        </p>
        <p className="ftm">
          {'Makes your understanding much effective!!'}
        </p>
        <p className="fcr">
          {'Start Brainstorming! Add value now'}
        </p>
      </div>
      <ul>
        <li>
          {'Post your queries!'}
        </li>
        <li>
          {'Get that answered by your peers!'}
        </li>
        <li>
          {'Answer others Queries! '}
        </li>
      </ul>
    </div>
    <div className="bottom-section tac">
      <p className="ftb ft20">
        {'Join Our Community'}
      </p>
      <p className="ft14">
        {'Leap into the attempt of making a great career..'}
      </p>
      <a href={process.env.REACT_APP_COMMUNITY_URL} rel="noopener noreferrer" target="_blank">
        <button type="button" className="btn btn-theme btn-md rounded-pill">
          {'Join Now'}
        </button>
      </a>
    </div>
  </div>
)

export default CourseLeftPanel;
