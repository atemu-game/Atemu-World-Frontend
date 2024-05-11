import { useWalletContext } from '@/providers/ProviderContext';
import React from 'react';
import AccountJazzicon from '../Avatar/AvatarJazzicon';
import {
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import CopyClipBoard from '../CopyClipboard/CopyClipBoard';

import LinkIcon from '@/public/assets/icons/link.svg';
import SettingIcon from '@/public/assets/icons/setting.svg';
import QuestIcon from '@/public/assets/icons/quest.svg';
import LogoutIcon from '@/public/assets/icons/logout.svg';
import { ellipseMiddle } from '@/utils/formatAddress';
// Profile Account After Connected
const ProfileAccount = () => {
  const { address, disconnectWallet } = useWalletContext();
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
          <MenuList minW="300px">
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
            <MenuItem isDisabled>
              <Icon as={SettingIcon} />
              <Text>Profile Setting</Text>
            </MenuItem>
            <MenuItem isDisabled>
              <Icon as={QuestIcon} />
              <Text>Quest Programs</Text>
            </MenuItem>
            <MenuItem isDisabled>
              <Icon as={LinkIcon} />
              <Text>Referral Link</Text>
            </MenuItem>
            <MenuItem onClick={disconnectWallet}>
              <Icon as={LogoutIcon} />
              <Text>Disconnect</Text>
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
