'use client';

import React, { useEffect, useState } from 'react';
import { useContracts } from '../../context/ContractContext';
import { useWeb3 } from '../../context/Web3Context';
import { TokenBalance } from '../../types/web3';

const TokenManager: React.FC = () => {
  const {
    buyTokens,
    getTokenBalance,
    payForVerification,
    rewardCompanyForEvaluation,
    isTransactionPending,
    error,
    lastTransactionHash,
  } = useContracts();

  const { account, isConnected } = useWeb3();

  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [verificationAddress, setVerificationAddress] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  // Charger le solde de tokens
  const loadTokenBalance = async () => {
    if (!account || !isConnected) return;

    setIsLoadingBalance(true);
    try {
      const balance = await getTokenBalance(account);
      setTokenBalance(balance);
    } catch (err) {
      console.error('Erreur lors du chargement du solde:', err);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  // Acheter des tokens
  const handleBuyTokens = async () => {
    try {
      await buyTokens();
      // Recharger le solde après l'achat
      setTimeout(loadTokenBalance, 2000);
    } catch (err) {
      console.error("Erreur lors de l'achat:", err);
    }
  };

  // Payer pour la vérification
  const handlePayForVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationAddress.trim()) {
      alert('Veuillez entrer une adresse valide');
      return;
    }

    try {
      await payForVerification(verificationAddress);
      setVerificationAddress('');
      // Recharger le solde après le paiement
      setTimeout(loadTokenBalance, 2000);
    } catch (err) {
      console.error('Erreur lors du paiement:', err);
    }
  };

  // Récompenser une entreprise pour l'évaluation
  const handleRewardCompany = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyAddress.trim()) {
      alert("Veuillez entrer une adresse d'entreprise valide");
      return;
    }

    try {
      await rewardCompanyForEvaluation(companyAddress);
      setCompanyAddress('');
      // Recharger le solde après la récompense
      setTimeout(loadTokenBalance, 2000);
    } catch (err) {
      console.error("Erreur lors de l'attribution de la récompense:", err);
    }
  };

  // Charger le solde au montage et à chaque changement de compte
  useEffect(() => {
    loadTokenBalance();
  }, [account, isConnected]);

  if (!isConnected) {
    return (
      <div className="token-manager">
        <div className="alert alert-warning">
          <p>⚠️ Veuillez connecter votre wallet pour gérer vos tokens</p>
        </div>
      </div>
    );
  }

  return (
    <div className="token-manager">
      <h2>Gestionnaire de Tokens DIPTOK</h2>

      {error && (
        <div className="alert alert-error">
          <p>❌ {error}</p>
        </div>
      )}

      {lastTransactionHash && (
        <div className="alert alert-success">
          <p>✅ Transaction réussie!</p>
          <p>Hash: {lastTransactionHash.substring(0, 20)}...</p>
        </div>
      )}

      {/* Affichage du solde */}
      <div className="balance-section">
        <h3>Mon Solde</h3>
        <div className="balance-card">
          {isLoadingBalance ? (
            <p>Chargement du solde...</p>
          ) : tokenBalance ? (
            <div className="balance-info">
              <p className="balance-amount">
                {parseFloat(tokenBalance.balance).toFixed(2)}{' '}
                {tokenBalance.symbol}
              </p>
              <button
                onClick={loadTokenBalance}
                className="btn btn-sm btn-outline"
              >
                🔄 Actualiser
              </button>
            </div>
          ) : (
            <p>Impossible de charger le solde</p>
          )}
        </div>
      </div>

      {/* Section d'achat de tokens */}
      <div className="buy-section">
        <h3>Acheter des Tokens</h3>
        <div className="buy-card">
          <p>Prix: 0.01 ETH = 100 DIPTOK</p>
          <button
            onClick={handleBuyTokens}
            disabled={isTransactionPending}
            className="btn btn-primary"
          >
            {isTransactionPending ? 'Achat en cours...' : 'Acheter 100 DIPTOK'}
          </button>
        </div>
      </div>

      {/* Section de paiement pour vérification */}
      <div className="verification-section">
        <h3>Payer pour la Vérification</h3>
        <div className="verification-card">
          <p>Coût: 10 DIPTOK pour vérifier un diplôme</p>
          <form onSubmit={handlePayForVerification}>
            <div className="form-group">
              <label htmlFor="verificationAddress">
                Adresse de l'application de vérification:
              </label>
              <input
                type="text"
                id="verificationAddress"
                value={verificationAddress}
                onChange={e => setVerificationAddress(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={
                isTransactionPending ||
                !tokenBalance ||
                parseFloat(tokenBalance.balance) < 10
              }
              className="btn btn-secondary"
            >
              {isTransactionPending
                ? 'Paiement en cours...'
                : 'Payer 10 DIPTOK'}
            </button>
          </form>
          {tokenBalance && parseFloat(tokenBalance.balance) < 10 && (
            <p className="warning-text">
              Solde insuffisant. Vous avez besoin d'au moins 10 DIPTOK.
            </p>
          )}
        </div>
      </div>

      {/* Section de récompense pour les entreprises */}
      <div className="reward-section">
        <h3>Récompenser une Entreprise</h3>
        <div className="reward-card">
          <p>Récompense: 15 DIPTOK pour l'évaluation d'un étudiant</p>
          <p className="info-text">
            ⚠️ Fonction réservée au propriétaire du contrat
          </p>
          <form onSubmit={handleRewardCompany}>
            <div className="form-group">
              <label htmlFor="companyAddress">
                Adresse de l'entreprise à récompenser:
              </label>
              <input
                type="text"
                id="companyAddress"
                value={companyAddress}
                onChange={e => setCompanyAddress(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isTransactionPending}
              className="btn btn-success"
            >
              {isTransactionPending
                ? 'Attribution en cours...'
                : 'Attribuer 15 DIPTOK'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .token-manager {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .token-manager h2 {
          margin-bottom: 2rem;
          color: #333;
          text-align: center;
        }

        .token-manager h3 {
          margin-bottom: 1rem;
          color: #495057;
          border-bottom: 2px solid #e9ecef;
          padding-bottom: 0.5rem;
        }

        .alert {
          padding: 1rem;
          margin-bottom: 1.5rem;
          border-radius: 4px;
          border: 1px solid;
        }

        .alert-warning {
          background-color: #fff3cd;
          border-color: #ffeaa7;
          color: #856404;
        }

        .alert-error {
          background-color: #f8d7da;
          border-color: #f5c6cb;
          color: #721c24;
        }

        .alert-success {
          background-color: #d4edda;
          border-color: #c3e6cb;
          color: #155724;
        }

        .balance-section,
        .buy-section,
        .verification-section,
        .reward-section {
          margin-bottom: 2rem;
        }

        .balance-card,
        .buy-card,
        .verification-card,
        .reward-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .balance-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .balance-amount {
          font-size: 1.5rem;
          font-weight: bold;
          color: #007bff;
          margin: 0;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #495057;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-group input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
          width: 100%;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #0056b3;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: white;
          width: 100%;
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: #545b62;
        }

        .btn-outline {
          background-color: transparent;
          border: 1px solid #007bff;
          color: #007bff;
        }

        .btn-outline:hover:not(:disabled) {
          background-color: #007bff;
          color: white;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .warning-text {
          color: #dc3545;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          font-style: italic;
        }

        .btn-success {
          background-color: #28a745;
          color: white;
          width: 100%;
        }

        .btn-success:hover:not(:disabled) {
          background-color: #218838;
        }

        .info-text {
          color: #6c757d;
          font-size: 0.9rem;
          font-style: italic;
          margin-bottom: 1rem;
        }

        .buy-card p,
        .verification-card p,
        .reward-card p:not(.info-text) {
          margin-bottom: 1rem;
          color: #6c757d;
        }
      `}</style>
    </div>
  );
};

export default TokenManager;
