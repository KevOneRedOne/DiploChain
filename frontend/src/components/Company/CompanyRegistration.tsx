'use client';

import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { useContracts } from '../../context/ContractContext';
import styles from './CompanyRegistration.module.scss';

const CompanyRegistration: React.FC = () => {
  const { account } = useWeb3();
  const { registerCompany, isTransactionPending } = useContracts();

  const [formData, setFormData] = useState({
    address: account || '',
    id: 1,
    name: '',
    country: 'France'
  });
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.address || !formData.name || !formData.country) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs' });
      return;
    }

    try {
      setMessage(null);
      await registerCompany(
        formData.address,
        formData.id,
        formData.name,
        formData.country
      );
      
      setMessage({ 
        type: 'success', 
        text: `Entreprise "${formData.name}" enregistrée avec succès !` 
      });
      
      // Réinitialiser le formulaire
      setFormData({
        address: account || '',
        id: formData.id + 1,
        name: '',
        country: 'France'
      });
      
    } catch (error: any) {
      console.error('Erreur lors de l\'enregistrement:', error);
      setMessage({ 
        type: 'error', 
        text: `Erreur: ${error.message}` 
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'id' ? Number(value) : value
    }));
  };

  const generateTestCompanies = () => {
    const testCompanies = [
      { name: 'TechCorp Solutions', country: 'France' },
      { name: 'Innovation Labs', country: 'Allemagne' },
      { name: 'Digital Dynamics', country: 'Espagne' },
      { name: 'Future Systems', country: 'Italie' },
    ];
    
    return testCompanies[Math.floor(Math.random() * testCompanies.length)];
  };

  const fillTestData = () => {
    const testCompany = generateTestCompanies();
    setFormData(prev => ({
      ...prev,
      name: testCompany.name,
      country: testCompany.country
    }));
  };

  if (!showForm) {
    return (
      <div className={styles.companyRegistration}>
        <div className={styles.notice}>
          <h4>🏢 Enregistrement d'Entreprise</h4>
          <p>
            Votre adresse n'est pas enregistrée comme entreprise. 
            Seul l'administrateur du contrat peut enregistrer de nouvelles entreprises.
          </p>
          
          {/* Bouton pour tester (seulement si c'est l'owner du contrat) */}
          <button 
            className={styles.testButton}
            onClick={() => setShowForm(true)}
          >
            🧪 Mode Test - Enregistrer cette adresse
          </button>
          
          <div className={styles.helpText}>
            <p><strong>Pour les tests:</strong></p>
            <ul>
              <li>Utilisez le bouton ci-dessus pour vous enregistrer en tant qu'entreprise de test</li>
              <li>En production, contactez l'administrateur de la plateforme</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.companyRegistration}>
      <div className={styles.header}>
        <h4>🏢 Enregistrement d'Entreprise</h4>
        <button 
          className={styles.closeButton}
          onClick={() => setShowForm(false)}
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="address" className={styles.label}>
            Adresse Ethereum de l'entreprise
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="0x..."
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="id" className={styles.label}>
              ID Entreprise
            </label>
            <input
              id="id"
              name="id"
              type="number"
              value={formData.id}
              onChange={handleChange}
              min="1"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="country" className={styles.label}>
              Pays
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="France">France</option>
              <option value="Allemagne">Allemagne</option>
              <option value="Espagne">Espagne</option>
              <option value="Italie">Italie</option>
              <option value="Royaume-Uni">Royaume-Uni</option>
              <option value="Suisse">Suisse</option>
              <option value="Belgique">Belgique</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Nom de l'entreprise
          </label>
          <div className={styles.inputWithButton}>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom de votre entreprise"
              className={styles.input}
              required
            />
            <button 
              type="button"
              onClick={fillTestData}
              className={styles.generateButton}
            >
              🎲 Générer
            </button>
          </div>
        </div>

        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <div className={styles.actions}>
          <button 
            type="button"
            onClick={() => setShowForm(false)}
            className={styles.cancelButton}
          >
            Annuler
          </button>
          
          <button 
            type="submit"
            disabled={isTransactionPending}
            className={styles.submitButton}
          >
            {isTransactionPending ? 'Enregistrement...' : 'Enregistrer l\'entreprise'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegistration; 