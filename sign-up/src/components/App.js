import React, { useState, useEffect } from 'react';

import SignUp from './SignUp';

const App = () => {
  const [signUpProps, setSignUpProps] = useState(null);

  const onPopupCloseBtnClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:SignUpPopup:false');
    }
  };

  const onSignInBtnClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:SignInPopup:true');
    }
  };

  const onBackedUpBtnClick = (data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('');
    }
  };

  const updateSignUpProps = (props) => {
    setSignUpProps(props);
  };

  useEffect(() => {
    window.stacksSignUp = { updateSignUpProps };
  }, []);

  if (!signUpProps) return null;

  const { domainName, appName, appIconUrl, appScopes } = signUpProps;

  return (
    <SignUp domainName={domainName} appName={appName} appIconUrl={appIconUrl} appScopes={appScopes} onPopupCloseBtnClick={onPopupCloseBtnClick} onSignInBtnClick={onSignInBtnClick} onBackedUpBtnClick={onBackedUpBtnClick} />
  );
};

export default React.memo(App);
