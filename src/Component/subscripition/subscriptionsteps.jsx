import React from 'react'
import { Container } from 'reactstrap';
import { tramJSON } from './tramJSON';
import './subscription.scss';
import Review from './review';

const Subscriptionsteps = params => (
  <div>
    <Container>
      <div className=" my-5 tram-container">
        <h2 className="h1 text-center mb-4">
          {'Here’s how it works.'}
        </h2>
        {tramJSON.map(({
          img, desc, order1, order2, shape
        }) => (
          <div className="row my-5">
            <div className={`col-12 col-md-6 ${order1}`}>
              <img className={`img-fluid img-height mb-4 ${shape}`} src={img} alt="tram" />
            </div>
            <div className={`col-12 col-md-6 d-flex align-items-center ${order2}`}>
              <div>
                <h2 className="font-weight-bold img_text">
                  {desc}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Container fluid>
        <div className="text-center">
          <h2>What You learn</h2>
          <h4 className="text-primary">For example, if you get a 5 LPA package, you need to pay Rs. 125,000 + GST.</h4>
          <p className="pt-2">
            {`The payment depends on your package.
            After getting the job, you need to pay
            3 months gross salary in three monthly
            consecutive EMIs,after getting the salary every month`}
          </p>
          <p className="pt-2">
            {`The payment depends on your package.
            After getting the job, you need to pay
            3 months gross salary in three monthly
            consecutive EMIs,
            after getting the salary every month
            three monthly consecutive EMIs,
            after getting the salary every month`}
          </p>
          <p className="pt-2">
            {`The payment depends on your package.
            After getting the job, you need to pay
            3 months gross salary in three monthly
            consecutive EMIs,
            after getting the salary every month
            three monthly consecutive EMIs,
            after getting the salary every month
            three monthly consecutive EMIs,
            after getting the salary every month`}
          </p>
        </div>
      </Container>
      <div>
        <Review />
      </div>
    </Container>
  </div>
)
export default Subscriptionsteps;
