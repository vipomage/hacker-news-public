import React from 'react';

export default function ErrorComponent(error = 'Something went wrong.') {
  return (
    <div className="error-wrapper">
      <p>{error}</p>
    </div>
  );
}
