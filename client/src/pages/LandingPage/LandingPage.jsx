import Navbar from "../../components/Navbar/Navbar";
import "./landingPage.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  aboutus1,
  aboutus2,
  blob1,
  heroImage,
  tick,
} from "../../assets/landingPage/index.js";
import Card from "../../components/Card/Card";
import {
  coreValues,
  beneficiaries,
  corporates,
  educationalInstitutions,
  socialOrgos,
  students,
  text1,
  text2,
  text3,
  text4,
} from "../../constants";
import PartnerCard from "../../components/PartnerCard/PartnerCard";
import { Carousel } from "react-responsive-carousel";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TextAndImage from "../../components/TextAndImage/TextAndImage";
import Title from "../../components/Title/Title";
import Question from "../../components/Question/Question";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <Navbar />
      <Header />

      {/* blob1 */}
      <img className="leftblob" src={blob1} alt="" />
      <img className="rightblob" src={blob1} alt="" />
      <img className="rightblob2" src={blob1} alt="" />

      {/* hero */}
      <div className="hero">
        <div className="heroContainer">
          <div className="left">
            <span>
              &quot;A Social startup helping students discover their full
              Potential&quot;
            </span>
          </div>
          <div className="right">
            <img src={heroImage} alt="" />
          </div>
        </div>
      </div>

      {/* core values */}
      <div className="coreValues">
        <div className="coreValuesContainer">
          {/* titles */}
          <div className="titleContainer">
            <Title text="Core Values" />
            <span className="subTitle">
              <h4>Collaboration</h4>
              <p>
                {" "}
                We believe in the power of working together, breaking down
                silos, and fostering connections that transcend boundaries
              </p>
              <h4>Empathy</h4>
              <p>
                We approach our work with empathy, understanding the diverse
                needs and perspectives of the people, organizations and
                communities we serve.
              </p>
              <h4>Lasting Impact</h4>
              <p>
                We are driven by a commitment to creating change that endures,
                leaving a positive mark on society that extends far into the
                future
              </p>
            </span>
          </div>

          {/* card */}
          <div className="cardContainer">
            {coreValues.map((coreValue) => (
              <Card
                key={coreValue.img}
                img={coreValue.img}
                title={coreValue.title}
                text={coreValue.text}
              />
            ))}
          </div>
        </div>
      </div>

      {/* video */}
      <div className="videoSection">
        <div className="videoSectionContainer">
          {/* title */}
          <div className="titleContainer">
            <Title text="We are the Trailblazers of Innovation. We are ImpactShaala" />
          </div>

          {/* video placeholder */}
          <div className="videoPlaceholder"></div>
        </div>
      </div>

      {/* before about us */}
      <div className="beforeAboutUs">
        <div className="beforeAboutUsContainer">
          <TextAndImage
            title={"Learn explore and build your future"}
            text1={text1}
            text2={text2}
            image={aboutus1}
          />
          <TextAndImage
            title="What We are Building & Why...."
            text1={text3}
            text2={text4}
            image={aboutus2}
            reverse={"reverse"}
          />
        </div>
      </div>

      {/* about us */}
      <div className="aboutus" id="about-us">
        <div className="aboutusContainer">
          <div className="titleContainer">
            <div className="titleWrapper">
              <div className="line"></div>
              <span className="title">About Us</span>
            </div>
            <div className="textContainer">
              <div>
                {/* Impactshaala was founded by Pratap Sonkar in the year 2022, who
                saw the need for a more inclusive and responsive education
                system that could support the development of a stronger and more
                equitable society */}
                <h2>Our Purpose</h2>
                <p>
                  In 2022, we founded Impactshaala with a simple yet profound
                  mission: "Bringing people together for the greater and common
                  good." We are passionate believers in the power of
                  collaboration as the solution to society's challenges. We are
                  not just building a company, We are attempting to build a good
                  and better world through our initative.{" "}
                </p>
                <p>
                  Our purpose is to serve as a catalyst for positive change. We
                  strive to create a world where collaboration knows no bounds,
                  where educational knowledge and resources are shared
                  generously, and where every individual, community, and
                  organization is empowered to make a lasting impact on society.
                  We are dedicated to nurturing a culture of responsibility,
                  empathy, and innovation, to build a brighter, more equitable
                  future for all.
                </p>
                <h2>Our Vision</h2>
                <p>To create a world with less problems</p>
                <h2>Our mission</h2>
                <p>
                  To create a world of limitless collaboration and equitable
                  education by empowering individuals, organizations and
                  communities to create a lasting societal impact.
                </p>
                <p className="highlighted-about-us">
                  We are more than just a platform; we are a catalyst for
                  change, a hub for collaboration, and a gateway to a world of
                  possibilities.
                </p>
              </div>
            </div>
          </div>

          <div className="threequestions">
            <Question question={"What are we?"} position={"start"} />
            <Question question={"Who are we?"} position={"middle"} />
            <Question question={"How?"} position={"end"} />
          </div>
        </div>
      </div>

      {/* beneficiaries */}
      <div className="beneficiaries" id="benificiariesandpartners">
        <div className="beneficiariesContainer">
          <div className="titleContainer">
            <Title text="Beneficiaries" />
            <div className="textContainer">
              <span>
                Lorem ipsum dolor sit amet consectetur,Qorem ipsum dolor sit
                amet consectetur
              </span>
            </div>
          </div>

          {/* checks */}
          <div className="benificiaryNamesContainer">
            {beneficiaries.map((beneficiary) => (
              <div className="beneficiaryNames" key={beneficiary}>
                <img src={tick} alt="" />
                <span>{beneficiary}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* partners */}
      <div className="partners">
        <div className="partnersContainer">
          <div className="titleContainer">
            <div className="titleWrapper">
              <div className="line"></div>
              <span className="title">Partners With Us</span>
            </div>
          </div>

          <div className="partnerCardContainer">
            <PartnerCard
              list={educationalInstitutions}
              title="Educational Institutions"
            />
            <PartnerCard list={students} title="Students" />
            <PartnerCard list={corporates} title="Corporates" />
            <PartnerCard list={socialOrgos} title="Social Organisations" />
          </div>
        </div>
      </div>

      {/* blog */}
      <div className="blog" id="blog">
        <div className="blogContainer">
          <div className="titleContainer">
            <Title text={"Blog"} />
            <div className="textContainer">
              <div>
                <p> How Impactshaala Works - How to use it efficiently </p>
                <p>Credit Score Detailing</p>
              </div>
            </div>
          </div>
          <div className="carouselContainer">
            <div className="carouselWrapper">
              <Carousel className="carousel" autoPlay>
                <div>
                  <img src="https://picsum.photos/200/200" alt="" />
                </div>
                <div>
                  <img src="https://picsum.photos/200/200" alt="" />
                </div>
                <div>
                  <img src="https://picsum.photos/200/200" alt="" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
