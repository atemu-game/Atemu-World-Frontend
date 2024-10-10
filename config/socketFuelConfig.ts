import { io, Socket } from 'socket.io-client';
import systemConfig from './systemConfig';
import { getCookie } from '@/utils/cookie';
import { ACCESS_TOKEN } from '@/utils/constants';

export let socketFuelApi: Socket;
export const connectSocketFuel = () => {
  socketFuelApi = io(systemConfig().PUBLIC_SOCKET_FUEL);
  socketFuelApi.on('connect', () => {
    console.log('Connected to the server - Fuel API');
  });
};
export const disconnectSocketFuel = () => {
  socketFuelApi.disconnect();
};
