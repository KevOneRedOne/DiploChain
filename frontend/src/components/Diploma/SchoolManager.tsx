'use client';

import React, { useState } from 'react';
import { useContracts } from '../../context/ContractContext';
import { useWeb3 } from '../../context/Web3Context';

const SchoolManager: React.FC = () => {
  const {
    addAccreditedSchool,
    isSchoolAccredited,
    isTransactionPending,
    error,
    lastTransactionHash,
  } = useContracts();

  const { account, isConnected } = useWeb3();

  const [schoolAddress, setSchoolAddress] = useState('');
  const [checkAddress, setCheckAddress] = useState('');
  const [accreditationStatus, setAccreditationStatus] = useState<
    boolean | null
  >(null);
  const [isChecking, setIsChecking] = useState(false);

  // Ajouter une école accréditée
  const handleAddSchool = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!schoolAddress.trim()) {
      alert("Veuillez entrer une adresse d'école valide");
      return;
    }

    try {
      await addAccreditedSchool(schoolAddress);
      setSchoolAddress('');
      alert('École ajoutée avec succès !');
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'école:", err);
    }
  };

  // Vérifier le statut d'accréditation d'une école
  const handleCheckAccreditation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkAddress.trim()) {
      alert('Veuillez entrer une adresse à vérifier');
      return;
    }

    setIsChecking(true);
    try {
      const status = await isSchoolAccredited(checkAddress);
      setAccreditationStatus(status);
    } catch (err) {
      console.error('Erreur lors de la vérification:', err);
      setAccreditationStatus(null);
    } finally {
      setIsChecking(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="school-manager">
        <div className="alert alert-warning">
          <p>⚠️ Veuillez connecter votre wallet pour gérer les écoles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="school-manager">
      <h2>Gestionnaire d'Écoles Accréditées</h2>

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

      {/* Section d'ajout d'école */}
      <div className="add-school-section">
        <h3>Ajouter une École Accréditée</h3>
        <div className="add-school-card">
          <p className="info-text">
            ⚠️ Fonction réservée au propriétaire du contrat
          </p>
          <form onSubmit={handleAddSchool}>
            <div className="form-group">
              <label htmlFor="schoolAddress">
                Adresse de l'école à accréditer:
              </label>
              <input
                type="text"
                id="schoolAddress"
                value={schoolAddress}
                onChange={e => setSchoolAddress(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isTransactionPending}
              className="btn btn-primary"
            >
              {isTransactionPending
                ? 'Ajout en cours...'
                : "Accréditer l'École"}
            </button>
          </form>
        </div>
      </div>

      {/* Section de vérification d'accréditation */}
      <div className="check-school-section">
        <h3>Vérifier l'Accréditation</h3>
        <div className="check-school-card">
          <form onSubmit={handleCheckAccreditation}>
            <div className="form-group">
              <label htmlFor="checkAddress">
                Adresse de l'école à vérifier:
              </label>
              <input
                type="text"
                id="checkAddress"
                value={checkAddress}
                onChange={e => setCheckAddress(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isChecking}
              className="btn btn-secondary"
            >
              {isChecking
                ? 'Vérification en cours...'
                : "Vérifier l'Accréditation"}
            </button>
          </form>

          {accreditationStatus !== null && checkAddress && (
            <div
              className={`status-result ${accreditationStatus ? 'accredited' : 'not-accredited'}`}
            >
              {accreditationStatus ? (
                <p>✅ Cette école est accréditée</p>
              ) : (
                <p>❌ Cette école n'est pas accréditée</p>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .school-manager {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .school-manager h2 {
          margin-bottom: 2rem;
          color: #333;
          text-align: center;
        }

        .school-manager h3 {
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

        .add-school-section,
        .check-school-section {
          margin-bottom: 2rem;
        }

        .add-school-card,
        .check-school-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .info-text {
          color: #6c757d;
          font-size: 0.9rem;
          font-style: italic;
          margin-bottom: 1rem;
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
          width: 100%;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #0056b3;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: #545b62;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-result {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 4px;
          text-align: center;
        }

        .status-result.accredited {
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
          color: #155724;
        }

        .status-result.not-accredited {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }

        .status-result p {
          margin: 0;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default SchoolManager;
