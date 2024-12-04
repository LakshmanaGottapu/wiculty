import React from 'react';
import './charmingPartners.scss';
import { IMAGES } from '../../locales/images';

const charmingPartnersArray = [
  {
    companyName: 'Tesco',
    img: IMAGES.TESCO
  },
  {
    companyName: 'Harman',
    img: IMAGES.HARMAN
  },
  {
    companyName: 'Walmart',
    img: IMAGES.WALMART
  },
  {
    companyName: 'TATA',
    img: IMAGES.TATA
  },
  {
    companyName: 'Wipro',
    img: IMAGES.WIPRO
  },
  {
    companyName: 'Oracle',
    img: IMAGES.ORACLE
  }
]

export default function CharmingPartners () {
  return (
    <div className="container">
      <div className="charming-partners-container my-4">
        <h2 className="text-center font-weight-bold">
        Our Alumni Work Here
        </h2>
        <p className="text-center">
        200+ employers have hired our graduates
        </p>
        <div className="logos-container">
          {charmingPartnersArray.map(partner => (
            <div className="partners-logo flex-vertical-center bg-white m-1" id={partner.companyName}>
              <img className="img-fluid  m-0 bg-white lazyload" data-src={partner.img} alt={partner.companyName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
