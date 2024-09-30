import './BackToTopStyle.css';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

// Variants for animation
const buttonVariants = {
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.1,
    rotate: 15,
    transition: { type: 'spring', stiffness: 300, damping: 10 }
  }
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className="back-to-top-button"
      variants={buttonVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      whileHover="hover"
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </motion.div>
  );
};

export default BackToTop;
