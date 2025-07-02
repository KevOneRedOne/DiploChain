import { ethers } from 'ethers';

/**
 * Formate une adresse Ethereum pour l'affichage
 * @param address - L'adresse à formater
 * @param startLength - Nombre de caractères au début (par défaut: 6)
 * @param endLength - Nombre de caractères à la fin (par défaut: 4)
 * @returns L'adresse formatée
 */
export const formatAddress = (
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string => {
  if (!address) return '';
  if (address.length <= startLength + endLength) return address;

  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
};

/**
 * Vérifie si une adresse Ethereum est valide
 * @param address - L'adresse à vérifier
 * @returns true si l'adresse est valide
 */
export const isValidAddress = (address: string): boolean => {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
};

/**
 * Convertit Wei en ETH
 * @param weiValue - Valeur en Wei
 * @param decimals - Nombre de décimales à afficher (par défaut: 4)
 * @returns Valeur formatée en ETH
 */
export const formatEther = (
  weiValue: string | bigint,
  decimals: number = 4
): string => {
  try {
    const ether = ethers.formatEther(weiValue);
    return parseFloat(ether).toFixed(decimals);
  } catch {
    return '0.0000';
  }
};

/**
 * Convertit ETH en Wei
 * @param etherValue - Valeur en ETH
 * @returns Valeur en Wei
 */
export const parseEther = (etherValue: string): bigint => {
  try {
    return ethers.parseEther(etherValue);
  } catch {
    return BigInt(0);
  }
};

/**
 * Formate un nombre de tokens avec le bon nombre de décimales
 * @param tokenValue - Valeur du token
 * @param decimals - Nombre de décimales du token (par défaut: 18)
 * @param displayDecimals - Nombre de décimales à afficher (par défaut: 2)
 * @returns Valeur formatée
 */
export const formatTokenAmount = (
  tokenValue: string | bigint,
  decimals: number = 18,
  displayDecimals: number = 2
): string => {
  try {
    const formatted = ethers.formatUnits(tokenValue, decimals);
    return parseFloat(formatted).toFixed(displayDecimals);
  } catch {
    return '0.00';
  }
};

/**
 * Parse un montant de token en unités avec les bonnes décimales
 * @param tokenValue - Valeur en format lisible
 * @param decimals - Nombre de décimales du token (par défaut: 18)
 * @returns Valeur en unités token
 */
export const parseTokenAmount = (
  tokenValue: string,
  decimals: number = 18
): bigint => {
  try {
    return ethers.parseUnits(tokenValue, decimals);
  } catch {
    return BigInt(0);
  }
};

/**
 * Formate une hash de transaction
 * @param hash - Hash de la transaction
 * @returns Hash formaté pour l'affichage
 */
export const formatTxHash = (hash: string): string => {
  return formatAddress(hash, 8, 6);
};

/**
 * Génère un lien vers Etherscan pour une transaction
 * @param hash - Hash de la transaction
 * @param chainId - ID de la chaîne
 * @returns URL vers Etherscan
 */
export const getEtherscanTxUrl = (hash: string, chainId: number): string => {
  const baseUrls: Record<number, string> = {
    1: 'https://etherscan.io',
    5: 'https://goerli.etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
  };

  const baseUrl = baseUrls[chainId] || 'https://etherscan.io';
  return `${baseUrl}/tx/${hash}`;
};

/**
 * Génère un lien vers Etherscan pour une adresse
 * @param address - Adresse à explorer
 * @param chainId - ID de la chaîne
 * @returns URL vers Etherscan
 */
export const getEtherscanAddressUrl = (
  address: string,
  chainId: number
): string => {
  const baseUrls: Record<number, string> = {
    1: 'https://etherscan.io',
    5: 'https://goerli.etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
  };

  const baseUrl = baseUrls[chainId] || 'https://etherscan.io';
  return `${baseUrl}/address/${address}`;
};

/**
 * Convertit le chainId en format hexadécimal
 * @param chainId - ID de la chaîne en nombre
 * @returns chainId en format hexadécimal
 */
export const toHexChainId = (chainId: number): string => {
  return `0x${chainId.toString(16)}`;
};

/**
 * Convertit le chainId du format hexadécimal en nombre
 * @param hexChainId - ID de la chaîne en format hexadécimal
 * @returns chainId en nombre
 */
export const fromHexChainId = (hexChainId: string): number => {
  return parseInt(hexChainId, 16);
};
