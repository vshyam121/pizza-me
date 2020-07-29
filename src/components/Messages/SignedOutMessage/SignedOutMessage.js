import React from 'react';

/* A confirmation message to be displayed after successfully signing out */
const SignedOutMessage = () => {
  return (
    <div className='signed-out' data-test='signed-out'>
      <h3 style={{ display: 'inline' }}>You have signed out!</h3>
    </div>
  );
};

export default SignedOutMessage;
