'use client';

import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { useContract } from '../../../hooks/useContract';
import styles from './index.module.scss';

// Types pour les données
interface Student {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

interface DiplomaDetails {
  id: number;
  title: string;
  institution: string;
  date: string;
  metadataURI: string;
}

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [studentInfo, setStudentInfo] = useState<Student | null>(null);
  const [diplomas, setDiplomas] = useState<DiplomaDetails[]>([]);
  const [selectedDiploma, setSelectedDiploma] = useState<number | null>(null);
  const [diplomaDetails, setDiplomaDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [transferAddress, setTransferAddress] = useState('');

  const { 
    account, 
    getStudentInfo, 
    getStudentDiplomas, 
    getDiplomaDetails, 
    transferDiploma 
  } = useContract();

  // Charger les données au montage du composant
  useEffect(() => {
    if (account) {
      loadStudentData();
    }
  }, [account]);

  const loadStudentData = async () => {
    if (!account) return;
    
    setLoading(true);
    try {
      // 1. Récupérer les informations personnelles de l'étudiant
      const studentData = await getStudentInfo(account);
      setStudentInfo(studentData);

      // 2. Récupérer la liste des diplômes possédés
      const diplomasData = await getStudentDiplomas(account);
      setDiplomas(diplomasData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les détails d'un diplôme spécifique
  const loadDiplomaDetails = async (tokenId: number) => {
    setSelectedDiploma(tokenId);
    try {
      const details = await getDiplomaDetails(tokenId);
      setDiplomaDetails(details);
    } catch (error) {
      console.error('Erreur lors du chargement des détails du diplôme:', error);
    }
  };

  // Transférer un diplôme vers un autre wallet
  const handleTransferDiploma = async (tokenId: number) => {
    if (!transferAddress) {
      alert('Veuillez entrer une adresse de destination valide');
      return;
    }

    try {
      const success = await transferDiploma(transferAddress, tokenId);
      if (success) {
        alert('Diplôme transféré avec succès !');
        loadStudentData(); // Recharger les données
        setTransferAddress('');
      } else {
        alert('Erreur lors du transfert du diplôme');
      }
    } catch (error) {
      console.error('Erreur lors du transfert:', error);
      alert('Erreur lors du transfert du diplôme');
    }
  };

  if (loading) {
    return (
      <div className="students-page">
        <Header />
        <div className={styles.container}>
          <div className={styles.loading}>
            <span className={styles.spinner}></span>
            <p>Chargement des données blockchain...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="students-page">
        <Header />
        <div className={styles.container}>
          <div className={styles.noWallet}>
            <h2>🦊 Connexion Required</h2>
            <p>Veuillez connecter votre wallet MetaMask pour accéder à vos diplômes NFT.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="students-page">
      <Header />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🎓 Espace Étudiant</h1>
          <p className={styles.subtitle}>
            Gérez vos diplômes NFT et consultez vos informations blockchain
          </p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📜</div>
            <div className={styles.statNumber}>{diplomas.length}</div>
            <div className={styles.statLabel}>Diplômes NFT</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👤</div>
            <div className={styles.statNumber}>{studentInfo ? '✓' : '✗'}</div>
            <div className={styles.statLabel}>Profil Vérifié</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🔗</div>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Blockchain</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabNav}>
          <button
            className={`${styles.tabButton} ${activeTab === 'profile' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Mon Profil
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'diplomas' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('diplomas')}
          >
            Mes Diplômes NFT
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'details' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Détails Diplôme
          </button>
        </div>

        {/* Content based on active tab */}
        <div className={styles.content}>
          
          {/* 1. Onglet Profil - Informations personnelles */}
          {activeTab === 'profile' && (
            <div className={styles.profileSection}>
              <div className={styles.profileCard}>
                <h3 className={styles.sectionTitle}>📋 Informations Personnelles</h3>
                {studentInfo ? (
                  <div className={styles.profileInfo}>
                    <div className={styles.profileField}>
                      <span className={styles.fieldLabel}>ID Étudiant:</span>
                      <span className={styles.fieldValue}>{studentInfo.id}</span>
                    </div>
                    <div className={styles.profileField}>
                      <span className={styles.fieldLabel}>Nom:</span>
                      <span className={styles.fieldValue}>{studentInfo.nom}</span>
                    </div>
                    <div className={styles.profileField}>
                      <span className={styles.fieldLabel}>Prénom:</span>
                      <span className={styles.fieldValue}>{studentInfo.prenom}</span>
                    </div>
                    <div className={styles.profileField}>
                      <span className={styles.fieldLabel}>Email:</span>
                      <span className={styles.fieldValue}>{studentInfo.email}</span>
                    </div>
                    <div className={styles.profileField}>
                      <span className={styles.fieldLabel}>Wallet:</span>
                      <span className={styles.fieldValue}>{account}</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.noProfile}>
                    <p>❌ Aucun profil étudiant trouvé pour cette adresse.</p>
                    <p>Veuillez contacter votre établissement pour vous enregistrer.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. Onglet Diplômes - Liste des diplômes possédés */}
          {activeTab === 'diplomas' && (
            <div className={styles.diplomasSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>🎓 Mes Diplômes NFT</h3>
                <p>Diplômes possédés: {diplomas.length}</p>
              </div>

              {diplomas.length > 0 ? (
                <div className={styles.diplomasGrid}>
                  {diplomas.map(diploma => (
                    <div key={diploma.id} className={styles.diplomaCard}>
                      <div className={styles.diplomaHeader}>
                        <div className={styles.diplomaIcon}>🎓</div>
                        <div className={styles.verifiedBadge}>✅ NFT</div>
                      </div>
                      <h4 className={styles.diplomaTitle}>{diploma.title}</h4>
                      <p className={styles.diplomaInstitution}>{diploma.institution}</p>
                      <p className={styles.diplomaDate}>Obtenu le {diploma.date}</p>
                      <div className={styles.nftInfo}>
                        <span className={styles.nftLabel}>Token ID:</span>
                        <span className={styles.nftId}>#{diploma.id}</span>
                      </div>
                      {diploma.metadataURI && (
                        <div className={styles.metadataInfo}>
                          <span className={styles.metadataLabel}>Métadonnées:</span>
                          <a href={diploma.metadataURI} target="_blank" rel="noopener noreferrer" className={styles.metadataLink}>
                            📄 Voir IPFS
                          </a>
                        </div>
                      )}
                      <div className={styles.diplomaActions}>
                        <button 
                          className={styles.viewButton}
                          onClick={() => loadDiplomaDetails(diploma.id)}
                        >
                          Voir Détails
                        </button>
                        <button 
                          className={styles.shareButton}
                          onClick={() => {
                            setSelectedDiploma(diploma.id);
                            setActiveTab('details');
                          }}
                        >
                          Transférer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noDiplomas}>
                  <h4>📭 Aucun diplôme NFT trouvé</h4>
                  <p>Vous ne possédez aucun diplôme NFT pour le moment.</p>
                  <p>Contactez votre établissement pour obtenir vos diplômes certifiés.</p>
                </div>
              )}
            </div>
          )}

          {/* 3. Onglet Détails - Profil détaillé d'un diplôme */}
          {activeTab === 'details' && (
            <div className={styles.detailsSection}>
              <h3 className={styles.sectionTitle}>🔍 Détails du Diplôme</h3>
              
              {selectedDiploma ? (
                <div className={styles.diplomaDetails}>
                  {diplomaDetails ? (
                    <div className={styles.detailsContent}>
                      <div className={styles.detailsCard}>
                        <h4>📜 Informations du Diplôme</h4>
                        <div className={styles.detailGrid}>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Token ID:</span>
                            <span className={styles.detailValue}>#{diplomaDetails.diploma.id}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Titre:</span>
                            <span className={styles.detailValue}>{diplomaDetails.diploma.title}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Institution:</span>
                            <span className={styles.detailValue}>{diplomaDetails.diploma.institution}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Date d'obtention:</span>
                            <span className={styles.detailValue}>{diplomaDetails.diploma.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.detailsCard}>
                        <h4>🏛️ École Émettrice</h4>
                        <div className={styles.detailGrid}>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Nom:</span>
                            <span className={styles.detailValue}>{diplomaDetails.school.name}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Adresse Blockchain:</span>
                            <span className={styles.detailValue}>{diplomaDetails.school.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.detailsCard}>
                        <h4>🔗 Métadonnées NFT</h4>
                        <div className={styles.tokenUri}>
                          <span className={styles.detailLabel}>Token URI:</span>
                          <a href={diplomaDetails.tokenURI} target="_blank" rel="noopener noreferrer" className={styles.uriLink}>
                            {diplomaDetails.tokenURI}
                          </a>
                        </div>
                      </div>

                      {/* Section de transfert */}
                      <div className={styles.transferCard}>
                        <h4>📤 Transférer vers un autre wallet</h4>
                        <div className={styles.transferForm}>
                          <input
                            type="text"
                            placeholder="Adresse de destination (0x...)"
                            value={transferAddress}
                            onChange={(e) => setTransferAddress(e.target.value)}
                            className={styles.transferInput}
                          />
                          <button
                            onClick={() => handleTransferDiploma(selectedDiploma)}
                            className={styles.transferButton}
                          >
                            🚀 Transférer
                          </button>
                        </div>
                        <p className={styles.transferWarning}>
                          ⚠️ Attention: Le transfert est irréversible. Vérifiez l'adresse de destination.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.loadingDetails}>
                      <span className={styles.spinner}></span>
                      <p>Chargement des détails...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.noSelection}>
                  <p>Sélectionnez un diplôme dans l'onglet "Mes Diplômes NFT" pour voir ses détails.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
