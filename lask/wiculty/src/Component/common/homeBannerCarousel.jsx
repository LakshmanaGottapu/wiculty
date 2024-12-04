import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import sf from './safeTraverse';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 0,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  pauseOnHover: true
}

const BannerCarousel = ({ banner = [] }) => (
  <div className="landing-banners">
    <Slider {...sliderSettings}>
      {banner && banner.map(item => (
        <div>
          <img src={item.image} alt="banner" />
        </div>
      ))}
    </Slider>
  </div>
);

export const mapStateToProps = state => ({
  banner: sf(state, ['homeContent', 'banners'])
});

BannerCarousel.defaultProps = {
  banner: []
}

BannerCarousel.propTypes = {
  banner: PropTypes.arrayOf()
};

export default connect(mapStateToProps, null)(BannerCarousel);
