import {
  Icon,
  IconButton,
  IconButtonProps,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';

import React from 'react';

import CheckIcon from '@/public/assets/icons/check.svg';
import CopyIcon from '@/public/assets/icons/file_copy.svg';
interface CopyClipBoardProps extends IconButtonProps {
  context: string;
}
const CopyClipBoard = ({ context, w, h, ...rest }: CopyClipBoardProps) => {
  const { onCopy, hasCopied } = useClipboard(context);

  return (
    <Tooltip
      label={hasCopied ? 'COPIED' : 'COPY'}
      placement="right"
      autoFocus={false}
    >
      <IconButton
        variant="unstyled"
        minWidth="unset"
        height="auto"
        cursor="pointer"
        transition="all 0.4s ease-in-out"
        color={hasCopied ? 'green' : 'inherit'}
        onClick={e => {
          e.preventDefault();
          onCopy();
        }}
        icon={
          <Icon
            w={w || 6}
            h={h || 6}
            as={hasCopied ? CheckIcon : CopyIcon}
            verticalAlign="middle"
          />
        }
        {...rest}
      />
    </Tooltip>
  );
};

export default CopyClipBoard;
