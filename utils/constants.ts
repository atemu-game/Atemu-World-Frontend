export const ListPublicRPC = [
  'https://starknet-sepolia.public.blastapi.io',
  'https://rpc.starknet-sepolia.lava.build"',
  'https://starknet-sepolia.public.blastapi.io',
  'https://starknet-sepolia.public.blastapi.io',
  'https://starknet-sepolia.public.blastapi.io',
  'https://starknet-sepolia.public.blastapi.io',
  'https://starknet-sepolia.public.blastapi.io',
];

export enum CONTRACT_ADDRESS {
  STRK = '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D',
  ETH = '0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7',
  BLIZT = '0x3a986673f9aafe75948e28fd7a7a65f3495237670249b7fdb63d8ed7ce1439b',
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export enum RPC_PROVIDER {
  MAINET = 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7',
  TESTNET = 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
}

///BLizt
export type BliztSatus = 'start' | 'stop';

export enum BliztEvent {
  BLIZT_POINT = 'blizt-point',
  BLIZT_STATUS = 'blizt-status',
  BLIZT_TRANSACTION = 'blizt-transaction',
}

export type TXRType = 'success' | 'rejected' | 'error' | 'reverted';

export const STARKSCAN_LINK = 'https://sepolia.starkscan.co/tx';
