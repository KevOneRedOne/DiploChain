'use client';

import React from 'react';
import { NETWORKS, isSupportedChainIdNumeric } from '../../config/networks';
import { useWeb3 } from '../../context/Web3Context';

const NetworkStatus: React.FC = () => {
  const { chainId, isConnected, switchNetwork } = useWeb3();

  if (!isConnected) {
    return null;
  }

  const getCurrentNetwork = () => {
    if (!chainId) return null;
    return Object.values(NETWORKS).find(
      network => network.chainId === `0x${chainId.toString(16)}`
    );
  };

  const currentNetwork = getCurrentNetwork();
  const isSupported = chainId ? isSupportedChainIdNumeric(chainId) : false;

  return (
    <div className="network-status">
      <div
        className={`status-indicator ${isSupported ? 'supported' : 'unsupported'}`}
      >
        <span className="status-dot"></span>
        <span className="network-name">
          {currentNetwork
            ? currentNetwork.chainName
            : `Réseau non supporté (${chainId})`}
        </span>
      </div>

      {!isSupported && (
        <div className="network-warning">
          <p>⚠️ Réseau non supporté</p>
          <div className="supported-networks">
            <h4>Réseaux supportés:</h4>
            {Object.entries(NETWORKS).map(([key, network]) => (
              <button
                key={key}
                onClick={() => switchNetwork(network.chainId)}
                className="btn btn-sm btn-outline-primary network-btn"
              >
                {network.chainName}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .network-status {
          padding: 0.5rem;
          border-radius: 6px;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .supported .status-dot {
          background-color: #28a745;
        }

        .unsupported .status-dot {
          background-color: #dc3545;
        }

        .network-name {
          font-weight: 500;
          font-size: 0.9rem;
        }

        .supported .network-name {
          color: #28a745;
        }

        .unsupported .network-name {
          color: #dc3545;
        }

        .network-warning {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 4px;
        }

        .network-warning p {
          margin: 0 0 0.5rem 0;
          color: #856404;
          font-weight: 500;
        }

        .supported-networks h4 {
          margin: 0 0 0.5rem 0;
          font-size: 0.9rem;
          color: #495057;
        }

        .network-btn {
          margin: 0.25rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.8rem;
        }

        .btn {
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-outline-primary {
          background: transparent;
          border: 1px solid #007bff;
          color: #007bff;
        }

        .btn-outline-primary:hover {
          background: #007bff;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default NetworkStatus;
