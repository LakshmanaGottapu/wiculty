import React, { Component } from 'react';
import LoadingBar from 'react-top-loading-bar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* eslint-disable react/no-unused-prop-types */
class CourseDetailsProgressBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loadingBarProgress: 40,
      isLoaded: true
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { courseDetails: { isLoaded } } = props || {};
    if (state.isLoaded === isLoaded) {
      return {
        loadingBarProgress: 100
      }
    }
    return null;
  }

  render () {
    const { loadingBarProgress } = this.state;
    if (loadingBarProgress === 100 && this.LoadingBar) {
      this.LoadingBar.complete();
    }
    return (
      <LoadingBar
        progress={loadingBarProgress}
        height={3}
        color="red"
        onRef={ref => (this.LoadingBar = ref)}
      />
    )
  }
}

CourseDetailsProgressBar.propTypes = {
  courseDetails: PropTypes.shape({}).isRequired
}

export const mapStateToProps = state => ({
  courseDetails: state.courseDetails
});

export default connect(mapStateToProps, null)(CourseDetailsProgressBar);
/* eslint-enable react/no-unused-prop-types */
