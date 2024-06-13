import React from 'react';
import { UserWalletProps } from '..';

import DespositDeployAccount from './DespositDeployAccount';
import DespositMoneyAccount from './DespositMoneyAccount';
interface IProps {
  userWallet: UserWalletProps;
  refetchBalance: () => void;
}
const DespositAccount = ({ userWallet, refetchBalance }: IProps) => {
  return (
    <>
      {userWallet.deployHash ? (
        <DespositMoneyAccount
          userWallet={userWallet}
          refetchBalance={refetchBalance}
        />
      ) : (
        <DespositDeployAccount userWallet={userWallet} />
      )}
    </>
  );
};

export default DespositAccount;
