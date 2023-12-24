import '../components/css/CoolPopup.css';
import { useState, useEffect } from 'react';
const CoolPopup = ({ message }) => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={`cool-popup${showPopup ? ' active' : ''}`}>
      <div className="cool-popup-content">
        <span className="close" onClick={handleClosePopup}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CoolPopup;
