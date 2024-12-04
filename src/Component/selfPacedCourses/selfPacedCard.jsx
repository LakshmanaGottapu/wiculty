import React from 'react'
import PropTypes from 'prop-types';
import {
  Card, CardBody, Col
} from 'reactstrap';

const SelfPacedCard = ({
  title, course_slug,
  course_image, history,
  course_duration, project_duration,
  is_freecourse
}) => {
  const handleCourseRouting = () => {
    history.push(`/${course_slug}`)
  }
  const sectionStyle = {
    backgroundImage: `url(${course_image})`
  }
  return (
    <React.Fragment>
      <Col xl="2" lg="2" md="6" sm="6" className="homeCard mt-2 mb-2">
        <div className="horizantalCourseCard">
          <Card className="horizantalCourseCard outer-div" onClick={() => handleCourseRouting()}>
            <CardBody style={sectionStyle} className="inner-div" />
            {is_freecourse ? <span className="free-label font-weight-bold">Free</span> : ''}
            <p className="courseDuration text-center">
              {`Duration : ${course_duration}+ hrs`}
              <br />
              {`Project : ${project_duration} hrs`}
            </p>
          </Card>
        </div>
      </Col>

    </React.Fragment>
  )
};

SelfPacedCard.propTypes = {
  title: PropTypes.string.isRequired,
  course_image: PropTypes.string.isRequired,
  course_slug: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  course_duration: PropTypes.number.isRequired,
  project_duration: PropTypes.number.isRequired,
  is_freecourse: PropTypes.number.isRequired
};

SelfPacedCard.defaultProps = {
  history: {}
}

export default SelfPacedCard;
