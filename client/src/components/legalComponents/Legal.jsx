import { legalData } from './data';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

const Legal = () => {
  const location = useLocation();

  const policyRef = useRef(null);
  const cookieRef = useRef(null);
  const termsRef = useRef(null);

  useEffect(() => {
    const scrollToSection = () => {
      const hash = location.hash;
      if (hash === '#privacy-policy' && policyRef.current) {
        policyRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#cookie-policy' && cookieRef.current) {
        cookieRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#terms-of-service' && termsRef.current) {
        termsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToSection();
  }, [location]);

  const renderSection = (sectionKey) => {
    const section = legalData[sectionKey];
    if (!section) return <p className="text-inputGrey">Section not found</p>;

    return (
      <section key={sectionKey} className="mb-8">
        <h1 className="text-3xl font-bold text-eGreen mb-4 font-Orbitron pb-4 border-b pt-4 border-mediumBlue">
          {section.heading}
        </h1>
        {section.sections.map((sec, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-eGreenDark mb-2 font-Roboto">
              {sec.subheading}
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {sec.content.map((point, i) => (
                <li key={i} className="text-inputGrey leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    );
  };

  return (
    <div
      className="flex justify-center min-h-screen py-10 px-4"
      id="legal-page"
    >
      <div className="bg-darkBlue shadow-lg rounded-lg p-8 text-inputGrey w-full max-w-4xl">
        <div id="privacy-policy" ref={policyRef}>
          {renderSection('privacyPolicy')}
        </div>
        <div id="cookie-policy" ref={cookieRef}>
          {renderSection('cookiePolicy')}
        </div>
        <div id="terms-of-service" ref={termsRef}>
          {renderSection('termsOfService')}
        </div>
      </div>
    </div>
  );
};

export default Legal;
