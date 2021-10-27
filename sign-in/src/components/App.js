import React, { useState, useEffect } from 'react';

import SignIn from './SignIn';

const App = () => {
  const [signInProps, setSignInProps] = useState(null);

  const onPopupCloseBtnClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:SignInPopup:false');
    }
  };

  const onSignUpBtnClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:SignUpPopup:true');
    }
  };

  const onChooseAccountBtnClick = (data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:UserData:' + JSON.stringify(data));
    }
  };

  const updateSignInProps = (domainName, appName, appIconUrl, appScopes) => {
    setSignInProps({ domainName, appName, appIconUrl, appScopes: appScopes.split(',') });
  };

  useEffect(() => {
    window.StacksAccessSignIn = { updateSignInProps };

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('editor:isReady:true');
    }
  }, []);

  if (!signInProps) return null;

  const { domainName, appName, appIconUrl, appScopes } = signInProps;

  return (
    <SignIn domainName={domainName} appName={appName} appIconUrl={appIconUrl} appScopes={appScopes} onPopupCloseBtnClick={onPopupCloseBtnClick} onSignUpBtnClick={onSignUpBtnClick} onChooseAccountBtnClick={onChooseAccountBtnClick} />
  );
};

export default React.memo(App);
