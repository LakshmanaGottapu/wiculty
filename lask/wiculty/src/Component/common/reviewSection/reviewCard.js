import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import Slider from 'react-slick';
import reviewDetailsAction from '../../../Actions/reviewDetailsAction';
import './reviewCard.scss';
import sf from '../safeTraverse';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function getcommentsData (commentsText, flag) {
  return (flag === 'less' ? `${commentsText.substr(0, 160)} ...` : `${commentsText} ...`)
}

function getInitials (name) {
  return name.split(' ').map(n => n[0]).join('');
}

class ReviewCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showMore: {},
      galleryItems: this.galleryItems([]),
      reviews: [],
      sliderSettings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 790,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    };
    window.scroll(0, 0);
    this.galleryItems = this.galleryItems.bind(this);
  }

  componentDidMount () {
    const {
      page,
      courseId,
      getReviewDetails,
      homeContent
    } = this.props;
    if (page === 'home') {
      const reviews = sf(homeContent, ['reviews']) || [];
      this.setState({
        reviews,
        galleryItems: this.galleryItems(reviews)
      })
    } else {
      getReviewDetails({ page, courseId }, (resp) => {
        const review = sf(resp, ['data', 'data', 'reviews']) || [];
        const textReviews = review.filter(o => o.review_type === 1);
        this.setState({
          galleryItems: this.galleryItems(textReviews),
          reviews: textReviews || []
        })
      })
    }
  }

  setGalleryItem () {
    this.setState(state => ({
      galleryItems: this.galleryItems(state.reviews)
    }))
  }

  handleOnSlideChange = (event) => {
    const { itemsInSlide, item } = event
    this.setState({ itemsInSlide, currentIndex: item })
  }

  galleryItems (reviews = []) {
    const { showMore } = this.state || {};
    return (
      reviews.map(reviewer => (
        <div className="review-card">
          <Row>
            <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
              <div data-letters={getInitials(reviewer.author)} className="avatar" />
              <div className="review-star d-inline-block">
                <h5 className="author-title">
                  {reviewer.author && reviewer.author.toLowerCase()}
                </h5>
                <div>
                  <StarRatingComponent
                    name="rate2"
                    editing
                    starCount={5}
                    value={reviewer.rating}
                    className="starRatingsAlgn"
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
              {showMore[reviewer.author] ? (
                <p className="more review-desc">
                  {getcommentsData(reviewer.message, 'more')}
                  <span role="button" className="see-more" onClick={() => this.commentsToggle(reviewer.author)} tabIndex={0} onKeyPress={() => {}}>
                    {'See less'}
                  </span>
                </p>
              ) : (
                <p className="less review-desc">
                  {getcommentsData(reviewer.message, 'less')}
                  <span role="button" className="see-more" onClick={() => this.commentsToggle(reviewer.author)} tabIndex={0} onKeyPress={() => {}}>
                    {'See more'}
                  </span>
                </p>
              ) }
            </Col>
          </Row>
        </div>
      ))
    )
  }

  commentsToggle (author) {
    const { showMore, reviews } = this.state;
    this.setState({
      showMore: { ...showMore, [author]: !showMore[author] }
    }, () => {
      this.setState({
        galleryItems: this.galleryItems(reviews)
      })
    })
  }

  slideNextPage () {
    const { currentIndex, itemsInSlide, galleryItems: { length } } = this.state
    let Index = currentIndex + itemsInSlide
    if (Index > length) Index = length

    this.setState({ currentIndex: Index })
  }

  slidePrevPage () {
    const { currentIndex, itemsInSlide } = this.state;
    const Index = currentIndex - itemsInSlide
    this.setState({ currentIndex: Index })
  }

  render () {
    const {
      sliderSettings, galleryItems
    } = this.state;
    const { carouselHeight } = this.props;
    return (
      <div className="review-card-container" style={{ height: carouselHeight || 'inherit' }}>
        <Slider {...sliderSettings}>
          {galleryItems}
        </Slider>
      </div>
    )
  }
}

ReviewCard.propTypes = {
  carouselHeight: PropTypes.isRequired,
  homeContent: PropTypes.isRequired,
  getReviewDetails: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  courseId: PropTypes.bool.isRequired
};
const mapDispatchToProps = dispatch => ({
  getReviewDetails: (payload, cb) => {
    dispatch(reviewDetailsAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  homeContent: state.homeContent
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCard);
