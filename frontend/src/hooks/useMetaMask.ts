'use client';

import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { NETWORKS } from '../config/networks';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useMetaMask = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMetaMaskInstalled = useCallback(() => {
    return (
      typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
    );
  }, []);

  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setError(
        "MetaMask n'est pas installé. Veuillez l'installer depuis metamask.io"
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('Aucun compte MetaMask trouvé');
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setChainId(Number(network.chainId));
      setIsConnected(true);

      localStorage.setItem('isWalletConnected', 'true');
    } catch (err: any) {
      console.error('Erreur de connexion:', err);
      if (err.code === 4001) {
        setError("Connexion refusée par l'utilisateur");
      } else {
        setError(`Erreur de connexion: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isMetaMaskInstalled]);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    setIsConnected(false);
    setError(null);
    localStorage.removeItem('isWalletConnected');
  }, []);

  const switchNetwork = useCallback(async (targetChainId: string) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        const networkConfig = Object.values(NETWORKS).find(
          network => network.chainId === targetChainId
        );

        if (networkConfig) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networkConfig],
            });
          } catch (addError) {
            console.error("Erreur lors de l'ajout du réseau:", addError);
            setError("Impossible d'ajouter le réseau");
          }
        }
      } else {
        console.error('Erreur lors du changement de réseau:', error);
        setError('Impossible de changer de réseau');
      }
    }
  }, []);

  const handleAccountsChanged = useCallback(
    (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== account) {
        setAccount(accounts[0]);
      }
    },
    [account, disconnectWallet]
  );

  const handleChainChanged = useCallback((chainId: string) => {
    const newChainId = parseInt(chainId, 16);
    setChainId(newChainId);

    window.location.reload();
  }, []);

  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanged, handleChainChanged, isMetaMaskInstalled]);

  useEffect(() => {
    const autoConnect = async () => {
      const wasConnected = localStorage.getItem('isWalletConnected');
      if (wasConnected === 'true' && isMetaMaskInstalled()) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });

          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (error) {
          console.error('Erreur lors de la reconnexion automatique:', error);
        }
      }
    };

    autoConnect();
  }, [connectWallet, isMetaMaskInstalled]);

  return {
    account,
    provider,
    signer,
    chainId,
    isConnected,
    isLoading,
    error,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };
};
