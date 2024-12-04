import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import myordersAction from './myOrdersAction';
import MyOrdersRow from './myOrdersRow';
import sf from '../common/safeTraverse';
import { MESSAGES } from '../locales/locale';
import NoDataComp from '../common/noDataComp/noDataComp';
import GifContainer from '../common/gifContainer';

import './myorders.scss';

class Orders extends Component {
  constructor (props) {
    super(props);
    this.state = {
      myorders: [],
      isComponentDidMount: false
    };
    this.response = [];
    window.scroll(0, 0);
  }

  componentDidMount () {
    const { getMyOrders } = this.props;
    getMyOrders('my-orders', (resp) => {
      const myorders = sf(resp, ['data', 'data', 'orders']) || [];
      this.setState({
        myorders,
        isComponentDidMount: true
      });
    })
  }

  static getDerivedStateFromProps (props, state) {
    const { myOrdersReducer } = props || {}
    const myorders = sf(myOrdersReducer, ['data', 'data', 'orders']) || [];
    if (myOrdersReducer.data) {
      return {
        myorders
      }
    }
    return null
  }

  renderOrders () {
    const { myorders } = this.state;
    const { ERROR: { NO_ORDERS } } = MESSAGES;
    let ordersCards;
    if ((myorders.length) > 0) {
      ordersCards = (
        <React.Fragment>
          {myorders.map(item => (
            (
              <MyOrdersRow
                orderId={item.order_id}
                orderAmount={item.order_amount}
                gst={item.gst}
                walletCash={item.wallet_cash}
                discount={item.discount}
                currencySymbol={item.currency_symbol}
                coursePrice={item.course_price}
                courseTitle={item.course_title}
                courseImage={item.course_image}
                invoiceUrl={item.invoice_url}
              />
            )))}
        </React.Fragment>
      )
    } else {
      ordersCards = <NoDataComp msg={NO_ORDERS} />
    }
    return ordersCards;
  }

  render () {
    const { isComponentDidMount } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Wiculty - Orders</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Wiculty - Orders" />
        </Helmet>
        <div className="myorders-container my-5">
          <h1 className="d-flex justify-content-center mb-4">Wiculty ORDERS   |  View all your course - purchases  from here</h1>
          <div className="container">
            {isComponentDidMount ? this.renderOrders() : (
              <div className="loading-gif-container">
                <GifContainer />
                <GifContainer />
                <GifContainer />
                <GifContainer />
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMyOrders: (payload, cb) => {
    dispatch(myordersAction(payload, cb));
  }
});

export const mapStateToProps = state => ({
  myOrdersReducer: state.myOrdersReducer
});

Orders.propTypes = {
  getMyOrders: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
