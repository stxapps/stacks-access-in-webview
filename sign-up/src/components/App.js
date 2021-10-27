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
      window.ReactNativeWebView.postMessage('update:UserData:' + JSON.stringify(data));
    }
  };

  const updateSignUpProps = (domainName, appName, appIconUrl, appScopes) => {
    setSignUpProps({ domainName, appName, appIconUrl, appScopes: appScopes.split(',') });
  };

  useEffect(() => {
    window.StacksAccessSignUp = { updateSignUpProps };

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('editor:isReady:true');
    }
  }, []);

  if (!signUpProps) return null;

  const { domainName, appName, appIconUrl, appScopes } = signUpProps;

  return (
    <SignUp domainName={domainName} appName={appName} appIconUrl={appIconUrl} appScopes={appScopes} onPopupCloseBtnClick={onPopupCloseBtnClick} onSignInBtnClick={onSignInBtnClick} onBackedUpBtnClick={onBackedUpBtnClick} />
  );
};

export default React.memo(App);
