export const ListPublicRPC = [
  'https://starknet-sepolia.public.blastapi.io',
  'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
  'https://starknet-sepolia.public.blastapi.io/rpc/v0_6',
  'https://starknet-sepolia.reddio.com/rpc/v0_7',
  'https://starknet-sepolia.reddio.com',
];

export enum CONTRACT_ADDRESS {
  STRK = '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D',
  ETH = '0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7',
  BLIZT = '0x6817f5d84450d8003da63a66b1022d317ff6e3aa6303f8cc800d26cb73693e4',
  FUEL = '0x028858c6f12ae346f9d03895caa473480ea4bc59b1e63b614ea9582310c998e0',
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export enum RPC_PROVIDER {
  MAINET = 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7',
  // TESTNET = 'https://free-rpc.nethermind.io/sepolia-juno/v0_7',
  TESTNET = 'https://starknet-sepolia.reddio.com/rpc/v0_7',
}

///BLizt
export type BliztSatus =
  | 'starting'
  | 'started'
  | 'stopped'
  | 'stopping'
  | 'balance_low';

export enum BliztEvent {
  BLIZT_POINT = 'blizt-point',
  BLIZT_STATUS = 'blizt-status',
  BLIZT_TRANSACTION = 'blizt-transaction',
  BLIZT_BALANCE = 'blizt-balance',
}

export type TXRType = 'success' | 'rejected' | 'error' | 'reverted';

export enum STARK_SCAN {
  LINK_TX = 'https://sepolia.starkscan.co/tx',
  LINK_ACCOUNT = 'https://sepolia.starkscan.co/contract',
}
