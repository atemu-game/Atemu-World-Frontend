import { ACCESS_TOKEN } from '@/utils/constants';
import { getCookie } from '@/utils/cookie';

import { Socket, io } from 'socket.io-client';
import systemConfig from './systemConfig';

export let socketAPI: Socket;

export const connectSocket = () => {
  socketAPI = io(systemConfig().PUBLIC_SOCKET, {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
        },
      },
    },
  });

  socketAPI.on('connect', () => {
    console.log('Connected to the server');
  });
};
export const disconnectSocket = () => {
  socketAPI.disconnect();
};

export const startMint = (rpc: string) => {
  socketAPI.emit('startMint', {
    rpc: rpc,
  });
};
export const stopMint = () => {
  socketAPI.emit('stopMint');
};
