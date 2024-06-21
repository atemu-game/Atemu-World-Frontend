import React from 'react';
import { UserWalletProps } from '..';

import DespositDeployAccount from './DespositDeployAccount';
import DespositMoneyAccount from './DespositMoneyAccount';
interface IProps {
  userWallet: UserWalletProps;
  refetchBalance: () => void;
  refetchWallet: () => void;
}
const DespositAccount = ({
  userWallet,
  refetchBalance,
  refetchWallet,
}: IProps) => {
  return (
    <>
      {userWallet.deployHash ? (
        <DespositMoneyAccount
          userWallet={userWallet}
          refetchBalance={refetchBalance}
        />
      ) : (
        <DespositDeployAccount
          userWallet={userWallet}
          refetchWallet={refetchWallet}
        />
      )}
    </>
  );
};

export default DespositAccount;
