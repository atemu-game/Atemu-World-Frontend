import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import MenuIcon from '@/public/assets/icons/menu.svg';
import ListPage from './ListPage';
const PageDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label=""
        variant="primary"
        border="none"
        icon={<Icon as={MenuIcon} h={8} w={8} />}
        height={8}
        w={8}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody
            py={10}
            background="body"
            display="flex"
            flexDirection="column"
            gap={6}
            width="full"
          >
            <ListPage
              sx={{
                flexDirection: 'row',
                width: 'full',
                gap: 4,
                onClick: onClose,
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PageDrawer;
