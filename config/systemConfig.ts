import { RPC_PROVIDER } from '@/utils/constants';

/* eslint-disable import/no-anonymous-default-export */
export default () => ({
  RPC: RPC_PROVIDER.TESTNET,
  PUBLIC_SOCKET_BLITZ: String(process.env.PUBLIC_SOCKET_BLITZ),
  PUBLIC_SOCKET_FUEL: String(process.env.PUBLIC_SOCKET_FUEL),
  PUBLIC_API: String(process.env.PUBLIC_NEXT_API),
});
