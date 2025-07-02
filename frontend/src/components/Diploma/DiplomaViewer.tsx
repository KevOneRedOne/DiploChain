'use client';

import React, { useEffect, useState } from 'react';
import { useContracts } from '../../context/ContractContext';
import { useWeb3 } from '../../context/Web3Context';
import { DiplomaToken } from '../../types/web3';

const DiplomaViewer: React.FC = () => {
  const { getUserDiplomas, getDiplomaDetails } = useContracts();
  const { account, isConnected } = useWeb3();

  const [diplomas, setDiplomas] = useState<DiplomaToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les diplômes de l'utilisateur
  const loadUserDiplomas = async () => {
    if (!account || !isConnected) return;

    setIsLoading(true);
    setError(null);

    try {
      const userDiplomas = await getUserDiplomas(account);
      setDiplomas(userDiplomas);
    } catch (err: any) {
      console.error('Erreur lors du chargement des diplômes:', err);
      setError('Impossible de charger les diplômes');
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les diplômes au montage et à chaque changement de compte
  useEffect(() => {
    loadUserDiplomas();
  }, [account, isConnected]);

  if (!isConnected) {
    return (
      <div className="diploma-viewer">
        <div className="alert alert-warning">
          <p>⚠️ Veuillez connecter votre wallet pour voir vos diplômes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="diploma-viewer">
      <div className="header">
        <h2>Mes Diplômes NFT</h2>
        <button
          onClick={loadUserDiplomas}
          disabled={isLoading}
          className="btn btn-outline refresh-btn"
        >
          {isLoading ? '🔄 Chargement...' : '🔄 Actualiser'}
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <p>❌ {error}</p>
        </div>
      )}

      {isLoading && !error && (
        <div className="loading">
          <p>Chargement de vos diplômes...</p>
        </div>
      )}

      {!isLoading && diplomas.length === 0 && !error && (
        <div className="no-diplomas">
          <h3>Aucun diplôme trouvé</h3>
          <p>Vous ne possédez actuellement aucun diplôme NFT.</p>
        </div>
      )}

      {!isLoading && diplomas.length > 0 && (
        <div className="diplomas-grid">
          {diplomas.map(diploma => (
            <DiplomaCard key={diploma.id} diploma={diploma} />
          ))}
        </div>
      )}

      <style jsx>{`
        .diploma-viewer {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header h2 {
          color: #333;
          margin: 0;
        }

        .refresh-btn {
          padding: 0.5rem 1rem;
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

        .loading,
        .no-diplomas {
          text-align: center;
          padding: 3rem;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .no-diplomas h3 {
          color: #6c757d;
          margin-bottom: 1rem;
        }

        .no-diplomas p {
          color: #6c757d;
        }

        .diplomas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
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

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: stretch;
          }

          .diplomas-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

// Composant pour afficher une carte de diplôme
const DiplomaCard: React.FC<{ diploma: DiplomaToken }> = ({ diploma }) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const openInExplorer = () => {
    if (diploma.tokenURI.startsWith('ipfs://')) {
      const cid = diploma.tokenURI.replace('ipfs://', '');
      window.open(`https://ipfs.io/ipfs/${cid}`, '_blank');
    }
  };

  return (
    <div className="diploma-card">
      <div className="diploma-header">
        <h3>{diploma.metadata.diplomaTitle}</h3>
        <span className="token-id">#{diploma.id}</span>
      </div>

      <div className="diploma-content">
        <div className="field">
          <label>Étudiant:</label>
          <span>{diploma.metadata.studentName}</span>
        </div>

        <div className="field">
          <label>Institution:</label>
          <span>{diploma.metadata.institution}</span>
        </div>

        <div className="field">
          <label>Date d'émission:</label>
          <span>{formatDate(diploma.metadata.issueDate)}</span>
        </div>

        <div className="field">
          <label>Propriétaire:</label>
          <span className="address">
            {diploma.owner.substring(0, 6)}...{diploma.owner.substring(38)}
          </span>
        </div>
      </div>

      <div className="diploma-actions">
        {diploma.metadata.ipfsCID && (
          <button onClick={openInExplorer} className="btn btn-primary">
            📄 Voir sur IPFS
          </button>
        )}
      </div>

      <style jsx>{`
        .diploma-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }

        .diploma-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }

        .diploma-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e9ecef;
        }

        .diploma-header h3 {
          color: #333;
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
          flex: 1;
          margin-right: 1rem;
        }

        .token-id {
          background: #007bff;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .diploma-content {
          margin-bottom: 1.5rem;
        }

        .field {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          padding: 0.5rem 0;
        }

        .field label {
          font-weight: 500;
          color: #495057;
          flex: 1;
        }

        .field span {
          flex: 2;
          text-align: right;
          color: #333;
        }

        .address {
          font-family: monospace;
          font-size: 0.9rem;
        }

        .diploma-actions {
          border-top: 1px solid #e9ecef;
          padding-top: 1rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default DiplomaViewer;
