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
  Skeleton,
  Text,
} from '@chakra-ui/react';
import CopyClipBoard from '../CopyClipboard/CopyClipBoard';

import LinkIcon from '@/public/assets/icons/link.svg';
import HistoryIcon from '@/public/assets/icons/history.svg';

import QuestIcon from '@/public/assets/icons/quest.svg';
import LogoutIcon from '@/public/assets/icons/logout.svg';
import { ellipseMiddle } from '@/utils/formatAddress';

import { useAuth } from '@/hooks/useAuth';
import { useBalanceCustom } from '@/hooks/useBalanceCustom';

import { CONTRACT_ADDRESS } from '@/utils/constants';
import { useCreatorAccount } from '@/hooks/useCreatorAccount';
import { useRouter } from 'next/navigation';
import ModalClaimPoint from '../InviteCode/ModalClaimPoint';

interface IProps {
  icon: any;
  text: string;
  isDisabled?: boolean;
  onClick?: () => void;
}
const ProfileAccount = () => {
  const { userAddress, disconnectWallet } = useAuth();
  const { balance, isLoading } = useBalanceCustom({
    address: userAddress,
    token: CONTRACT_ADDRESS.ETH,
  });
  const { point } = useCreatorAccount();
  const { push } = useRouter();
  const ListProfile: IProps[] = [
    {
      icon: HistoryIcon,
      text: 'History Fuel',
      onClick: () => {
        push('/history');
      },
    },
    {
      icon: QuestIcon,
      text: 'Quest Programs',
      isDisabled: true,
    },
    {
      icon: LinkIcon,
      text: 'Referral Link',
      isDisabled: true,
    },
    {
      icon: LogoutIcon,
      text: 'Disconnect',
      onClick: () => {
        disconnectWallet();
      },
    },
  ];
  return (
    <>
      <Button
        variant="primary"
        _hover={{}}
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
      {!userAddress ? (
        <Skeleton>00.000</Skeleton>
      ) : (
        <Button variant="primary" _hover={{}}>
          {point} points
        </Button>
      )}
      {/* {userAddress && <ModalClaimPoint />} */}
      {userAddress && (
        <Menu variant="profile" placement="bottom-end" closeOnSelect={false}>
          {({ isOpen, onClose }) => (
            <>
              <MenuButton as={Button} variant="primary">
                {userAddress && ellipseMiddle(userAddress, 5, 5)}
              </MenuButton>
              <MenuList minW="300px">
                <Box
                  px={4}
                  pb={4}
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

                  {ListProfile.map((item, index) => (
                    <MenuItem
                      key={index}
                      _hover={{
                        color: 'primary.100',
                      }}
                      onClick={() => {
                        onClose();
                        item.onClick && item.onClick();
                      }}
                      isDisabled={item.isDisabled}
                    >
                      <Icon as={item.icon} />
                      <Text>{item.text}</Text>
                    </MenuItem>
                  ))}
                </Box>
              </MenuList>
            </>
          )}
        </Menu>
      )}
    </>
  );
};

export default ProfileAccount;
