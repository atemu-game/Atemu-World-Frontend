import { RPC_PROVIDER } from '@/utils/constants';

/* eslint-disable import/no-anonymous-default-export */
export default () => ({
  RPC: RPC_PROVIDER.TESTNET,
  PUBLIC_SOCKET: String(process.env.PUBLIC_NEXT_SOCKET_PORT),
  PUBLIC_API: String(process.env.PUBLIC_NEXT_API),
});
