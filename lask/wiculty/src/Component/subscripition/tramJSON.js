import {
  faChargingStation, faChartLine,
  faUserTie, faBrain
} from '@fortawesome/free-solid-svg-icons';

const tramJSON = [
  {
    desc: 'Steps1 : Take Self-Assessment',
    img: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/img/laptop1.png',
    order1: 'order-1',
    order2: 'order-2',
    shape: 'shape-1'
  },
  {
    desc: 'Steps2 : Take Self-Assessment',
    img: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/img/TabletMobile.png',
    order1: 'order-1 order-md-2',
    order2: 'order-2 order-md-1'
  },
  {
    desc: 'Steps3 : Take Self-Assessment',
    img: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/img/wicimage.png',
    order1: 'order-1',
    order2: 'order-2',
    shape: 'shape-1'
  }
]
const jobfirstJSON = [
  {
    desc: 'Gamut Gurus DevOps training certification course will help you to master DevOps from scratch to advance level with real-time projects and trending topic such as DevSecOps. This course provides work integrated learning so that you can change your domain to DevOps or start working on your existing real-time project from the day-1 working on your existing real-time.',
    des: 'Training certification course',
    img: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/125.png',
    order1: 'order-1',
    order2: 'order-2',
    shape: 'shape-1'
  },
  {
    desc: 'Gamut Gurus DevOps training certification course will help you to master DevOps from scratch to advance level with real-time projects and trending topic such as DevSecOps. This course provides work integrated learning so that you can change your domain to DevOps or start working on your existing real-time project from the day-1 working on your existing real-time.',
    des: 'How get a job',
    img: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/126.png',
    order1: 'order-1 order-md-2',
    order2: 'order-2 order-md-1',
    shape: 'shape-2'
  }
]
const matrixsJSON = [{
  icon: faChargingStation,
  title: 'High learner’s satisfaction rate',
  desc: 'High learner’s satisfaction rate High learner’s satisfaction rateHigh learner’s satisfaction rate'
},
{
  icon: faBrain,
  title: 'Learners psychology-driven',
  desc: 'Learners psychology-driven training approach High learner’s satisfaction rateHigh learner’s satisfaction rate'
},
{
  icon: faChartLine,
  title: 'Curriculum upgradation',
  desc: 'Curriculum upgradation based on trends Curriculum upgradation based on trendsCurriculum upgradation based on trends'
},
{
  icon: faUserTie,
  title: 'Career navigation ',
  desc: 'Career navigation based on skillset in demand Curriculum upgradation based on trendsCurriculum upgradation based on trends'
}];

export { tramJSON, jobfirstJSON, matrixsJSON }; //eslint-disable-line
