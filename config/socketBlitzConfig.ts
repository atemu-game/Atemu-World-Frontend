import { ACCESS_TOKEN } from '@/utils/constants';
import { getCookie } from '@/utils/cookie';

import { Socket, io } from 'socket.io-client';
import systemConfig from './systemConfig';

export let socketBlitzApi: Socket;

export const connectSocketBlitz = () => {
  socketBlitzApi = io(systemConfig().PUBLIC_SOCKET_BLITZ, {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
        },
      },
    },
  });

  socketBlitzApi.on('connect', () => {
    console.log('Connected to the server - Blitz ');
  });
};
export const disconnectSocket = () => {
  socketBlitzApi.disconnect();
};

export const startMint = (rpc: string) => {
  socketBlitzApi.emit('startMint', {
    rpc: rpc,
  });
};
export const stopMint = () => {
  socketBlitzApi.emit('stopMint');
};
