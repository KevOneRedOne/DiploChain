'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './index.module.scss';

// Déclaration globale pour éviter les erreurs TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await getBalance(accounts[0]);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la connexion:', error);
      }
    }
  };

  const getBalance = async (address: string) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du solde:', error);
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        setIsConnecting(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        await getBalance(accounts[0]);
      } catch (error) {
        console.error('Erreur de connexion au wallet:', error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert('MetaMask n\'est pas installé. Veuillez l\'installer pour continuer.');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('0');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className={`${styles.cryptoHeader} ${className}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎓</span>
          <h1 className={styles.logoText}>DiploChain</h1>
        </div>

        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>Accueil</a>
          <a href="/Dashboard/Students" className={styles.navLink}>Étudiants</a>
          <a href="/Dashboard/Institutions" className={styles.navLink}>Établissements</a>
          <a href="/Dashboard/Companies" className={styles.navLink}>Entreprises</a>
        </nav>

        <div className={styles.walletSection}>
          {account ? (
            <div className={styles.walletConnected}>
              <div className={styles.balanceDisplay}>
                <span className={styles.balanceLabel}>Balance:</span>
                <span className={styles.balanceAmount}>{parseFloat(balance).toFixed(4)} ETH</span>
              </div>
              <div className={styles.accountInfo}>
                <span className={styles.accountAddress}>{formatAddress(account)}</span>
                <button onClick={disconnectWallet} className={styles.disconnectBtn}>
                  Déconnecter
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className={styles.connectBtn}
            >
              {isConnecting ? (
                <span className={styles.loading}>
                  <span className={styles.spinner}></span>
                  Connexion...
                </span>
              ) : (
                'Connecter Wallet'
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}