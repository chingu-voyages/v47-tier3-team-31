import styles from './about.module.css';
import { Roboto_Flex } from 'next/font/google';
import Images from 'next/image';

const roboto = Roboto_Flex({
    subsets: ['latin'],
  });

const AboutUs = () => {
    return (
        <div className={roboto.className}>
            <section className={styles.aboutsection}>
                <div className={styles.showLeftImages}>
                    <h1 className={styles.whiteTitle}>ABOUT US</h1>
                    <div className={styles.imagesSubContainer}>
                        <div className={styles.images}>
                            <Images src={'/images/aboutus/eventpeople1.svg'} alt={'event1'} width={210} height={130}/>
                        </div>
                        <div className={styles.images}>
                            <Images src={'/images/aboutus/eventpeople2.svg'} alt={'event2'} width={210} height={130}/>
                        </div>
                        <div className={styles.images}>
                            <Images src={'/images/aboutus/eventpeople3.svg'} alt={'event3'} width={210} height={130}/>
                        </div>
                        <div className={styles.images}>
                            <Images src={'/images/aboutus/eventpeople4.svg'} alt={'event4'} width={210} height={130}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
