import { NetworkConfig } from '../types/web3';

export const NETWORKS: Record<string, NetworkConfig> = {
  // Blaze testnet (Sonic Labs) - Réseau principal pour ce projet
  blaze: {
    chainId: '0xDEDE', // 57054 en hexadécimal
    chainName: 'Blaze Testnet',
    nativeCurrency: {
      name: 'Sonic',
      symbol: 'S',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.blaze.soniclabs.com'],
    blockExplorerUrls: ['https://testnet.sonicscan.org'],
  },
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
  // Sonic testnet
  sonic: {
    chainId: '0xFAC5', // 64165 en hexadécimal
    chainName: 'Sonic Testnet',
    nativeCurrency: {
      name: 'Sonic',
      symbol: 'S',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.testnet.soniclabs.com'],
    blockExplorerUrls: ['https://testnet.sonicscan.org'],
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

export const DEFAULT_NETWORK = 'blaze';

// Liste des Chain IDs supportés (incluant les variantes Sonic Labs)
export const SUPPORTED_CHAIN_IDS = [
  '0xDEDE', // 57054 - Blaze testnet (réseau principal)
  '0x7A69', // 31337 - Hardhat
  '0xFAC5', // 64165 - Sonic testnet
  '0xAA36A7', // 11155111 - Sepolia
  '0x5', // 5 - Goerli
];

// Liste des Chain IDs supportés en format numérique (plus fiable)
export const SUPPORTED_CHAIN_IDS_NUMERIC = [
  57054, // Blaze testnet
  31337, // Hardhat
  64165, // Sonic testnet
  11155111, // Sepolia
  5, // Goerli
];

// Fonction pour vérifier si un Chain ID est supporté
export const isSupportedChainId = (chainId: number): boolean => {
  const hexChainId = `0x${chainId.toString(16).toUpperCase()}`;
  console.log(
    `Debug isSupportedChainId: chainId=${chainId}, hexChainId=${hexChainId}`
  );
  console.log(`SUPPORTED_CHAIN_IDS:`, SUPPORTED_CHAIN_IDS);

  // Debug chaque comparaison
  SUPPORTED_CHAIN_IDS.forEach((id, index) => {
    const upperCaseId = id.toUpperCase();
    const match = upperCaseId === hexChainId;
    console.log(
      `Compare ${index}: '${upperCaseId}' === '${hexChainId}' = ${match}`
    );
    console.log(`Length: ${upperCaseId.length} vs ${hexChainId.length}`);
  });

  const isSupported = SUPPORTED_CHAIN_IDS.some(
    id => id.toUpperCase() === hexChainId
  );
  console.log(`Result: ${isSupported}`);
  return isSupported;
};

// Fonction alternative plus robuste pour vérifier si un Chain ID est supporté
export const isSupportedChainIdNumeric = (chainId: number): boolean => {
  console.log(`🔍 isSupportedChainIdNumeric: chainId=${chainId}`);
  const isSupported = SUPPORTED_CHAIN_IDS_NUMERIC.includes(chainId);
  console.log(`✅ Result: ${isSupported}`);
  return isSupported;
};

// Liste des réseaux issus de la configuration
export const NETWORK_CHAIN_IDS = Object.values(NETWORKS).map(
  network => network.chainId
);
