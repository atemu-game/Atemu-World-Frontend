import { useWalletContext } from '@/providers/ProviderContext';

import React from 'react';
import AccountJazzicon from '../Avatar/AvatarJazzicon';
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import CopyClipBoard from '../CopyClipboard/CopyClipBoard';
import { ellipseMiddle } from '@/utils/formatAddress';

// Profile Account After Connected
const ProfileAccount = () => {
  const { address } = useWalletContext();
  return (
    <>
      {address && (
        <Menu variant="profile" placement="bottom-end" closeOnSelect={false}>
          <MenuButton
            as={Button}
            variant="primary"
            rightIcon={
              <AccountJazzicon
                address={address}
                sx={{
                  height: '2rem',
                  width: '2rem',
                }}
              />
            }
          >
            <Box>1000 PTS</Box>
          </MenuButton>
          <MenuList minW="450px">
            <HStack my={6}>
              <AccountJazzicon
                address={address}
                sx={{
                  height: '3rem',
                  width: '3rem',
                }}
              />
              <Text>{ellipseMiddle(address, 10, 10)}</Text>
              <CopyClipBoard
                context={address}
                aria-label="Copy Current Address"
              />
            </HStack>
            <MenuItem>
              <Text>Account Information</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};
// Account Information
// Profile Setting
// Language
// Logout
export default ProfileAccount;
