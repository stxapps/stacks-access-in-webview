import React, { useState, useEffect } from 'react';

import SignIn from './SignIn';

const App = () => {
  const [signInProps, setSignInProps] = useState(null);

  const onPopupCloseBtnClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:signInPopup:false');
    }
  };

  const onSignUpBtnClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:signUpPopup:true');
    }
  };

  const onContinueBtnClick = (viewId, data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:viewId&walletData:' + viewId + ':' + JSON.stringify(data));
    }
  };

  const onChooseAccountBtnClick = (data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:userData:' + JSON.stringify(data));
    }
  };

  const updateSignInProps = (domainName, appName, appIconUrl, appScopes, viewId, walletData) => {
    setSignInProps({
      domainName, appName, appIconUrl, appScopes: appScopes.split(','),
      viewId: parseInt(viewId, 10),
      walletData: walletData ? JSON.parse(walletData) : null,
    });
  };

  useEffect(() => {
    window.StacksAccessSignIn = { updateSignInProps };

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('editor:isReady:true');
    }
  }, []);

  if (!signInProps) return null;

  const { domainName, appName, appIconUrl, appScopes, viewId, walletData } = signInProps;

  return (
    <SignIn domainName={domainName} appName={appName} appIconUrl={appIconUrl} appScopes={appScopes} viewId={viewId} walletData={walletData} onPopupCloseBtnClick={onPopupCloseBtnClick} onSignUpBtnClick={onSignUpBtnClick} onContinueBtnClick={onContinueBtnClick} onChooseAccountBtnClick={onChooseAccountBtnClick} />
  );
};

export default React.memo(App);
