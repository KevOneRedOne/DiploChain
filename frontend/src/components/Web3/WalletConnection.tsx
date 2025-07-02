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
          <h4>⚠️ MetaMask requis</h4>
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
          <strong>Erreur:</strong> {error}
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
              '🦊 Connecter MetaMask'
            )}
          </button>
        </div>
      ) : (
        <div className="connected-section">
          <div className="wallet-info">
            <div className="account-info">
              <span className="label">Compte:</span>
              <span className="address" title={account || ''}>
                {account ? formatAddress(account) : 'N/A'}
              </span>
            </div>

            <div className="network-info">
              <span className="label">Réseau:</span>
              <span
                className={`network ${isNetworkSupported ? 'connected' : 'unknown'}`}
              >
                {currentNetwork
                  ? currentNetwork.chainName
                  : isNetworkSupported
                    ? `Blaze Testnet (${chainId})`
                    : `Non supporté (${chainId})`}
              </span>
            </div>

            {chainId && !isNetworkSupported && (
              <button
                onClick={handleNetworkSwitch}
                className="btn btn-warning btn-sm"
              >
                Changer vers {NETWORKS[DEFAULT_NETWORK].chainName}
              </button>
            )}
          </div>

          <button
            onClick={disconnectWallet}
            className="btn btn-outline-secondary btn-sm"
          >
            Déconnecter
          </button>
        </div>
      )}

      <style jsx>{`
        .wallet-connection {
          padding: 1rem;
          border-radius: 8px;
        }

        .alert {
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .alert-warning {
          background-color: #fff3cd;
          border-color: #ffeaa7;
          color: #856404;
        }

        .alert-danger {
          background-color: #f8d7da;
          border-color: #f5c6cb;
          color: #721c24;
        }

        .connect-section,
        .connected-section {
          text-align: center;
          color: #000000;
        }

        .connect-section h3,
        .connect-section p,
        .connected-section h3,
        .connected-section p {
          color: #000000 !important;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }

        .btn-lg {
          padding: 0.75rem 1.5rem;
          font-size: 1.1rem;
        }

        .btn-warning {
          background-color: #ffc107;
          color: #000000 !important;
        }

        .btn-outline-secondary {
          background-color: transparent;
          border: 1px solid #000000;
          color: #000000 !important;
        }

        .btn-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .wallet-info {
          background: white;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .account-info,
        .network-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .label {
          font-weight: 600;
          color: #000000 !important;
        }

        .address {
          font-family: monospace;
          font-weight: 500;
          color: #000000 !important;
        }

        .network.connected {
          color: #28a745;
          font-weight: 500;
        }

        .network.unknown {
          color: #dc3545;
          font-weight: 500;
        }

        .spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default WalletConnection;
