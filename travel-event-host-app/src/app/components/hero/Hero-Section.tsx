import Image from 'next/image';
import styles from './hero-section.module.css';

export const HeroSection = () => {
  return (
    <div>
      <div className={styles.crowdImageContainer}>
        <Image src='/images/hero/crowd.svg' alt='crowd' className={styles.crowdImage} fill />
        <div className={styles.overlayArea}>
          <div className={styles.overlayContentContainer}>
            <div className='headerContainer'>
              <p className='heroTextHeader font-bold text-1xl sm:text-3xl lg:text-5xl'>
                Explore, Host, and Connect
              </p>
            </div>
            <div className={styles.bodyContentContainer}>
              <div className={styles.passportImageContainer}>
                {/* Image of passport goes here */}
                <Image
                  src='/images/hero/passport.svg'
                  alt='passport'
                  className={styles.passportImage}
                  fill
                />
              </div>
              <div className='bodyTextContainer ml-5 mr-3'>
                <p className='heroTextBody text-sm sm:text-2xl lg:text-4xl'>
                  Transform your travel experience with our Travel Event Host App.
                </p>
                <br></br>
                <p className='heroTextBody text-sm sm:text-2xl lg:text-4xl'>
                  Whether you're a local looking to showcase your city or a traveller seeking unique
                  experiences, we've got you covered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
