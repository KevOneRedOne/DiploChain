'use client';

import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import {
  useCompany,
  CompanyProfile as CompanyProfileType,
} from '../../hooks/useCompany';
import { TokenBalance } from '../../types/web3';
import CompanyRegistration from './CompanyRegistration';
import styles from './CompanyProfile.module.scss';

interface CompanyProfileProps {
  onBuyTokens?: () => void;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ onBuyTokens }) => {
  const { account, isConnected } = useWeb3();
  const {
    getCompanyProfile,
    getCompanyTokenBalance,
    buyTokens,
    isLoading,
    error,
  } = useCompany();

  const [profile, setProfile] = useState<CompanyProfileType | null>(null);
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);

  // Charger les données de l'entreprise
  useEffect(() => {
    const loadCompanyData = async () => {
      if (!isConnected || !account) return;

      try {
        const [companyProfile, balance] = await Promise.all([
          getCompanyProfile(account),
          getCompanyTokenBalance(account),
        ]);

        setProfile(companyProfile);
        setTokenBalance(balance);
      } catch (err) {
        console.error('Erreur lors du chargement des données entreprise:', err);
      }
    };

    loadCompanyData();
  }, [account, isConnected, getCompanyProfile, getCompanyTokenBalance]);

  const handleBuyTokens = async () => {
    setIsLoadingTokens(true);
    try {
      const success = await buyTokens();
      if (success) {
        // Recharger le solde
        const newBalance = await getCompanyTokenBalance(account!);
        setTokenBalance(newBalance);

        if (onBuyTokens) {
          onBuyTokens();
        }
      }
    } catch (err) {
      console.error("Erreur lors de l'achat de tokens:", err);
    } finally {
      setIsLoadingTokens(false);
    }
  };

  if (!isConnected) {
    return (
      <div className={styles.notConnected}>
        <h3>🔒 Connexion requise</h3>
        <p>
          Veuillez connecter votre wallet pour accéder à votre profil
          entreprise.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Chargement du profil entreprise...</p>
      </div>
    );
  }

  if (!profile) {
    return <CompanyRegistration />;
  }

  const formatTokenBalance = (balance: TokenBalance | null) => {
    if (!balance) return '0.00';
    return parseFloat(balance.balance).toFixed(2);
  };

  return (
    <div className={styles.companyProfile}>
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <h2 className={styles.companyName}>🏢 {profile.name}</h2>
          <p className={styles.companyCountry}>📍 {profile.country}</p>
          <p className={styles.companyId}>ID: #{profile.id}</p>
        </div>

        <div className={styles.walletInfo}>
          <p className={styles.address}>
            <span className={styles.label}>Adresse:</span>
            <span className={styles.value}>
              {account?.substring(0, 6)}...
              {account?.substring(account.length - 4)}
            </span>
          </p>
        </div>
      </div>

      <div className={styles.tokenSection}>
        <div className={styles.tokenBalance}>
          <div className={styles.balanceHeader}>
            <h3 className={styles.balanceTitle}>💰 Solde DIPTOK</h3>
            <button
              className={styles.refreshButton}
              onClick={() => account && getCompanyTokenBalance(account)}
              disabled={isLoading}
            >
              🔄
            </button>
          </div>

          <div className={styles.balanceAmount}>
            <span className={styles.amount}>
              {formatTokenBalance(tokenBalance)}
            </span>
            <span className={styles.currency}>DIPTOK</span>
          </div>

          <div className={styles.tokenActions}>
            <button
              className={styles.buyButton}
              onClick={handleBuyTokens}
              disabled={isLoadingTokens || isLoading}
            >
              {isLoadingTokens
                ? 'Achat en cours...'
                : 'Acheter des tokens (0.01 ETH)'}
            </button>
          </div>

          <div className={styles.tokenInfo}>
            <p>💡 1 vérification = 10 DIPTOK</p>
            <p>💡 0.01 ETH = 100 DIPTOK</p>
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          <p>❌ {error}</p>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
