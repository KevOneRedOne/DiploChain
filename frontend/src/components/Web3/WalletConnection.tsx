'use client';

import React, { useState, useEffect } from 'react';
import {
  DEFAULT_NETWORK,
  NETWORKS,
  isSupportedChainIdNumeric,
} from '../../config/networks';
import { useWeb3 } from '../../context/Web3Context';

const WalletConnection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const {
    account,
    chainId,
    isConnected,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  } = useWeb3();

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const getCurrentNetwork = () => {
    if (!chainId) return null;
    const hexChainId = `0x${chainId.toString(16).toUpperCase()}`;
    console.log('Current chainId:', chainId, 'Hex:', hexChainId);

    return Object.values(NETWORKS).find(
      network => network.chainId.toUpperCase() === hexChainId
    );
  };

  const currentNetwork = getCurrentNetwork();

  const handleNetworkSwitch = async () => {
    const targetNetwork = NETWORKS[DEFAULT_NETWORK];
    await switchNetwork(targetNetwork.chainId);
  };

  if (!mounted) {
    return (
      <div className="wallet-connection">
        <div className="connect-section">
          <button disabled className="btn btn-primary btn-lg">
            <span className="spinner"></span>
            Chargement...
          </button>
        </div>
      </div>
    );
  }

  if (!window?.ethereum) {
    return (
      <div className="wallet-connection">
        <div className="alert alert-warning">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <h4>MetaMask requis</h4>
            <p>Pour utiliser DiploChain, vous devez installer MetaMask.</p>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Installer MetaMask
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Vérifier si le réseau actuel est supporté
  const isNetworkSupported = chainId
    ? isSupportedChainIdNumeric(chainId)
    : false;

  return (
    <div className="wallet-connection">
      {error && (
        <div className="alert alert-danger">
          <div className="alert-icon">❌</div>
          <div className="alert-content">
            <strong>Erreur:</strong> {error}
          </div>
        </div>
      )}

      {!isConnected ? (
        <div className="connect-section">
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="btn btn-primary btn-lg"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Connexion...
              </>
            ) : (
              <>
                <span className="btn-icon">🦊</span>
                Connecter MetaMask
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="connected-section">
          <div className="wallet-info">
            <div className="account-info">
              <span className="label">Compte:</span>
              <div 
                className="address-container"
                onClick={() => account && copyToClipboard(account)}
                title={`${account} (Cliquer pour copier)`}
              >
                <span className="address">
                  {account ? formatAddress(account) : 'N/A'}
                </span>
                <span className="copy-icon">📋</span>
                <span className="full-address">
                  {account || 'N/A'}
                </span>
                {copied && <span className="copy-feedback">✓ Copié!</span>}
              </div>
            </div>

            <div className="network-info">
              <span className="label">Réseau:</span>
              <span className="network connected">
                {currentNetwork
                  ? currentNetwork.chainName
                  : `Blaze Testnet (${chainId})`}
              </span>
            </div>
          </div>

          <button
            onClick={disconnectWallet}
            className="btn btn-danger btn-sm disconnect-btn"
          >
            Déconnecter
          </button>
        </div>
      )}

      <style jsx>{`
        .wallet-connection {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .alert {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .alert-warning {
          background: rgba(255, 193, 7, 0.1);
          border-color: rgba(255, 193, 7, 0.3);
          color: #fff3cd;
        }

        .alert-danger {
          background: rgba(220, 53, 69, 0.1);
          border-color: rgba(220, 53, 69, 0.3);
          color: #f8d7da;
        }

        .alert-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .alert-content h4 {
          margin: 0 0 0.5rem 0;
          color: inherit;
          font-size: 1rem;
          font-weight: 600;
        }

        .alert-content p {
          margin: 0 0 0.75rem 0;
          color: inherit;
          opacity: 0.9;
        }

        .connect-section,
        .connected-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
          background: linear-gradient(135deg, #ff7b45 0%, #f8a32e 100%);
        }

        .btn-lg {
          padding: 0.8rem 1.6rem;
          font-size: 1rem;
        }

        .btn-warning {
          background: linear-gradient(135deg, #ffc107 0%, #ff9500 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
        }

        .btn-warning:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
        }

        .btn-danger {
          background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
        }

        .btn-danger:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
          background: linear-gradient(135deg, #ff5757 0%, #ff4752 100%);
        }

        .btn-sm {
          padding: 0.4rem 0.8rem;
          font-size: 0.8rem;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          background: linear-gradient(135deg, #a0a0a0 0%, #808080 100%);
        }

        .btn-icon {
          font-size: 1.1em;
        }

        .connected-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          white-space: nowrap;
        }

        .wallet-info {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-width: 260px;
          flex-shrink: 0;
        }

        .disconnect-btn {
          flex-shrink: 0;
          margin-left: 0.5rem;
        }

        .account-info,
        .network-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .network-info:last-child {
          margin-bottom: 0;
        }

        .label {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.85rem;
        }

        .address-container {
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .address {
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          font-weight: 500;
          color: white;
          font-size: 0.8rem;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        .copy-icon {
          font-size: 0.9rem;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .address-container:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .address-container:hover .copy-icon {
          opacity: 1;
          transform: scale(1.1);
        }

        .full-address {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1000;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .address-container:hover .full-address {
          opacity: 1;
          visibility: visible;
          transform: translateY(5px);
        }

        .copy-feedback {
          position: absolute;
          top: calc(100% + 1.5rem);
          right: 0;
          background: #4ade80;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          animation: fadeInOut 2s ease-in-out;
        }

        .network.connected {
          color: #4ade80;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .network.unknown {
          color: #f87171;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(5px); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .connect-section {
            align-items: center;
          }

          .connected-section {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }

          .wallet-info {
            min-width: auto;
            width: 100%;
          }

          .account-info,
          .network-info {
            flex-direction: column;
            gap: 0.25rem;
            text-align: center;
          }

          .btn-lg {
            padding: 0.7rem 1.4rem;
            font-size: 0.9rem;
          }

          .full-address {
            right: 50%;
            transform: translateX(50%);
          }

          .address-container:hover .full-address {
            transform: translateX(50%) translateY(5px);
          }

          .disconnect-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default WalletConnection;
