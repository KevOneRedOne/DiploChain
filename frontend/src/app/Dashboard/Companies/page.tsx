'use client';

import Header from '../../../components/Header';
import { useState } from 'react';
import styles from './index.module.scss';

export default function CompaniesPage() {
  const [activeTab, setActiveTab] = useState('overview');

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
          <p className={styles.subtitle}>Vérifiez les diplômes et évaluez vos candidats</p>
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
              <div className={styles.welcomeCard}>
                <h2 className={styles.welcomeTitle}>Centre de Vérification RH 🏢</h2>
                <p className={styles.welcomeText}>
                  Vérifiez instantanément l'authenticité des diplômes et évaluez vos candidats avec la blockchain.
                </p>
                <div className={styles.actionButtons}>
                  <button className={styles.primaryAction}>
                    Vérifier un diplôme
                  </button>
                  <button className={styles.secondaryAction}>
                    Évaluer un candidat
                  </button>
                </div>
              </div>

              <div className={styles.recentActivity}>
                <h3 className={styles.sectionTitle}>Activité Récente</h3>
                <div className={styles.activityList}>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>✅</div>
                    <div>
                      <div className={styles.activityTitle}>Diplôme vérifié</div>
                      <div className={styles.activityDate}>Master IA de Sophie Martin - il y a 2 heures</div>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>⭐</div>
                    <div>
                      <div className={styles.activityTitle}>Candidat évalué</div>
                      <div className={styles.activityDate}>Thomas Dubois - 4.5/5 étoiles - il y a 1 jour</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verifications' && (
            <div className={styles.verificationsSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Historique des Vérifications</h3>
                <button className={styles.addButton}>+ Nouvelle vérification</button>
              </div>
              
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.tableHeader}>
                    <tr>
                      <th className={styles.th}>Candidat</th>
                      <th className={styles.th}>Diplôme</th>
                      <th className={styles.th}>Institution</th>
                      <th className={styles.th}>Statut</th>
                      <th className={styles.th}>Date</th>
                      <th className={styles.th}>Coût</th>
                      <th className={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockVerifications.map((verification) => (
                      <tr key={verification.id} className={styles.tableRow}>
                        <td className={styles.td}>{verification.candidate}</td>
                        <td className={styles.td}>{verification.diploma}</td>
                        <td className={styles.td}>{verification.institution}</td>
                        <td className={styles.td}>
                          <span className={styles.statusBadge}>✅ {verification.status}</span>
                        </td>
                        <td className={styles.td}>{verification.date}</td>
                        <td className={styles.td}>{verification.cost}</td>
                        <td className={styles.td}>
                          <button className={styles.actionBtn}>Voir Détails</button>
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
                <h3 className={styles.sectionTitle}>Candidats Évalués</h3>
                <button className={styles.addButton}>+ Évaluer un candidat</button>
              </div>
              
              <div className={styles.candidatesGrid}>
                {mockCandidates.map((candidate) => (
                  <div key={candidate.id} className={styles.candidateCard}>
                    <div className={styles.candidateHeader}>
                      <div className={styles.candidateIcon}>👤</div>
                      <div className={styles.ratingDisplay}>
                        <span className={styles.ratingStars}>
                          {'⭐'.repeat(Math.floor(candidate.rating))}
                        </span>
                        <span className={styles.ratingNumber}>{candidate.rating}/5</span>
                      </div>
                    </div>
                    <h4 className={styles.candidateName}>{candidate.name}</h4>
                    <p className={styles.candidatePosition}>{candidate.position}</p>
                    <p className={styles.candidateDiplomas}>{candidate.diplomas} diplôme(s) vérifié(s)</p>
                    <div className={styles.candidateActions}>
                      <button className={styles.viewButton}>Voir Profil</button>
                      <button className={styles.evaluateButton}>Évaluer</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
