import React from 'react';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center pt-5">
      {[1, 2, 3].map((el, i) => (
        <div key={i} className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ))}
    </div>
  );
};

export default Spinner;
