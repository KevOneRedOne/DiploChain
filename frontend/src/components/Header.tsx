'use client';

import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import NetworkStatus from './Web3/NetworkStatus';
import WalletConnection from './Web3/WalletConnection';

const Header: React.FC = () => {
  const { isConnected, account } = useWeb3();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo et titre */}
          <div className="brand">
            <a href="/" className="logo-link">
              <h1 className="logo">🎓 DiploChain</h1>
              <span className="tagline">
                Vérification de Diplômes sur Blockchain
              </span>
            </a>
          </div>

          {/* Navigation principale */}
          <nav className="nav">
            <a href="/Dashboard/Students" className="nav-link">
              Étudiants
            </a>
            <a href="/Dashboard/Institutions" className="nav-link">
              Établissements
            </a>
            <a href="/Dashboard/Companies" className="nav-link">
              Entreprises
            </a>
          </nav>

          {/* Section connexion wallet */}
          <div className="wallet-section">
            {isConnected && <NetworkStatus />}
            <WalletConnection />
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .logo-link {
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
        }

        .logo-link:hover {
          transform: translateY(-1px);
          opacity: 0.9;
        }

        .logo {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(45deg, #fff, #e0e0e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .tagline {
          font-size: 0.9rem;
          opacity: 0.9;
          font-weight: 300;
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          opacity: 0.9;
          white-space: nowrap;
        }

        .nav-link:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .wallet-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: flex-end;
          flex-shrink: 0;
          min-width: 320px;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header {
            padding: 0.75rem 0;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }

          .nav {
            order: 3;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .wallet-section {
            order: 2;
            align-items: center;
          }

          .brand {
            order: 1;
            align-items: center;
          }

          .logo {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .nav {
            flex-direction: column;
            gap: 0.5rem;
          }

          .nav-link {
            padding: 0.5rem;
            width: 100%;
            text-align: center;
          }

          .logo {
            font-size: 1.3rem;
          }

          .tagline {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
