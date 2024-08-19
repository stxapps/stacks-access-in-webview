import { createAccount, restoreAccount, chooseAccount } from './apis/wallet';

export const walletCreateAccount = async (appData) => {
  return createAccount(appData);
};

export const walletRestoreAccount = async (appData, secretKey) => {
  return restoreAccount(appData, secretKey);
};

export const walletChooseAccount = async (walletData, accountIndex) => {
  return chooseAccount(walletData, accountIndex);
};
