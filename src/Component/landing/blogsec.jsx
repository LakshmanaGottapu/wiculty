/* eslint-disable */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, Card, CardImg, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import sf from '../common/safeTraverse';
import Slider from 'react-slick';
import { months } from '../../Constants/constants';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const events = {
    onDragged() {},
    onChanged() {},
  };


class BlogSec extends Component{

    constructor (props) {
        super(props);
        this.state = {
          blogs: [],
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
      }

    toBlog (link) {
      window.open(link,'_blank');
    }

    formatDate(isoDate){
      let mydate = new Date(isoDate);
      var curr_date = mydate.getDate();
      var curr_month = mydate.getMonth(); //Months are zero based
      var curr_year = mydate.getFullYear();
      return curr_date + " " + months[curr_month] + ", " + curr_year;
    }

    static getDerivedStateFromProps (props, state) {
        const { homeContent } = props || {}
        const blogs = sf(homeContent, ['data', 'data', 'blogs']) || [];
        if (blogs) {
          return {
            blogs
          }
        }
        return null
      }
    render(){
        const { blogs, sliderSettings } =this.state;
        return(
            <React.Fragment>
              {(blogs && blogs.length) > 0 &&
                <Container fluid className="pitchHolder blogs-menu-container">
                <div className="pitchHolderInner blogBg">
                  <Row className="blogsHeader">
                    <Col className="text-center">
                      <h2 className="mb-0">
                        Wiculty Blog | Get upgraded along the learning trials
                      </h2>
                    </Col>
                  </Row>
                  <Row className="blog-carousel">
                      <Col className="blogCarouselHolder" sm="12">
                        <Slider {...sliderSettings}>
                          {blogs && blogs.map(item => ( 
                              <div>
                                  <Card className="blogCard c-p" onClick={() => this.toBlog(item.link)}>
                                      <p className="blog-img">
                                        <img className="lazyload" data-src={item.image} alt={item.title} />
                                      </p>
                                      <p className="blogTitle">{item.title}</p>
                                      <p className="blogDate">{this.formatDate(item.date_published)}</p>
                                  </Card>
                              </div>
                            ))}
                        </Slider>
                      </Col>
                  </Row>
                </div>
                </Container>
              }
            </React.Fragment>
        );  
    }
}

export const mapStateToProps = state => ({
    homeContent: state.homeContent
  });

export default connect(mapStateToProps,null)(BlogSec);
