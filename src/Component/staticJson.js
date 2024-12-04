import {
  faBezierCurve, faBook, faBookOpen, faBrain, faBuilding, faBullseye,
  faChalkboardTeacher, faChargingStation, faChartLine,
  faDollarSign, faFlask,
  faGlobe, faHandHoldingUsd, faInfoCircle, faLightbulb, faProjectDiagram,
  faTv, faUsers, faUserTie, faVolumeUp, faWallet, faShoppingCart, faMoneyBillWave,
  faTruckMoving, faShareSquare
} from '@fortawesome/free-solid-svg-icons';

import { IMAGES } from './locales/images'

const tramContentJson = [
  {
    heading: 'Kickstart our tram',
    paragraph: 'Kickstart our Wiculty affiliation engine, board our tram of promotion! start ignition by spreading our courses & expertise training online.',
    styleClass: 'tram-img-orange'
  },
  {
    heading: 'Promote your routes',
    paragraph: 'Promote our online courses through your own social media routes as potential source, let your high shouts online break open the wisdom space to get us the jewels of learners ahead.',
    styleClass: 'tram-img-black'
  },
  {
    heading: 'Pitch it to visitors',
    paragraph: 'We know the pulse of learners, use our creative-driven banners, text links on your site or blogs and drive the energy of subconscious appeals by converting it to Wiculty as business.',
    styleClass: 'tram-img-orange'
  },
  {
    heading: 'Make audience onboard',
    paragraph: 'Let your own audience join our courses! We will take a huge leap to pay your piece for that power drag into us.',
    styleClass: 'tram-img-black'
  }
]

const joinAffiliateJson = [
  {
    imgClassName: 'promote',
    heading: 'Promote Wiculty',
    paragraph: 'Promote Wiculty by sharing our content across your blogs & other promotional platforms pitched with your ownership. Add our tracking links run the promo-rush as much as possible, show us the reach insight and revenue.',
    icon: faUsers
  },
  {
    imgClassName: 'Splendid',
    heading: 'Splendid Commissions',
    paragraph: 'Your fat commission is actively proportional to the more promotion you do for us! For every purchasethrough your affiliate tracking links and other promo-creatives, get the best commission against our planned percentile sale value earned from your end.',
    icon: faWallet
  },
  {
    imgClassName: 'Monetize',
    heading: 'Monetize Your Audience',
    paragraph: 'Monetization is an art of business conversion in terms of revenue! We know you can master it through some of our assets.Take the lead to monetize and enhance our sales to great extent. Gear up audience power.',
    icon: faDollarSign
  },
  {
    imgClassName: 'Affiliate',
    heading: 'Affiliate Assistance',
    paragraph: 'Get the grip-hold assistance from our marketing team to support the affiliation process that eventually throw an arrow of course exploration and strategies to gel up at different phases of injecting new marketing initiatives.',
    icon: faInfoCircle
  }
]

const cluttersQueryJson = [
  {
    question: 'Tell something about my monetization benefits?',
    answer: 'The more your promote us, the more you get! we have best commission rates for you.'
  },
  {
    question: 'When can i start it? How long does it take to initiate?',
    answer: 'It wont take a long drag! Once after dropping your enquiry with us, our marketing team will get back to you to initaite the process.'
  },
  {
    question: 'How well can I use your promotional materials?',
    answer: 'As a committed affiliate with us, you will have access to our promo-contents, coupons & discounts.'
  }
]

const courseFeedBackJSON = [
  {
    'Id': 'course_rating',
    'Name': 'How unique is our course & curriculum stands from others?'
  },
  {
    'Id': 'instructor_rating',
    'Name': 'What is the loyal feedback about your instructor?'
  }
]

const classFeedBackJSON = [
  {
    'Id': 'class_rating',
    'Name': 'How unique is our class & curriculum stands from others?'
  },
  {
    'Id': 'instructor_rating',
    'Name': 'What is the loyal feedback about your instructor?'
  }
]
const Enhancer = 'Learning Enhancers'
const nurtuteToolsJSON = [
  {
    'Id': 'nurture-img1',
    'Course': 'DevOps Certification Training',
    'Desc': 'Potential game changer ',
    'CaseStudies': '06',
    'Projects': '04',
    'Questions': '200',
    'Enhancer': Enhancer,
    'master': true,
    'slug': 'devops-certification-training',
    'courseId': 'devops'
  },
  {
    'Id': 'nurture-img4',
    'Course': 'AWS Solution Architect certification training',
    'Desc': 'Ultimate cloud coverage',
    'CaseStudies': '06',
    'Projects': '04',
    'Questions': '200',
    'Enhancer': Enhancer,
    'master': true,
    'slug': 'aws-certification-training',
    'courseId': 'aws'
  },
  {
    'Id': 'nurture-img6',
    'Course': 'Kubernetes Administrator (CKA) Certification Training ',
    'Desc': 'Containers steerer',
    'CaseStudies': '06',
    'Projects': '04',
    'Questions': '200',
    'Enhancer': Enhancer,
    'slug': 'kubernetes-certified-training',
    'courseId': 'dnk'
  },
  {
    'Id': 'nurture-img5',
    'Course': 'Google Cloud Architect certification Training',
    'Desc': 'Novelty cloud source',
    'CaseStudies': '06',
    'Projects': '04',
    'Questions': '200',
    'Enhancer': Enhancer,
    'master': true,
    'slug': 'google-cloud-platform-certification-training',
    'courseId': 'gcp'
  },
  {
    'Id': 'nurture-img2',
    'Course': 'Python Programming certification Training',
    'Desc': 'Application enhancer',
    'CaseStudies': '06',
    'Projects': '04',
    'Questions': '200',
    'Enhancer': Enhancer,
    'slug': 'python-certification-training',
    'courseId': 'python'
  },
  {
    'Id': 'nurture-img3',
    'Course': 'Microsoft Azure solution Architect certification Training',
    'Desc': 'Efficient cloud synergizer ',
    'CaseStudies': '06',
    'Projects': '04',
    'Questions': '200',
    'Enhancer': Enhancer,
    'master': true,
    'slug': 'microsoft-azure-certification-training',
    'courseId': 'azure'
  }
]

const nurtureImgLeftJSON = [
  {
    'Id': 'nurture-img1',
    'course': 'AWS',
    'Desc': 'Host any beast'
  },
  {
    'Id': 'nurture-img2',
    'course': 'GCP',
    'Desc': 'Venture into virtual'
  },
  {
    'Id': 'nurture-img3',
    'course': 'Docker & Kubernetes ',
    'Desc': 'Hyper in trend'
  }
]

const nurtureImgRightJSON = [
  {
    'Id': 'nurture-img1',
    'course': 'DevOps',
    'Desc': ' Our signature'
  },
  {
    'Id': 'nurture-img2',
    'course': 'Python',
    'Desc': 'Game changes'
  },
  {
    'Id': 'nurture-img3',
    'course': 'Microsoft Azure',
    'Desc': 'Float in cloud'
  }
];

const coursesInfo = [
  {
    id: 'devops',
    color: '#122865',
    slug: 'devops-certification-training',
    name: 'DevOps',
    trendTopic: 'DevSecOps',
    enrollNowBtnClass: 'btn-grad1',
    certificationType: 'Master',
    videoThumbnail: 'https://wiculty-assets.s3.amazonaws.com/course/thumbnails/DevOps+Thumbnail.jpg',
    videoURL: 'https://www.youtube.com/embed/HvOoxjQBMJE'
  },
  {
    id: 'aws',
    color: '#f89803',
    slug: 'aws-certification-training',
    name: 'AWS',
    trendTopic: 'Sage Maker',
    enrollNowBtnClass: 'btn-grad2',
    certificationType: 'Master',
    videoThumbnail: 'https://wiculty-assets.s3.amazonaws.com/course/thumbnails/AWS+Thumbnail.jpg',
    videoURL: 'https://www.youtube.com/embed/6vHqHSS6CiM'
  },
  {
    id: 'azure',
    color: '#2e8dbc',
    slug: 'microsoft-azure-certification-training',
    name: 'Microsoft Azure',
    trendTopic: 'Sphere',
    enrollNowBtnClass: 'btn-grad1',
    certificationType: 'Master',
    videoThumbnail: 'https://wiculty-assets.s3.amazonaws.com/course/thumbnails/Azure+Thumbnail.jpg',
    videoURL: 'https://www.youtube.com/embed/zsgrzutfYNU'
  },
  {
    id: 'gcp',
    color: '#143b7c',
    slug: 'google-cloud-platform-certification-training',
    name: 'Google Cloud Platform',
    trendTopic: 'Anthos',
    enrollNowBtnClass: 'btn-grad1',
    certificationType: 'Master',
    videoThumbnail: 'https://wiculty-assets.s3.amazonaws.com/course/thumbnails/GCP+Thumbnail.jpg',
    videoURL: 'https://www.youtube.com/embed/dWyZ5kn9jXk'
  },
  {
    id: 'python',
    color: '#333773',
    slug: 'python-certification-training',
    name: 'Python',
    trendTopic: 'Rookout',
    enrollNowBtnClass: 'btn-grad1',
    certificationType: 'Regular',
    videoThumbnail: 'https://wiculty-assets.s3.amazonaws.com/course/thumbnails/Python+Thumbnail.jpg',
    videoURL: 'https://www.youtube.com/embed/GFaHkgHLCT0'
  },
  {
    id: 'dnk',
    color: '#f77e15',
    slug: 'kubernetes-certified-training',
    name: 'Docker and Kubernetes',
    trendTopic: 'CSI',
    enrollNowBtnClass: 'btn-grad2',
    certificationType: 'Regular',
    videoThumbnail: 'https://wiculty-assets.s3.amazonaws.com/course/thumbnails/D_K+Thumbnail.jpg',
    videoURL: 'https://www.youtube.com/embed/baCRugYJWE0'
  }
];

const courseCSS = {
  'AWS Certification Training': {
    color: '#f89803'
  },
  'Docker and Kubernetes Certified Training': {
    color: '#2395EC'
  },
  'DevOps Certification Training': {
    color: '#122865'
  },
  'Python Certification Training': {
    color: '#C09036'
  },
  'Google Cloud Platform Certification Training': {
    color: '#143b7c'
  },
  'Microsoft Azure Certification Training': {
    color: '#2e8dbc'
  }
}

const acuraData = [
  {
    icon: faTv,
    alt: 'TV Icon',
    title: 'Live lecturing sessions',
    desc: 'Instructor-led training | Hands-on practise | Queries cracker | Round-up'
  },
  {
    icon: faUserTie,
    alt: 'SME Icon',
    title: 'SME touch on modules',
    desc: 'Intellectual interference | Deep-root analysis | Concept planting'
  },
  {
    icon: faFlask,
    alt: 'Labs Icon',
    title: 'Virtual labs',
    desc: 'Individual practise consoles | Access it anywhere | Learner’s friendly setup'
  },
  {
    icon: faProjectDiagram,
    alt: 'Project Icon',
    title: 'Profile-driven projects',
    desc: 'Practise | Ideate | Brainstorm | Develop | Execute'
  },
  {
    icon: faBook,
    alt: 'Book Icon',
    title: 'Unlimited access',
    desc: 'Access study materials | Reference documents | Cheetsheets'
  },
  {
    icon: faBookOpen,
    alt: 'Book Icon',
    title: 'Curated Content',
    desc: 'Requirement based | Focussed delivery | systematic coverage'
  }
];

const QAArray = [
  {
    Thought: 'Upskill the entire team productivity:',
    Question: 'Tech world is making steady strides in upskilling employees to adopt upcoming trends in  catering the client’s requirements, our tailored corporate training enhance the fast track learning with efficient requirement coverage'
  },
  {
    Thought: 'Tap our power-pact expert pool:',
    Question: 'We believe in expert-driven training for corporates to engage better project readiness spirit once after the end of our program rather dragging too much of adoption time on technology learned'
  }
];

const corporateTabContent = [{
  'header': 'Tutoring Nudges',
  'content': `${IMAGES.CTAB_1}`,
  'tab': 1
},
{
  'header': 'Synergy Flow',
  'content': `${IMAGES.CTAB_2}`,
  'tab': 2
},
{
  'header': 'Our Support',
  'content': `${IMAGES.CTAB_3}`,
  'tab': 3
},
{
  'header': 'Tech@Upgradation',
  'content': `${IMAGES.CTAB_4}`,
  'tab': 4
}];

const corporateTraining = [{
  icon: faVolumeUp,
  title: 'Drag us to listen your need points'
},
{
  icon: faGlobe,
  title: 'Industry-woven training methods'
},
{
  icon: faUsers,
  title: 'Synergize team collaboration & output'
},
{
  icon: faBullseye,
  title: 'Requirement centered Intellectual delivery'
}];

const marketingFlowArr = [
  {
    count: 600,
    desc: 'Successful Batches'
  },
  {
    count: 12000,
    desc: 'Corporate Learners  '
  },
  {
    count: 7,
    desc: 'Years of Training Legacy'
  },
  {
    count: 150,
    desc: 'Rapid Enrolls '
  },
  {
    count: 60,
    desc: 'Hours of Extensiveness'
  }
];

const aboutUsMatrix = [{
  icon: faChargingStation,
  title: 'Gained',
  desc: 'High learner’s satisfaction rate'
},
{
  icon: faBrain,
  title: 'Applied',
  desc: 'Learners psychology-driven training approach'
},
{
  icon: faChartLine,
  title: 'Induced',
  desc: 'Curriculum upgradation based on trends'
},
{
  icon: faUserTie,
  title: 'Promoted',
  desc: 'Career navigation based on skillset in demand'
}];

const instructorFlowArray = [
  {
    title: 'Become a path builder for your learner’s crew',
    id: 'builder',
    icon: faBezierCurve
  },
  {
    title: 'Profile spicing & build your own valuation',
    id: 'valuation',
    icon: faLightbulb
  },
  {
    title: 'Inculcate your mentoring practise widely',
    id: 'mentoring',
    icon: faChalkboardTeacher
  },
  {
    title: 'Witness wide exposure to training market',
    id: 'exposure',
    icon: faBuilding
  },
  {
    title: 'Get looped into the professional network ',
    id: 'network',
    icon: faUsers
  },
  {
    title: 'Grab splendid monetary benefits',
    id: 'monetary',
    icon: faHandHoldingUsd
  }
];

const instructorQAArray = [
  {
    Thought: 'Your brain may trigger this',
    Question: 'Tell me why should I join here?'
  },
  {
    Thought: 'This may be your serious question',
    Question: 'What can be my take away from you as an instructor?'
  },
  {
    Thought: 'If you think  ',
    Question: 'I am a contemporary instructor & never followed outlanded approaches. Guess you are at right place to go ahead!'
  }
];

const instructorTabContent = [{
  'header': 'Cook Your Course',
  'content': `${IMAGES.INSTRUCTOR_1}`,
  'tab': 1
},
{
  'header': 'Join Wiculty\'s Lecture Bay',
  'content': `${IMAGES.INSTRUCTOR_2}`,
  'tab': 2
},
{
  'header': 'Smart Mentoring',
  'content': `${IMAGES.INSTRUCTOR_3}`,
  'tab': 3
},
{
  'header': 'Support at Instructor Desk',
  'content': `${IMAGES.INSTRUCTOR_4}`,
  'tab': 4
}];

const homePageCounter = [{
  value: 600,
  text: 'Batches Completed'
},
{
  value: 12000,
  text: 'Happy Learners'
},
{
  value: 7,
  text: 'Yrs of Training Legacy'
},
{
  value: 10,
  text: 'Yrs Exp. Corporate Trainers'
},
{
  value: 430,
  text: 'Corporate Connections'
}]

const homePage = [{
  duration: 'Job First Training Next',
  image: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/img/MiscImages/WicultyPage_card.png',
  cardscontent: 'Our modules are tailored with top domain  based case studies discussion to inculcate real time understanding on ways logics',
  link: {
    text: 'Courses'
    // path: '/'
  }
},
{
  duration: 'Subscribe for Wiculty DevOps',
  image: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/img/Card2.png',
  cardscontent: 'You will save big on upskilling yourself. Breakthroughs for every upgrade in technology which is not yet covered in mainstream learning.',
  link: {
    text: 'Courses'
    // path: '/'
  }
}]

const referalJSON = [
  {
    icon: faShareSquare,
    Title: 'Kickstart to refer',
    Desc: 'A soft move! Pick any course from our Refer & Earn Page - share it via social media'
  },
  {
    icon: faShoppingCart,
    Title: 'Purchase phase',
    Desc: 'If your referrer purchases any course through the shared link. We will notify you'
  },
  {
    icon: faTruckMoving,
    Title: 'Tracking Mechanism',
    Desc: 'We have a tracking mechanism to identify your referrer against the purchase made'
  },
  {
    icon: faMoneyBillWave,
    Title: 'Redeem the cash earned',
    Desc: 'Once the cash is credited, you can redeem it to your bank account instantly'
  }]

const referralFAQs = [
  {
    Title: 'How much will I get on success referal?',
    Desc: 'Wiculty Refer & Earn program will give you 5% of refered course fee as a cashback on success referal'
  },
  {
    Title: 'How much my referal will get on success referal?',
    Desc: 'Wiculty Refer & Earn program will give 5% of refered course fee as a cashback on success referal'
  },
  {
    Title: 'How to refer my friend?',
    Desc: 'Wiculty Refer & Earn program can be used to refer your friends or connections by signing up with wiculty and sharing the course links(referral links) via Social Media.'
  },
  {
    Title: 'How Do I get a cash reward?',
    Desc: 'You can win a cash reward for every course purchase made by your referral through the link. Both the parties gets benefited in this program (The one who share the link & the one who sign up & did a course purchase using the same link) '
  },
  {
    Title: 'How Can I track my referrals?',
    Desc: 'You can track your referrals on the dashboard itself upon his/her purchase status through the link shared in social media to buy a course. Our tracking mechanism can effectively track the action and update the status.'
  }
]
const marketcards = [
  {
    icon: faShareSquare,
    Title: 'Computure Science',
    Desc: '24 Courses '
  },
  {
    icon: faShoppingCart,
    Title: 'dashboard itself',
    Desc: '4 Courses '
  },
  {
    icon: faTruckMoving,
    Title: 'cash reward',
    Desc: '14 Courses '
  },
  {
    icon: faShareSquare,
    Title: 'your referrals ',
    Desc: '34 Courses '
  },
  {
    icon: faShoppingCart,
    Title: 'Computure Science',
    Desc: '24 Courses '
  },
  {
    icon: faMoneyBillWave,
    Title: 'Computure devops',
    Desc: '14 Courses '
  }]

const BOGOCourseListJson = ['DevOps', 'AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Docker & Kubernets', 'Python']

export {
  cluttersQueryJson, joinAffiliateJson, tramContentJson,
  courseFeedBackJSON, classFeedBackJSON, nurtuteToolsJSON,
  nurtureImgRightJSON, nurtureImgLeftJSON, coursesInfo, acuraData,
  QAArray, corporateTabContent, corporateTraining, marketingFlowArr,
  aboutUsMatrix, instructorFlowArray,
  instructorQAArray, instructorTabContent, homePageCounter, homePage,
  referalJSON, referralFAQs, BOGOCourseListJson, courseCSS, marketcards
}
