import { ACCESS_TOKEN } from '@/utils/constants';
import { getCookie } from '@/utils/cookie';

import { Socket, io } from 'socket.io-client';

export let socketAPI: Socket;

export const connectSocket = () => {
  socketAPI = io(
    process.env.PUBLIC_NEXT_SOCKET_PORT || 'http://localhost:8000',
    {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
          },
        },
      },
    }
  );

  socketAPI.on('connect', () => {
    console.log('Connected to the server');
  });
};
export const disconnectSocket = () => {
  socketAPI.disconnect();
};

export const startMint = () => {
  socketAPI.emit('startMint');
};
export const stopMint = () => {
  socketAPI.emit('stopMint');
};
