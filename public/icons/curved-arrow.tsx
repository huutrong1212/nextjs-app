import React from 'react';

const CurvedArrowIcon: React.FC = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_421_2992" maskUnits="userSpaceOnUse" x="0" y="-1" width="20" height="21">
        <rect y="-0.000488281" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask={`url(#mask0_421_2992)`}>
        <path
          d="M7.97913 9.99951L4.16663 6.16618L5.33329 4.99951L10.3333 9.99951L5.33329 14.9995L4.16663 13.8328L7.97913 9.99951ZM13.4791 9.99951L9.66663 6.16618L10.8333 4.99951L15.8333 9.99951L10.8333 14.9995L9.66663 13.8328L13.4791 9.99951Z"
          fill="#353636"
        />
      </g>
    </svg>
  );
};

export default CurvedArrowIcon;
