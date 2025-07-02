'use client';

import React from 'react';
import Link from 'next/link';
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
            <h1 className="logo">🎓 DiploChain</h1>
            <span className="tagline">
              Vérification de Diplômes sur Blockchain
            </span>
          </div>

          {/* Navigation principale */}
          <nav className="nav">
            <Link href="/" className="nav-link">
              Accueil
            </Link>
            <Link href="/Dashboard/Institutions" className="nav-link">
              Établissements
            </Link>
            <Link href="/Dashboard/Companies" className="nav-link">
              Entreprises
            </Link>
            <Link href="/Dashboard/Students" className="nav-link">
              Étudiants
            </Link>
          </nav>

          {/* Section connexion wallet */}
          <div className="wallet-section">
            {isConnected && <NetworkStatus />}
            <WalletConnection />
          </div>
        </div>

        {/* Barre d'information utilisateur connecté */}
        {isConnected && account && (
          <div className="user-info">
            <div className="welcome-message">
              ✅ Connecté en tant que: <code>{account}</code>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

        .logo {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(45deg, #fff, #e0e0e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.3s ease;
          opacity: 0.9;
        }

        .nav-link:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .wallet-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-end;
        }

        .user-info {
          margin-top: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .welcome-message {
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .welcome-message code {
          background: rgba(0, 0, 0, 0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .nav {
            order: 3;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
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

          .nav {
            gap: 1rem;
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
        }
      `}</style>
    </header>
  );
};

export default Header;
