import { NetworkConfig } from '../types/web3';

export const NETWORKS: Record<string, NetworkConfig> = {
  // Hardhat local network
  hardhat: {
    chainId: '0x7A69', // 31337 en hexadécimal
    chainName: 'Hardhat Local',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['http://127.0.0.1:8545'],
    blockExplorerUrls: [''],
  },
  // Sepolia testnet
  sepolia: {
    chainId: '0xAA36A7', // 11155111 en hexadécimal
    chainName: 'Sepolia Test Network',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_KEY'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  // Goerli testnet (backup)
  goerli: {
    chainId: '0x5', // 5 en hexadécimal
    chainName: 'Goerli Test Network',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3/YOUR_INFURA_KEY'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
};

export const DEFAULT_NETWORK = 'hardhat';
export const SUPPORTED_CHAIN_IDS = Object.values(NETWORKS).map(
  network => network.chainId
);
