import React from 'react';
import Image from 'next/image';
import styles from '../styles/WhyChooseSection.module.css';
import { FaArrowRight } from 'react-icons/fa';

const WhyChooseSection = () => {
  const reasons = [
    {
      title: 'Professional Results',
      description: 'Get studio-quality photos with our advanced lighting and camera setup. Perfect for every occasion.'
    },
    {
      title: 'Easy Setup',
      description: 'Quick and simple setup process with our user-friendly interface. No technical expertise required.'
    },
    {
      title: 'Customizable',
      description: 'Choose from a variety of themes and customize your photo booth to match your event style.'
    },
    {
      title: '24/7 Support',
      description: 'Our dedicated support team is always ready to help you with any questions or issues.'
    }
  ];

  return (
    <section className={styles.whyChooseSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <h2 className={styles.sectionTitle}>Why Choose <span className="hover-text">PhotoBooth Pro</span>
            <style jsx>{`
            .hover-text {
                background: linear-gradient(130deg, red, orange, yellow, green, blue, indigo, violet);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
                display: inline-block;
            transition: transform 0.4s ease, background 0.6s ease;
            }

            .hover-text:hover {
                background: linear-gradient(130deg, violet, indigo, blue, green, yellow, orange, red);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            `}</style>
            </h2>
            <p className={styles.sectionDescription}>
              Discover why thousands of event planners and businesses trust PhotoBooth Pro for their special moments.
              Our premium photo booth solution offers unmatched quality, reliability, and customer satisfaction.
            </p>

            <div className={styles.reasonsList}>
              {reasons.map((reason, index) => (
                <div key={index} className={styles.reasonPoint}>
                  <div className={styles.pointIcon}>
                    <FaArrowRight className={styles.arrowIcon} />
                  </div>
                  <div className={styles.reasonContent}>
                    <h3>{reason.title}</h3>
                    <p>{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.imageContent}>
            <Image
              src="/images/whychoose.png"
              alt="Professional PhotoBooth Setup"
              width={800}
              height={600}
              priority
              className={styles.photoboothImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
