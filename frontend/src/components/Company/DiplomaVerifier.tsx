'use client';

import React, { useState } from 'react';
import { useCompany, DiplomaVerification } from '../../hooks/useCompany';
import styles from './DiplomaVerifier.module.scss';

interface DiplomaVerifierProps {
  onVerificationComplete?: (verification: DiplomaVerification) => void;
}

const DiplomaVerifier: React.FC<DiplomaVerifierProps> = ({
  onVerificationComplete,
}) => {
  const { verifyDiploma, payForVerification, isLoading, error } = useCompany();

  const [tokenId, setTokenId] = useState('');
  const [verification, setVerification] = useState<DiplomaVerification | null>(
    null
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleVerify = async () => {
    if (!tokenId.trim()) {
      return;
    }

    setIsVerifying(true);
    setShowResult(false);

    try {
      const result = await verifyDiploma(parseInt(tokenId));
      setVerification(result);
      setShowResult(true);

      if (result && onVerificationComplete) {
        onVerificationComplete(result);
      }
    } catch (err) {
      console.error('Erreur lors de la vérification:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePayForVerification = async () => {
    setIsPaying(true);
    try {
      const success = await payForVerification();
      if (success) {
        // Optionnel : marquer la vérification comme payée
        console.log('Paiement effectué avec succès');
      }
    } catch (err) {
      console.error('Erreur lors du paiement:', err);
    } finally {
      setIsPaying(false);
    }
  };

  const resetForm = () => {
    setTokenId('');
    setVerification(null);
    setShowResult(false);
  };

  return (
    <div className={styles.diplomaVerifier}>
      <div className={styles.header}>
        <h3 className={styles.title}>🔍 Vérification de Diplôme</h3>
        <p className={styles.subtitle}>
          Vérifiez l'authenticité d'un diplôme en saisissant son ID de token NFT
        </p>
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label htmlFor="tokenId" className={styles.label}>
            ID du Token NFT
          </label>
          <div className={styles.inputContainer}>
            <input
              id="tokenId"
              type="number"
              value={tokenId}
              onChange={e => setTokenId(e.target.value)}
              placeholder="Saisissez l'ID du token (ex: 1, 2, 3...)"
              className={styles.input}
              disabled={isVerifying}
            />
            <button
              onClick={handleVerify}
              disabled={!tokenId.trim() || isVerifying}
              className={styles.verifyButton}
            >
              {isVerifying ? 'Vérification...' : 'Vérifier'}
            </button>
          </div>
        </div>

        <div className={styles.info}>
          <p>
            💡 L'ID du token se trouve généralement sur le CV ou certificat du
            candidat
          </p>
          <p>💰 Coût de vérification : 10 DIPTOK</p>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          <p>❌ {error}</p>
        </div>
      )}

      {showResult && verification && (
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <div className={styles.statusIcon}>
              {verification.isValid ? '✅' : '❌'}
            </div>
            <h4 className={styles.resultTitle}>
              {verification.isValid
                ? 'Diplôme Authentique'
                : 'Diplôme Non Valide'}
            </h4>
          </div>

          <div className={styles.diplomaDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Étudiant :</span>
              <span className={styles.detailValue}>
                {verification.studentName}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Diplôme :</span>
              <span className={styles.detailValue}>
                {verification.diplomaTitle}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Institution :</span>
              <span className={styles.detailValue}>
                {verification.institution}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Date d'émission :</span>
              <span className={styles.detailValue}>
                {verification.issueDate}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Token ID :</span>
              <span className={styles.detailValue}>
                #{verification.tokenId}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Vérifié le :</span>
              <span className={styles.detailValue}>
                {verification.verificationDate.toLocaleDateString('fr-FR')} à{' '}
                {verification.verificationDate.toLocaleTimeString('fr-FR')}
              </span>
            </div>

            {verification.ipfsCID && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>IPFS CID :</span>
                <span className={styles.detailValue}>
                  <a
                    href={`https://ipfs.io/ipfs/${verification.ipfsCID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ipfsLink}
                  >
                    {verification.ipfsCID.substring(0, 10)}...
                  </a>
                </span>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button
              onClick={handlePayForVerification}
              disabled={isPaying}
              className={styles.payButton}
            >
              {isPaying ? 'Paiement...' : 'Payer la vérification (10 DIPTOK)'}
            </button>

            <button onClick={resetForm} className={styles.resetButton}>
              Nouvelle vérification
            </button>
          </div>
        </div>
      )}

      {showResult && !verification && (
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <div className={styles.statusIcon}>❌</div>
            <h4 className={styles.resultTitle}>Diplôme Non Trouvé</h4>
          </div>

          <div className={styles.errorMessage}>
            <p>Aucun diplôme trouvé avec l'ID #{tokenId}</p>
            <p>
              Vérifiez que l'ID est correct ou que le diplôme existe dans la
              blockchain.
            </p>
          </div>

          <div className={styles.actions}>
            <button onClick={resetForm} className={styles.resetButton}>
              Essayer un autre ID
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiplomaVerifier;
