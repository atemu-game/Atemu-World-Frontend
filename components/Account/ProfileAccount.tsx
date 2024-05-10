import { useWalletContext } from '@/providers/ProviderContext';
import React from 'react';

// Profile Account After Connected
const ProfileAccount = () => {
  const { address } = useWalletContext();
  return <div>ProfileAccount</div>;
};

export default ProfileAccount;
