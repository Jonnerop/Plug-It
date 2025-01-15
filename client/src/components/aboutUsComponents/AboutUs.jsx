import { aboutUsData, howItWorksData, ourPartnersData, newsData } from './data';
import traffic from '../../assets/images/traffic.jpg';
import logos from '../../assets/images/charger-logos.png';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AboutUs = () => {
  const location = useLocation();

  const aboutUsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const ourPartnersRef = useRef(null);
  const newsRef = useRef(null);

  const introItems = howItWorksData.filter((item) => item.key === 1);
  const stepItems = howItWorksData.filter(
    (item) => item.key > 1 && item.key < 7
  );
  const outroItems = howItWorksData.filter((item) => item.key === 7);

  useEffect(() => {
    const scrollToSection = () => {
      const hash = location.hash;
      if (hash === '#about-us' && aboutUsRef.current) {
        aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#how-it-works' && howItWorksRef.current) {
        howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#our-partners' && ourPartnersRef.current) {
        ourPartnersRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#news' && newsRef.current) {
        newsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToSection();
  }, [location]);

  return (
    <div
      className="flex justify-center min-h-screen py-10 px-4"
      id="about-us"
      ref={aboutUsRef}
    >
      <div className="bg-darkBlue shadow-lg rounded-lg p-8 text-inputGrey">
        <img src={traffic} alt="Traffic image" className="pb-4"></img>
        {/* About Us Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-eGreen mb-4 font-Orbitron">
            About Us
          </h2>
          <p className="text-inputGrey leading-relaxed">{aboutUsData}</p>
        </section>

        {/* How It Works Section */}
        <section className="mb-8" id="how-it-works" ref={howItWorksRef}>
          <h2 className="text-3xl font-bold text-eGreen mb-4 font-Orbitron">
            How It Works
          </h2>
          {introItems
            .map((item) => (
              <div key={item.key} className="mb-6">
                <p className="text-inputGrey text-lg leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          <div className="mt-8">
            <ol className="list-decimal text-lg pl-4">
              {stepItems
                .map((item) => (
                  <li key={item.key} className="flex items-start">
                    <div className="text-eGreen font-bold text-xl">
                      {item.key - 1}.
                    </div>
                    <div className="flex flex-row space-x-4">
                      <p className="text-inputGrey leading-relaxed">
                        <span className="font-bold pl-1">{item.heading}</span>{' '}
                        {item.content}
                      </p>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
          {outroItems
            .map((item) => (
              <div key={item.key} className="mt-6">
                <p className="text-inputGrey text-lg leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
        </section>

        {/* Our Partners Section */}
        <section
          className="mb-8 flex items-center sm:flex-row flex-col"
          id="our-partners"
          ref={ourPartnersRef}
        >
          <div>
            <h2 className="text-3xl font-bold text-eGreen mb-4 font-Orbitron">
              Our Partners
            </h2>
            <p className="text-inputGrey leading-relaxed mb-4">
              {ourPartnersData[0]}
            </p>
            <ul className="list-disc list-inside text-inputGrey space-y-2 pl-4">
              {ourPartnersData.slice(1, 7).map((partner, index) => (
                <li key={index} className="font-bold">
                  {partner}
                </li>
              ))}
            </ul>
            <p className="text-inputGrey leading-relaxed mt-4">
              {ourPartnersData[7]}
            </p>
          </div>
          <img
            src={logos}
            alt="Charger logos"
            className="w-64 h-64 object-contain ml-16 mt-16 mr-8 hidden sm:block"
          ></img>
        </section>

        {/* News Section */}
        <section id="news" ref={newsRef}>
          <h2 className="text-3xl font-bold text-eGreen mb-4 font-Orbitron">
            News
          </h2>
          <ul className="space-y-6">
            {newsData.map((news) => (
              <li key={news.id} className="border-t pt-4 border-mediumBlue">
                <h3 className="text-xl font-semibold text-eGreen mb-2 font-Roboto">
                  <a href="#" className="hover:underline">
                    {news.heading}
                  </a>
                </h3>
                <p className="text-inputGrey leading-relaxed">{news.content}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
