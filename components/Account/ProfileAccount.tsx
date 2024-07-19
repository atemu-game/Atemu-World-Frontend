import React, { useEffect } from 'react';
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
  Skeleton,
  Text,
} from '@chakra-ui/react';
import CopyClipBoard from '../CopyClipboard/CopyClipBoard';

import LinkIcon from '@/public/assets/icons/link.svg';
import SettingIcon from '@/public/assets/icons/setting.svg';

import QuestIcon from '@/public/assets/icons/quest.svg';
import LogoutIcon from '@/public/assets/icons/logout.svg';
import { ellipseMiddle } from '@/utils/formatAddress';

import { useAuth } from '@/hooks/useAuth';
import { useBalanceCustom } from '@/hooks/useBalanceCustom';
import { Contract, Provider, cairo } from 'starknet';
import { ABIS } from '@/abis';
import { CONTRACT_ADDRESS } from '@/utils/constants';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';
import systemConfig from '@/config/systemConfig';

const ProfileAccount = () => {
  const { userAddress, disconnectWallet } = useAuth();
  const { balance, isLoading } = useBalanceCustom({
    address: userAddress,
    token: CONTRACT_ADDRESS.ETH,
  });
  const { handleSetPoint, point } = useCreatorAccount();

  useEffect(() => {
    const getUserPoint = async (userAddress: string) => {
      const contractBlizt = new Contract(
        ABIS.bliztABI,
        CONTRACT_ADDRESS.BLIZT_POINT,
        new Provider({ nodeUrl: systemConfig().RPC })
      );

      const data = await contractBlizt.getUserPoint(userAddress);
      const fomatPoint = Number(cairo.uint256(data).low.toString());
      handleSetPoint(fomatPoint);
    };

    if (userAddress) {
      getUserPoint(userAddress);
    }
  }, [userAddress]);
  return (
    <>
      <Button
        variant="primary"
        display={{
          base: 'none',
          md: 'inline-flex',
        }}
      >
        {isLoading ? (
          <Skeleton>00.000</Skeleton>
        ) : (
          <>{balance ? balance.toFixed(3) : '0'} ETH</>
        )}
      </Button>
      <Button variant="primary">{point} points</Button>
      {userAddress && (
        <Menu variant="profile" placement="bottom-end" closeOnSelect={false}>
          <MenuButton as={Button} variant="primary">
            {userAddress && ellipseMiddle(userAddress, 5, 5)}
          </MenuButton>
          <MenuList minW="300px">
            <Box
              px={4}
              py={5}
              style={{
                border: '2px solid transparent',
                borderImageSlice: 2,
                borderImageSource: ` linear-gradient(90.73deg, rgba(232, 183, 124, 0.5) -5.34%, rgba(253, 217, 105, 0.5) 51.67%, rgba(178, 113, 34, 0.5) 116.05%)`,
              }}
            >
              <HStack my={6} color="primary.100">
                <AccountJazzicon
                  address={userAddress}
                  sx={{
                    height: '3rem',
                    width: '3rem',
                  }}
                />
                <Text>{ellipseMiddle(userAddress, 10, 10)}</Text>
                <CopyClipBoard
                  context={userAddress}
                  aria-label="Copy Current userAddress"
                />
              </HStack>
              <MenuItem
                display={{
                  base: 'block',
                  md: 'none',
                }}
              >
                {/* <Button
                variant="primary"
                sx={{
                  borderColor: 'secondary.100',
                }}
              >
                Invite
              </Button> */}
              </MenuItem>
              <MenuItem
                display={{
                  base: 'block',
                  md: 'none',
                }}
                as={Button}
              >
                {/* <Button variant="primary" rightIcon={<Icon as={StarkNetIcon} />}>
                100
              </Button> */}
              </MenuItem>
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
              <MenuItem
                onClick={() => {
                  disconnectWallet();
                }}
              >
                <Icon as={LogoutIcon} />
                <Text>Disconnect</Text>
              </MenuItem>
            </Box>
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
