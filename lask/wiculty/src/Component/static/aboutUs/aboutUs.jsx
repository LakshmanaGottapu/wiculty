import {
  faBook,
  faBullhorn,
  faHandsHelping
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,
{ Component }
  from 'react';
import CountUp from 'react-countup';
import TagManager from 'react-gtm-module';
import { Link } from 'react-router-dom';
import
{
  Col,
  Container,
  Row,
  Modal,
  Button
}
  from 'reactstrap';
import InfiniteCarousel from 'react-leaf-carousel';
import SeoContentComp from '../../common/seoContentComp';
import { scrollIntoView } from '../../common/utilFunctions/utilFunction';
import { IMAGES } from '../../locales/images';
import { aboutUsMatrix, marketingFlowArr } from '../../staticJson';
import './aboutUs.scss';
import '../../marketingtag/marketing.scss';

const tagManagerArgs = {
  dataLayer: {
    userProject: 'Wiculty',
    page: 'About Us',
    url: window.location.href
  },
  dataLayerName: 'PageDataLayer'
};

const team = [
  {
    name: 'Devanand',
    title: 'Director Product Management',
    qualification: 'B.Tech - Electrical Engineer',
    image: 'https://fresherslabs-images.s3.amazonaws.com/fl-emp/Devand.png',
    desc: 'A Strong tech soul with a fine-tuned expertise of building successful products tailored with his spark tunnel source of solutions building & instant Ideation capabilities from his own repository of ideas. Venkat  is a full stack product evangelist, who can build great teams and deliver great products.he holds 18+ years of experience in various leadership roles including SAP with several other footsteps as an entrepreneur in setting up his own tech startups in delivering enterprise software products for cloud, mobile, web, business process management & business rules management.A deep-diver in strategizing & monitoring the alignments of every business units to pick up its seamless process through his dynamical ability of forecasting the end-to-end business - Into weaving Wiculty’s fabric with his loom mastery in successful ventures.'
  },
  {
    name: 'Nageswara Rao P',
    title: 'Founder & CEO',
    qualification: 'B.tech - Computer Science',
    image:
      'https://fresherslabs-images.s3.amazonaws.com/fl-emp/NageswaraRao.png',
    desc: 'He was a storyshift character of a successful techie & DevOps evangelist turned Edu-enthusiast & Visionary, His vanes showed the direction of his innate passion into training & education,Mr. Nagesh holds more than 14+ years of experience in DevOps with deep-rooted professional pitches in Walmart labs,NetApp etc.as Senior Architect,Process builder & SME managing huge global teams and multi clientele base in DevOps projects across the globe.His strong zeal & perseverance has pushed him into building several successful training ventures including the recent new child into the family - Wiculty. His works are highly centered towards his foreseeable goals of bringing a better change in the edtech industry, as a proud “trainer” & the Source creator of future paths to step in ahead by strongly utilizing his virtue of upgraded thinking in building business and weaving the network of e-learning enthusiasts to spell magic'
  },
  {
    name: 'Prasoon Bhushan',
    title: 'Business Development & Sales Manager',
    qualification: 'B.Tech - Mechanical',
    image: 'https://fresherslabs-images.s3.amazonaws.com/fl-emp/Prasoon.png',
    desc: `Prasoon Strongly believes that only technology can help each individual to learn and earn thus increasing their livelihood. He comes with the diversified experience of Business Management and having a rich knowledge of the startup ecosystem, previously he was heading the Sales with one of the Ed-tech startup. An entrepreneur at heart believes in continuous improvement and stay aligned with the organization's vision, mission and goals. He is a problem solver, loves to simplify every situation especially when it comes to Business. He always believes in adding the growth-oriented mindset in his team, he is the most helpful person and there to support everyone in the organisation. 

    Prasoon is ardent about building a rock-star team and actively involved in defining the robust process which can enable the organization and individuals to run smoothly. He is a big fan of Mr Ratan Tata always watch and read about him whenever he gets time, A fitness freak you can find him in the Badminton court in his leisure time. Prasoon is very much passionate about creating a sustainable business ecosystem, by adding value to the customers. Always up for travelling, has travelled to many places across the country.`
  },
  {
    name: 'Aashrith S Bharadwaj',
    title: 'Team Lead - Sales',
    qualification: 'B.Tech - Electronics & Communication',
    image: 'https://wiculty-assets.s3.amazonaws.com/team/aashrith.jpg',
    desc: 'Aashrith is a technology enthusiast, with over 3+ years of experience in sales in diverse verticals. He not only understands business but is also extremely skilled in analytics, data management, and reporting. His empathy for clients and negotiation skills also add to his outright amazing sales pitches. He has a knack for building a strong rapport with the team and always there to help anyone in need. His product knowledge is an add on to his training skills to help one understand in the simplest and easiest way possible. He believes that learning never stops and that there`s always an opportunity to learn something new.'
  },
  {
    name: 'Jeyan Paul',
    title: 'Business & Growth Strategist',
    qualification:
      'B.E - Electronics, M.B.A - Marketing, Branding & Advertisement',
    image: 'https://fresherslabs-images.s3.amazonaws.com/fl-emp/Jeyan.png',
    desc: 'An ardent design thinker with a sheer approach towards developing business strategies and growth hacks with the strong fumes of business/digital psychology with International standards. He always drags his own work style with customer psychology, design thinking, contemporary contents & sketches,brain mapping to derive best intuitive strategies. Covered the vast area of Ideation to monetization and corporate communication handles of Wiculty from the scratch. Jeyan handled product ideation, prototype development, branding, content/video marketing, sales trance pitching - connecting the potential walls of customer perception via digital arts to the business. He is a Groom-buoyancy of new ideas via his thought leadership and a multi-faceted music artist, Born Adrenaline junkie and travel/trek enthusiasts.'
  },
  {
    name: 'Manoj Kumar',
    title: 'Digital Marketing & Lead Generation Analyst',
    qualification: 'B.Tech CSE, Lovely Professional University (LPU)',
    image: 'https://fresherslabs-images.s3.amazonaws.com/fl-emp/Manoj.png',
    desc: 'A charismatic marketer with experience extending in digital strategy, insights, brand management, and analysis. He has effectively implemented a marketing plan, including content management, SEO, SEM, SMM, and SMO. Also feathered with skills in content creation, web technologies, technical analysis, and team management. He holds command over 20+ marketing tools with optimally utilizing them for the brand and user-base growth. He holds expertise in attracting growth and brand recognition with optimal marketing strategies cordially tossed with technical understandings. Well-nurtured with the startup ecosystem and always centered with a goal to drag startups and make them a brand. He is an ardent believer in implementing organic strategies for brand development and growth graph.'
  },
  {
    name: 'Afrid Pasha B S',
    title: 'Digital Marketing Associate',
    qualification: 'B.Tech - Mech, Masters in Digital Marketing',
    image: 'https://fresherslabs-images.s3.amazonaws.com/fl-emp/Afrid.png',
    desc: 'A tender and a sound digital marketer possessed with high energy of new marketing ideas to tap the brand to visible arenas digitally over the online space. He started evolving himself in exploring several nook of Wiculty with his team in digital marketing to add value to the business in this widespread e-learning market through his work forms in taking potential leaps into Keywords strategies, SEO,SEM,Content Marketing,Inbound Marketing,Branding, Website Creation, Google Adwords, Lead Nurturing,Email Marketing,Google Analytics, Social Media Marketing.etc. Still getting fueled up by our promising shouts ahead in the digital space - forecasted and tuned to get pushed as a team.'
  },
  {
    name: 'Ramya.M',
    title: 'Lead Generation & Digital Marketing Associate',
    qualification: 'MBA-HR',
    image: 'https://wiculty-assets.s3.amazonaws.com/team/ramya.jpeg',
    desc: 'A self-starter individual with a drive for excellence is what I am. Having donned the roles of a customer relationship manager and customer retention officer for several years in my previous work experience with some of the leading banks and real estate corporates, I believe in keeping the customers needs and contexts at the forefront while solving a business problem. I have a strong desire to make meaning imbibing the growth mindset and not shying away from being curious at every transaction that I handle at work. Continuous learning is an important philosophy that I subscribe to and that has propelled me to face any challenge without fear and head-onAnd on the non-work side, I am a fun-loving and spirited person who loves cooking, traveling, and music'
  },
  {
    name: 'Chinmaya Kumar Padhy',
    title: 'Digital Marketing Consultant',
    qualification: 'MBA - Marketing & Operations',
    image: 'https://wiculty-assets.s3.amazonaws.com/team/chinmay.jpg',
    desc: 'A self-driven & result-oriented professional digital marketer loomed his passion of marketing with his strategic thinking on building the high affinity over his successful digital marketing campaigns with a gasp on his own team gestures towards his “Roll up my sleeves” fashion of executing his tasks. With his 4 years of experience, he highly mastered the PRO way of doing search engine marketing (SEM / PPC),Website optimization,Content Marketing, Inbound Marketing, Branding,SEO,Pay-per-click,Keyword strategies,Content management systems,Google Adwords,Google tag Manager,Google Analytics,Social Media Marketing, Affiliate Marketing,Lead distribution and CRM Systems,Marketing Automation,Email marketing,lead nurturing. A pure digital marketing accelerator tuned for dragging our growth.'
  },
  {
    name: 'Kavitha G',
    title: 'Sales and Business Development',
    qualification: 'B.tech - Computer Science',
    image: 'https://fresherslabs-images.s3.amazonaws.com/fl-emp/Kavitha.png',
    desc: 'Kavitha, A strong go-getter type of professional, building her power beans into e-learning sales with 3+ years of Experience, that drove her through several learning in lead sourcing, lead engagement, prospecting of new business opportunities for Wiculty. She holds the vibes of strong convincing skills and ability to build bridges to all customers showing her interpersonal engagement catering to the learning needs of customers with a unique mastery in negotiation skills - A long way to go spinning in the threads of Wiculty'
  },
  {
    name: 'Vamsi Priya',
    title: 'Lead HR & Trainer Acquisition',
    qualification: 'B.Tech - Electronics',
    image: 'https://wiculty-assets.s3.amazonaws.com/team/vamsi.jpg',
    desc: 'Ms.Vamsi Priya obli - Our Organizational router, who always takes wheelies in work bays to adhere to our issues/queries by resolving it instantly taking it forward to the management. She’s always a curiosity binded professional to update her inner brain charm,spinning along with the new updates,happening and new implementations in the world of Human resource professionals for making our organization a much better place to work ahead! She handles payroll management,talent acquisition,tax & audits,trainers on-boarding & management along with operational activities of Wiculty in full swing. Hosted several training & development sessions as part of team building - She never forgot to keep us creatively engaged during fridays with fun activities to burst out all our stress balloons “Colors and giggles beneath'
  },
  {
    name: 'Raghurami Reddy',
    title: 'TalentAcquisition-Executive',
    qualification: 'B.Tech - Mechanical Engineering',
    image: 'https://wiculty-assets.s3.amazonaws.com/team/raghu.jpg',
    desc: 'Raghu is good learner,Communicator and better conviencing skills, He is prominent in the process of identifying and acquiring skilled professionals  to meet  organizational needs'
  },
  {
    name: 'Vivek Kumar Singh',
    title: 'Tech Lead, Software Development',
    qualification: 'Masters in Computers',
    image: 'https://wiculty-assets.s3.amazonaws.com/team/vivek-dev.jpg',
    desc: 'Vivek kumar singh, who leads the Development has got a unique flair for cracking the business problems with his Solution-oriented and hands-on driven enthusiasm in adopting technologies to build any requirements from the business team to his desk,A pure utility player with his passion highly centered in the software Industry.He got a clean focus on creating collaborative efforts between business and engineering teams to implement the product level changes for the end user benefits,scaling up the usability. Highly experienced in team management,Architecture design,Cloud environment setup and application development. He is tight looped with his professionalism with a humorous touch on deliverance'
  },
  {
    name: 'Subramanyam Reddy',
    title: 'Sr Full-stack developer',
    qualification: 'B.Tech - Electrical',
    image: 'https://fresherslabs-images.s3.amazonaws.com/fl-emp/Subbhu.png',
    desc: 'Logically-soaked Professional with an unique notion over the Full stack development with his 5 years of experience,Subramanyam Reddy has pitched his dedicated work forms across emerging web technologies, product development  for mobile and consumer web applications by adding a sound code logics behind every bits of work assigned to him.His serious and ultimate passion for UI effects, animations and creating intuitive-dynamic user experience always enhanced the aesthetics of our application tailored with his ideology .Before Joining Wiculty,he worked with Fortune companies on some top projects to carry ahead that feel of cherish and support along with us.'
  },
  {
    name: 'Sasikanth D',
    title: 'Sr Full-stack developer',
    qualification: 'B.Tech - Computer Science',
    image: 'https://fresherslabs-images.s3.amazonaws.com/fl-emp/Sashi.png',
    desc: 'A vibrant self-taught developer carrying his heavy-pot with full of skills and no conceit,From  his 7 years of experience in building web and mobile applications,Sasikanath had developed a realm of ideas that embed him enough with user perception based UI development,he can work with any teams and also as solo handler purely driven by his own intuitive skills to cater the business requirement to its fullest result.Delivered a power-pack of 8 projects as a freelance developer prior to joining Wiculty & continued doing the same for our growth.'
  },
  {
    name: 'Anees Raveed Khan',
    title: 'Operations & QA Engineer',
    qualification: 'B.Tech - Computer Science',
    image: 'https://wiculty-assets.s3.amazonaws.com/team/anees.jpg',
    desc: 'A clarity-seeking test engineering professional, keen on observing and run several test cases over every builds with the obsession of bringing the bug-free product environment,Anees holds 4 years of experience in manual testing working on web applications,for mobile and desktop,he moves bit off track to understand the customer standpoint along the product usability always adding value to his testing tasks with dedication.His intuitive testing reports bring better idea to work further on a feature across our developmental cycle. A calm and productive resource who exactly fits into the bands of testing - Anees also holds an awesome DevOps skills,stretching it out in some of our implementations'
  },
  {
    name: 'K B Harsha Vardhan',
    title: 'Operations & QA Engineer',
    qualification: 'B.E - Computer Science Engineer - MBA',
    image: 'https://fresherslabs-images.s3.amazonaws.com/fl-emp/Harsha.png',
    desc: 'A technophile starts his career with Build and Release engineering professional, brings development and operations teams together to complete software development, keen on observing and Run builds with an obsession of bringing the bug-free product environment,His initiative Working reports bring better ideas to work further on a feature across our developmental cycle. Had a Good Knowledge in Scripts, Infrastructure knowledge & Soft Skills. Harsha holds 4 years of experience in Build & Release & Devops Engineer on web applications, A calm and productive resource who exactly fits into the Devops Role with Trending Tools'
  }
];
class AboutUs extends Component {
  constructor (props) {
    super(props);
    window.scroll(0, 0);
    TagManager.dataLayer(tagManagerArgs);
  }

  render () {
    return (
      <React.Fragment>
        <SeoContentComp seoKey="about-us" />
        <div className="aboutus-conatiner mb-0">
          <Row>
            <Col
              lg={{ size: 12 }}
              md={{ size: 12 }}
              xs={{ size: 12 }}
              className="p-0"
            >
              <div
                className="header-section"
                style={{
                  backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.ABOUTUS_BANNER})`
                }}
              >
                {/* <p>
                  <span className="fcr">
                    {'About Us'}
                  </span>
                </p> */}
              </div>
            </Col>
          </Row>
          <Container
            fluid
            className="p-0 m-0 text-white"
            style={{ background: '#272c48' }}
          >
            <Container>
              <Row className="pt-4">
                <Col sm="12">
                  <Row>
                    <Col
                      sm="12"
                      md="6"
                      className="flex justify-content-center flex-column text-left mb-4"
                    >
                      <Row>
                        <Col>
                          <h1>A New Fangled e-Learning Space</h1>
                        </Col>
                      </Row>
                      <Row className="content-gap">
                        <Col>
                          <p>
                            {`Our wisdom engine runs on the track of sculpting great techies across
                            the globe through our training program`}
                            <br />
                            {`Proudly entering into a new huge leap of steering our learners to high
                            skies!`}
                          </p>
                          <p>
                            {`Wiculty is one of the new-fangled e-learning company, with its
                            exclusive training potential & focused expertise in DevOps
                            andcloud-computing courses that fumes high demand in the job
                            market, concentrating much on learner’s engagement applying unique
                            mentor approach to help working professionals and students to grab a
                            great career share ahead!`}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          sm="12"
                          className="about-us-buttons mt-4 flex justify-content-between"
                        >
                          <button
                            type="button"
                            className="btn btn-md rounded-pill btn-theme-bordered"
                            onClick={() => scrollIntoView('#wiculty-team', 100)}
                          >
                            {'Our Team'}
                          </button>
                          <button
                            type="button"
                            className="btn btn-md rounded-pill btn-theme-bordered"
                            onClick={() => scrollIntoView('#wiculty-unipath', 100)
                            }
                          >
                            {'Unipath'}
                          </button>
                          <button
                            type="button"
                            className="btn btn-md rounded-pill btn-theme-bordered btn-theme"
                            onClick={() => scrollIntoView('#wiculty-matrix', 100)
                            }
                          >
                            {'Matrix'}
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="12" md="6" className="mb-4">
                      <img
                        src={IMAGES.ABOUTUS_SVG}
                        alt="About us"
                        className="img img-fluid"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Container>
          <Container>
            <Row className="section-gap">
              <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                <Row>
                  <Col sm="12">
                    <h2 className="text-center" style={{ color: '#ff6f00' }}>
                      {
                        'Our Market Standing is Still Growing at Great Pace in Shaping Tech Talents'
                      }
                    </h2>
                  </Col>
                  <Col sm="12" className="content-gap">
                    <Row className="about-us-marketing">
                      {
                        marketingFlowArr.map(flowItem => (
                          <Col
                            className="marketing-flow-item tac"
                            key={flowItem.count}
                          >
                            <div
                              className="card shadow-lg p-3 mb-5 bg-white rounded d-flex justify-content-center"
                              style={{ height: '170px' }}
                            >
                              <h5 className="mb-2 counter h2">
                                <CountUp end={flowItem.count} duration={5} />
                                {'+'}
                              </h5>
                              <p>{flowItem.desc}</p>
                            </div>
                          </Col>
                        ))
                      }
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Container fluid className="p-0 section-gap">
            <Container>
              <div>
                <Row id="wiculty-matrix">
                  <Row className="justify-content-center d-flex pt-4">
                    <Col sm="6">
                      <Row>
                        {aboutUsMatrix.map(item => (
                          <Col sm="6" className="p-2">
                            <div className="card shadow-lg p-4">
                              <div className="fa-icon-size">
                                <FontAwesomeIcon icon={item.icon} />
                              </div>
                              <h5 className="font-weight-normal">
                                {item.title}
                              </h5>
                              <p>{item.desc}</p>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col
                      sm="6"
                      className="align-items-center text-center mt-5 pt-5"
                    >
                      <h2>Wiculty Matrix</h2>
                      <p>A Wisdom concrete framework of our training model</p>
                      <p className=" d-flex">
                        {`Our strong idea of concept-planting with pure hands-on training to our learners
                          provides ultimate objective by meaningful learning adding value to time &
                          progression than forcing to get involved for the sake of finishing a course.`}
                      </p>
                    </Col>
                  </Row>
                </Row>
              </div>
            </Container>
          </Container>
          <Container>
            <Row className="section-gap" id="wiculty-unipath">
              <Col sm="12">
                <h2 className="text-center">Wiculty UNIPATH</h2>
              </Col>
              <Col sm="12" className="content-gap unipath-section">
                <div className="media hover-card-right p-4">
                  <FontAwesomeIcon
                    icon={faBullhorn}
                    className="align-self-center mr-3 fa-icon-size fa-icon-color"
                  />
                  <div className="media-body">
                    <h5 className="mt-0 bold">Art of Attention</h5>
                    <p>
                      {`Wiculty strongly pitches the idea of nurturing the art of attention that
                      eventually develop the trait within every learner, making their
                      purpose of learning effective till hitting the expert zone.`}
                    </p>
                  </div>
                </div>
                <div className="media hover-card-right p-4">
                  <div className="media-body">
                    <h5 className="mt-0 bold">Handling Attention Span</h5>
                    <p>
                      {`It’s a big challenge everyone faces during learning due to several
                      disturbances either visual or auditory, our approach finds the right
                      solution to resolve it with appropriate engagement channels to shape
                      the learning worth-going.`}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faHandsHelping}
                    className="align-self-center ml-3 fa-icon-size fa-icon-color"
                  />
                </div>
                <div className="media hover-card-right p-4">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="align-self-center mr-3 fa-icon-size fa-icon-color"
                  />
                  <div className="media-body">
                    <h5 className="mt-0 bold">Learner’s Engagement</h5>
                    <p>
                      {`We have loads to engage our learners in our LMS & study materials,
                      spraying the liveliness  & curiosity to learn! Get perished to attract
                      vibes of wisdom in Wiculty.`}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="container-fluid">
              <h2 className="text-center">Wiculty Team</h2>
              <InfiniteCarousel
                breakpoints={[
                  {
                    breakpoint: 500,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  }
                ]}
                showSides
                sidesOpacity={0.5}
                sideSize={0.1}
                slidesToScroll={3}
                slidesToShow={3}
                autoScroll
              >
                {team.map(member => (
                  <Col sm="12" className="mb-4">
                    <Row className="team-card">
                      <Col sm="12" md="12" className="profile-info p-0 m-0">
                        <Button
                          color="link"
                          className="px-2 py-0"
                        >
                          <div className="img-container image_include">
                            <img
                              src={member.image}
                              alt="Profile"
                              className="img"
                              style={{ height: '400px' }}
                            />
                          </div>
                          <div className="info-title mt-2 text-center centered">
                            <strong>{member.name}</strong>
                            <p className="mt-2">{member.title}</p>
                            <p>{member.qualification}</p>
                          </div>
                        </Button>
                      </Col>
                      <Col sm="12" md="12" className="profile-about">
                        <div
                          className="modal fade bd-example-modal-lg"
                          tabIndex={-1}
                          role="dialog"
                          aria-labelledby="myLargeModalLabel"
                          aria-hidden="true"
                        >
                          <Modal size="lg" className="modal-white" scrollable>
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                                <p>{member.desc}</p>
                              </div>
                            </div>
                          </Modal>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                ))}
              </InfiniteCarousel>
            </div>
            <Row className="section-gap container-fluid" id="wiculty-team">
              <Col sm="12">
                <h2 className="text-center">Wiculty Team</h2>
              </Col>
            </Row>
            <Row className="section-gap join-us-section">
              <Col sm="12">
                <h2 className="text-center">
                  {'Become a proud piece of wizard pool @Wiculty'}
                </h2>
              </Col>
              <Col sm="12" className="content-gap">
                <p>
                  {
                    'Life at wiculty will be always intellectually imbibed, fun-driven, liquid motion work culture, catalyzing ambience to share your skills to the world gaining load from us in return! Absolutely it`s much of "Give and Take"'
                  }
                </p>
                <p className="mt-4">
                  {'Wanna join us an instructor? No second thought'}
                </p>
              </Col>
              <Col sm="12" className="mt-4 mb-4 text-center">
                <Link to="/instructor">
                  <button
                    type="button"
                    className="btn btn-theme-bordered btn-lg rounded-pill"
                  >
                    {'Join our team'}
                  </button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default AboutUs;
