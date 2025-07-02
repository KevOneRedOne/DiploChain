'use client';

import React, { useState } from 'react';
import { useContracts } from '../../context/ContractContext';
import { useWeb3 } from '../../context/Web3Context';

const DiplomaMinter: React.FC = () => {
  const { mintDiploma, isTransactionPending, error, lastTransactionHash } = useContracts();
  const { account, isConnected } = useWeb3();

  const [formData, setFormData] = useState({
    studentAddress: '',
    studentName: '',
    diplomaTitle: '',
    institution: '',
    issueDate: '',
    ipfsCID: '',
  });

  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Veuillez connecter votre wallet');
      return;
    }

    try {
      setSuccess(false);
      
      await mintDiploma(
        formData.studentAddress,
        formData.studentName,
        formData.diplomaTitle,
        formData.institution,
        formData.issueDate,
        formData.ipfsCID
      );

      setSuccess(true);
      
      // Réinitialiser le formulaire
      setFormData({
        studentAddress: '',
        studentName: '',
        diplomaTitle: '',
        institution: '',
        issueDate: '',
        ipfsCID: '',
      });

    } catch (err) {
      console.error('Erreur lors du mint:', err);
    }
  };

  if (!isConnected) {
    return (
      <div className="diploma-minter">
        <div className="alert alert-warning">
          <p>⚠️ Veuillez connecter votre wallet pour minter des diplômes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="diploma-minter">
      <h2>Minter un Diplôme NFT</h2>
      
      {error && (
        <div className="alert alert-error">
          <p>❌ {error}</p>
        </div>
      )}

      {success && lastTransactionHash && (
        <div className="alert alert-success">
          <p>✅ Diplôme minté avec succès!</p>
          <p>Transaction: {lastTransactionHash.substring(0, 10)}...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="diploma-form">
        <div className="form-group">
          <label htmlFor="studentAddress">Adresse de l'étudiant *</label>
          <input
            type="text"
            id="studentAddress"
            name="studentAddress"
            value={formData.studentAddress}
            onChange={handleInputChange}
            placeholder="0x..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="studentName">Nom de l'étudiant *</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            placeholder="Jean Dupont"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="diplomaTitle">Titre du diplôme *</label>
          <input
            type="text"
            id="diplomaTitle"
            name="diplomaTitle"
            value={formData.diplomaTitle}
            onChange={handleInputChange}
            placeholder="Master en Informatique"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="institution">Institution *</label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
            placeholder="Université de Paris"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="issueDate">Date d'émission *</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ipfsCID">CID IPFS du document *</label>
          <input
            type="text"
            id="ipfsCID"
            name="ipfsCID"
            value={formData.ipfsCID}
            onChange={handleInputChange}
            placeholder="QmHash..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isTransactionPending}
          className="btn btn-primary"
        >
          {isTransactionPending ? 'Minting en cours...' : 'Minter le Diplôme'}
        </button>
      </form>

      <style jsx>{`
        .diploma-minter {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }

        .diploma-minter h2 {
          margin-bottom: 1.5rem;
          color: #333;
          text-align: center;
        }

        .alert {
          padding: 1rem;
          margin-bottom: 1rem;
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

        .diploma-form {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #495057;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.15s ease-in-out;
        }

        .form-group input:focus,
        .form-group textarea:focus {
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

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default DiplomaMinter; 