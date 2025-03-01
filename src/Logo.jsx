import React from 'react';
//import NASLogo from './componets/images/NASLogo.png';
import nas4 from './componets/images/nas4.png';


function Logo({  className = '' }) {
  return (
    <div className={`flex  items-center justify-center ${className}`}>
      <img
        src={nas4}
        className={`w-56 h-28`} // This applies the dynamic width passed in as prop
        alt="Logo"
      />
    </div>
  );
}

export default Logo;
