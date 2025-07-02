'use client';

import Header from '../../../components/Header';
import { useState, useEffect } from 'react';
import { useWeb3 } from '../../../context/Web3Context';
import { useCompany, DiplomaVerification } from '../../../hooks/useCompany';
import CompanyProfile from '../../../components/Company/CompanyProfile';
import DiplomaVerifier from '../../../components/Company/DiplomaVerifier';
import StudentEvaluator from '../../../components/Company/StudentEvaluator';
import styles from './index.module.scss';

export default function CompaniesPage() {
  const { isConnected } = useWeb3();
  const { getVerificationHistory } = useCompany();

  const [activeTab, setActiveTab] = useState('overview');
  const [verifications, setVerifications] = useState<DiplomaVerification[]>([]);
  const [verificationHistory, setVerificationHistory] = useState<any[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);

  // Charger l'historique des vérifications
  useEffect(() => {
    const loadHistory = async () => {
      if (isConnected) {
        try {
          const history = await getVerificationHistory();
          setVerificationHistory(history);
        } catch (err) {
          console.error("Erreur lors du chargement de l'historique:", err);
        }
      }
    };

    loadHistory();
  }, [isConnected, getVerificationHistory]);

  // Gérer l'ajout d'une nouvelle vérification
  const handleVerificationComplete = (verification: DiplomaVerification) => {
    setVerifications(prev => [verification, ...prev]);
  };

  // Gérer l'achat de tokens
  const handleTokensPurchased = () => {
    // Recharger l'historique après achat de tokens
    if (isConnected) {
      getVerificationHistory().then(setVerificationHistory);
    }
  };

  // Gérer la completion d'une évaluation
  const handleEvaluationComplete = (evaluation: any) => {
    setEvaluations(prev => [evaluation, ...prev]);
  };

  const mockVerifications = [
    {
      id: 1,
      candidate: 'Sophie Martin',
      diploma: 'Master Intelligence Artificielle',
      institution: 'Université Paris Sorbonne',
      status: 'Vérifié',
      date: '2024-03-15',
      cost: '0.01 ETH',
    },
    {
      id: 2,
      candidate: 'Thomas Dubois',
      diploma: 'Licence Data Science',
      institution: 'École Polytechnique',
      status: 'En cours',
      date: '2024-03-14',
      cost: '0.01 ETH',
    },
  ];

  const mockCandidates = [
    {
      id: 1,
      name: 'Sophie Martin',
      position: 'Développeur IA Senior',
      diplomas: 2,
      rating: 4.8,
      lastEvaluation: '2024-02-20',
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      position: 'Data Scientist',
      diplomas: 1,
      rating: 4.5,
      lastEvaluation: '2024-01-15',
    },
  ];

  return (
    <div className="companies-page">
      <Header />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🏢 Espace Entreprise</h1>
          <p className={styles.subtitle}>
            Vérifiez les diplômes et évaluez vos candidats
          </p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🔍</div>
            <div className={styles.statNumber}>{mockVerifications.length}</div>
            <div className={styles.statLabel}>Vérifications</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👔</div>
            <div className={styles.statNumber}>{mockCandidates.length}</div>
            <div className={styles.statLabel}>Candidats Évalués</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statNumber}>0.02</div>
            <div className={styles.statLabel}>ETH Dépensé</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⚡</div>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Taux de Succès</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabNav}>
          <button
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Vue d'ensemble
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'verifications' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('verifications')}
          >
            Vérifications
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'candidates' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            Candidats
          </button>
        </div>

        {/* Content based on active tab */}
        <div className={styles.content}>
          {activeTab === 'overview' && (
            <div className={styles.overview}>
              {/* Profil de l'entreprise */}
              <CompanyProfile onBuyTokens={handleTokensPurchased} />

              {/* Vérification de diplômes */}
              <DiplomaVerifier
                onVerificationComplete={handleVerificationComplete}
              />

              <div className={styles.recentActivity}>
                <h3 className={styles.sectionTitle}>Vérifications Récentes</h3>
                {verifications.length > 0 ? (
                  <div className={styles.activityList}>
                    {verifications.slice(0, 5).map((verification, index) => (
                      <div key={index} className={styles.activityItem}>
                        <div className={styles.activityIcon}>
                          {verification.isValid ? '✅' : '❌'}
                        </div>
                        <div>
                          <div className={styles.activityTitle}>
                            {verification.isValid
                              ? 'Diplôme vérifié'
                              : 'Vérification échouée'}
                          </div>
                          <div className={styles.activityDate}>
                            {verification.diplomaTitle} de{' '}
                            {verification.studentName} -{' '}
                            {verification.verificationDate.toLocaleDateString(
                              'fr-FR'
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <p>Aucune vérification récente</p>
                    <p>
                      Utilisez l'outil ci-dessus pour vérifier votre premier
                      diplôme
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'verifications' && (
            <div className={styles.verificationsSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>
                  Historique des Vérifications
                </h3>
              </div>

              {/* Vérification de diplômes */}
              <DiplomaVerifier
                onVerificationComplete={handleVerificationComplete}
              />

              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.tableHeader}>
                    <tr>
                      <th className={styles.th}>Token ID</th>
                      <th className={styles.th}>Candidat</th>
                      <th className={styles.th}>Diplôme</th>
                      <th className={styles.th}>Institution</th>
                      <th className={styles.th}>Statut</th>
                      <th className={styles.th}>Date</th>
                      <th className={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifications.length > 0 ? (
                      verifications.map((verification, index) => (
                        <tr key={index} className={styles.tableRow}>
                          <td className={styles.td}>#{verification.tokenId}</td>
                          <td className={styles.td}>
                            {verification.studentName}
                          </td>
                          <td className={styles.td}>
                            {verification.diplomaTitle}
                          </td>
                          <td className={styles.td}>
                            {verification.institution}
                          </td>
                          <td className={styles.td}>
                            <span className={styles.statusBadge}>
                              {verification.isValid
                                ? '✅ Vérifié'
                                : '❌ Non valide'}
                            </span>
                          </td>
                          <td className={styles.td}>
                            {verification.verificationDate.toLocaleDateString(
                              'fr-FR'
                            )}
                          </td>
                          <td className={styles.td}>
                            {verification.ipfsCID && (
                              <a
                                href={`https://ipfs.io/ipfs/${verification.ipfsCID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.actionBtn}
                              >
                                Voir IPFS
                              </a>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className={styles.emptyRow}>
                          Aucune vérification effectuée
                        </td>
                      </tr>
                    )}

                    {/* Afficher aussi les anciennes vérifications mock pour demo */}
                    {mockVerifications.map(verification => (
                      <tr key={verification.id} className={styles.tableRow}>
                        <td className={styles.td}>-</td>
                        <td className={styles.td}>{verification.candidate}</td>
                        <td className={styles.td}>{verification.diploma}</td>
                        <td className={styles.td}>
                          {verification.institution}
                        </td>
                        <td className={styles.td}>
                          <span className={styles.statusBadge}>
                            ✅ {verification.status}
                          </span>
                        </td>
                        <td className={styles.td}>{verification.date}</td>
                        <td className={styles.td}>
                          <button className={styles.actionBtn}>
                            Voir Détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'candidates' && (
            <div className={styles.candidatesSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Gestion des Candidats</h3>
              </div>

              {/* Composant d'évaluation des étudiants */}
              <StudentEvaluator
                onEvaluationComplete={handleEvaluationComplete}
              />

              {/* Historique des évaluations */}
              <div className={styles.evaluationsHistory}>
                <h4 className={styles.sectionTitle}>Évaluations Récentes</h4>
                {evaluations.length > 0 ? (
                  <div className={styles.candidatesGrid}>
                    {evaluations.map((evaluation, index) => (
                      <div key={index} className={styles.candidateCard}>
                        <div className={styles.candidateHeader}>
                          <div className={styles.candidateIcon}>👤</div>
                          <div className={styles.ratingDisplay}>
                            <span className={styles.ratingStars}>
                              {'⭐'.repeat(evaluation.rating)}
                            </span>
                            <span className={styles.ratingNumber}>
                              {evaluation.rating}/5
                            </span>
                          </div>
                        </div>

                        <h4 className={styles.candidateName}>
                          {evaluation.studentName}
                        </h4>
                        <p className={styles.candidatePosition}>
                          {evaluation.position}
                        </p>
                        <p className={styles.candidateDiplomas}>
                          {evaluation.skills.length} compétence(s) évaluée(s)
                        </p>
                        <p className={styles.evaluationDate}>
                          Évalué le{' '}
                          {evaluation.evaluationDate.toLocaleDateString(
                            'fr-FR'
                          )}
                        </p>

                        <div className={styles.candidateActions}>
                          <button className={styles.viewButton}>
                            Voir détails
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <p>Aucune évaluation effectuée</p>
                    <p>
                      Utilisez l'outil ci-dessus pour évaluer votre premier
                      stagiaire
                    </p>
                  </div>
                )}
              </div>

              {/* Candidats mockés pour la démo */}
              <div className={styles.mockCandidates}>
                <h4 className={styles.sectionTitle}>Candidats d'Exemple</h4>
                <div className={styles.candidatesGrid}>
                  {mockCandidates.map(candidate => (
                    <div key={candidate.id} className={styles.candidateCard}>
                      <div className={styles.candidateHeader}>
                        <div className={styles.candidateIcon}>👤</div>
                        <div className={styles.ratingDisplay}>
                          <span className={styles.ratingStars}>
                            {'⭐'.repeat(Math.floor(candidate.rating))}
                          </span>
                          <span className={styles.ratingNumber}>
                            {candidate.rating}/5
                          </span>
                        </div>
                      </div>
                      <h4 className={styles.candidateName}>{candidate.name}</h4>
                      <p className={styles.candidatePosition}>
                        {candidate.position}
                      </p>
                      <p className={styles.candidateDiplomas}>
                        {candidate.diplomas} diplôme(s) vérifié(s)
                      </p>
                      <div className={styles.candidateActions}>
                        <button className={styles.viewButton}>
                          Voir Profil
                        </button>
                        <button className={styles.evaluateButton}>
                          Évaluer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
