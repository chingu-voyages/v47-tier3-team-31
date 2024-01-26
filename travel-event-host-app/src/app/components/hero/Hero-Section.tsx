import Image from 'next/image';
import './style.css';

export const HeroSection = () => {
  return (
    <div>
      <div className='crowd-image-container'>
        <Image src='/images/hero/crowd.svg' alt='crowd' className='crowd-image' fill />
        <div className='overlay-area'>
          <div className='overlay-content-container sm:mt-10 lg:mt-44'>
            <div className='header-container'>
              <p className='font-bold hero-text-header text-1xl sm:text-3xl lg:text-5xl'>
                Explore, Host, and Connect
              </p>
            </div>
            <div className='body-content-container flex mt-10'>
              <div className='passport-image-container'>
                {/* Image of passport goes here */}
                <Image
                  src='/images/hero/passport.svg'
                  alt='passport'
                  className='passport-image'
                  fill
                />
              </div>
              <div className='body-text-container ml-5 mr-3'>
                <p className='hero-text-body text-sm sm:text-2xl lg:text-4xl'>
                  Transform your travel experience with our Travel Event Host App.
                </p>
                <br></br>
                <p className='hero-text-body text-sm sm:text-2xl lg:text-4xl'>
                  Whether you're a local looking to showcase your city or a traveller seeking unique
                  experiences, we've got you covered.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='cta-container'></div> */}
      </div>
    </div>
  );
};
