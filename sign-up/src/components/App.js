import React, { useState, useEffect } from 'react';

import SignUp from './SignUp';

const App = () => {
  const [signUpProps, setSignUpProps] = useState(null);

  const onPopupCloseBtnClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:signUpPopup:false');
    }
  };

  const onSignInBtnClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:signInPopup:true');
    }
  };

  const onGetSecretKeyBtnClick = (viewId, data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:viewId&walletData:' + viewId + ':' + JSON.stringify(data));
    }
  };

  const onUpdateViewIdBtnClick = (data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:viewId:' + data);
    }
  };

  const onBackedUpBtnClick = (data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('update:userData:' + JSON.stringify(data));
    }
  };

  const updateSignUpProps = (domainName, appName, appIconUrl, appScopes, viewId, walletData) => {
    setSignUpProps({
      domainName, appName, appIconUrl, appScopes: appScopes.split(','),
      viewId: parseInt(viewId, 10),
      walletData: walletData ? JSON.parse(walletData) : null,
    });
  };

  useEffect(() => {
    window.StacksAccessSignUp = { updateSignUpProps };

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('editor:isReady:true');
    }
  }, []);

  if (!signUpProps) return null;

  const { domainName, appName, appIconUrl, appScopes, viewId, walletData } = signUpProps;

  return (
    <SignUp domainName={domainName} appName={appName} appIconUrl={appIconUrl} appScopes={appScopes} viewId={viewId} walletData={walletData} onPopupCloseBtnClick={onPopupCloseBtnClick} onSignInBtnClick={onSignInBtnClick} onGetSecretKeyBtnClick={onGetSecretKeyBtnClick} onUpdateViewIdBtnClick={onUpdateViewIdBtnClick} onBackedUpBtnClick={onBackedUpBtnClick} />
  );
};

export default React.memo(App);
