'use client';

import React, { createContext, ReactNode, useContext } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { Web3ContextType } from '../types/web3';

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const metaMaskData = useMetaMask();

  const contextValue: Web3ContextType = {
    account: metaMaskData.account,
    provider: metaMaskData.provider,
    signer: metaMaskData.signer,
    chainId: metaMaskData.chainId,
    isConnected: metaMaskData.isConnected,
    isLoading: metaMaskData.isLoading,
    error: metaMaskData.error,
    connectWallet: metaMaskData.connectWallet,
    disconnectWallet: metaMaskData.disconnectWallet,
    switchNetwork: metaMaskData.switchNetwork,
  };

  return (
    <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);

  if (context === undefined) {
    throw new Error('useWeb3 doit être utilisé dans un Web3Provider');
  }

  return context;
};

export const useMetaMaskInstalled = (): boolean => {
  const { isConnected } = useWeb3();
  return (
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  );
};

export default Web3Context;
