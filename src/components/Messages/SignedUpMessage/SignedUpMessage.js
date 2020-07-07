import React from 'react';

/* A confirmation message to be displayed after successfully signing out */
const SignedUpMessage = () => {
  return (
    <div className='signed-up-message'>
      <h3 style={{ display: 'inline' }}>
        You have successfully created an account!
      </h3>
    </div>
  );
};

export default SignedUpMessage;
