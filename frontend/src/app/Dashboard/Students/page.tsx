'use client';

import Header from '../../../components/Header';
import { useState } from 'react';
import styles from './index.module.scss';

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const mockDiplomas = [
    {
      id: 1,
      title: 'Master en Informatique',
      institution: 'Université Paris Sorbonne',
      date: '2024-06-15',
      verified: true,
      nftId: '#0x1a2b3c',
    },
    {
      id: 2,
      title: 'Licence en Mathématiques',
      institution: 'École Polytechnique',
      date: '2022-06-20',
      verified: true,
      nftId: '#0x4d5e6f',
    },
  ];

  const mockEvaluations = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      position: 'Développeur Frontend',
      rating: 4.8,
      date: '2024-03-15',
      comments: 'Excellent travail, très professionnel',
    },
    {
      id: 2,
      company: 'Digital Innovations',
      position: 'Stagiaire Data Science',
      rating: 4.5,
      date: '2023-09-10',
      comments: 'Très bon niveau technique',
    },
  ];

  return (
    <div className="students-page">
      <Header />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🎓 Espace Étudiant</h1>
          <p className={styles.subtitle}>Gérez vos diplômes et consultez vos évaluations</p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📜</div>
            <div className={styles.statNumber}>{mockDiplomas.length}</div>
            <div className={styles.statLabel}>Diplômes NFT</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⭐</div>
            <div className={styles.statNumber}>4.7</div>
            <div className={styles.statLabel}>Note Moyenne</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💼</div>
            <div className={styles.statNumber}>{mockEvaluations.length}</div>
            <div className={styles.statLabel}>Évaluations</div>
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
            className={`${styles.tabButton} ${activeTab === 'diplomas' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('diplomas')}
          >
            Mes Diplômes
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'evaluations' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('evaluations')}
          >
            Évaluations
          </button>
        </div>

        {/* Content based on active tab */}
        <div className={styles.content}>
          {activeTab === 'overview' && (
            <div className={styles.overview}>
              <div className={styles.welcomeCard}>
                <h2 className={styles.welcomeTitle}>Bienvenue sur DiploChain ! 🚀</h2>
                <p className={styles.welcomeText}>
                  Votre profil étudiant vous permet de gérer vos diplômes numériques et de consulter vos évaluations professionnelles.
                </p>
                <div className={styles.actionButtons}>
                  <button className={styles.primaryAction}>
                    Demander un nouveau diplôme
                  </button>
                  <button className={styles.secondaryAction}>
                    Partager mon profil
                  </button>
                </div>
              </div>

              <div className={styles.recentActivity}>
                <h3 className={styles.sectionTitle}>Activité Récente</h3>
                <div className={styles.activityList}>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>🎓</div>
                    <div>
                      <div className={styles.activityTitle}>Diplôme vérifié</div>
                      <div className={styles.activityDate}>Master en Informatique - il y a 2 jours</div>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>⭐</div>
                    <div>
                      <div className={styles.activityTitle}>Nouvelle évaluation reçue</div>
                      <div className={styles.activityDate}>TechCorp Solutions - il y a 1 semaine</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diplomas' && (
            <div className={styles.diplomasSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Mes Diplômes NFT</h3>
                <button className={styles.addButton}>+ Ajouter un diplôme</button>
              </div>
              
              <div className={styles.diplomasGrid}>
                {mockDiplomas.map((diploma) => (
                  <div key={diploma.id} className={styles.diplomaCard}>
                    <div className={styles.diplomaHeader}>
                      <div className={styles.diplomaIcon}>🎓</div>
                      <div className={styles.verifiedBadge}>✅ Vérifié</div>
                    </div>
                    <h4 className={styles.diplomaTitle}>{diploma.title}</h4>
                    <p className={styles.diplomaInstitution}>{diploma.institution}</p>
                    <p className={styles.diplomaDate}>Obtenu le {diploma.date}</p>
                    <div className={styles.nftInfo}>
                      <span className={styles.nftLabel}>Token ID:</span>
                      <span className={styles.nftId}>{diploma.nftId}</span>
                    </div>
                    <div className={styles.diplomaActions}>
                      <button className={styles.viewButton}>Voir le NFT</button>
                      <button className={styles.shareButton}>Partager</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'evaluations' && (
            <div className={styles.evaluationsSection}>
              <h3 className={styles.sectionTitle}>Mes Évaluations Professionnelles</h3>
              
              <div className={styles.evaluationsList}>
                {mockEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className={styles.evaluationCard}>
                    <div className={styles.evaluationHeader}>
                      <div>
                        <h4 className={styles.evaluationCompany}>{evaluation.company}</h4>
                        <p className={styles.evaluationPosition}>{evaluation.position}</p>
                      </div>
                      <div className={styles.ratingDisplay}>
                        <span className={styles.ratingStars}>
                          {'⭐'.repeat(Math.floor(evaluation.rating))}
                        </span>
                        <span className={styles.ratingNumber}>{evaluation.rating}/5</span>
                      </div>
                    </div>
                    <p className={styles.evaluationComments}>{evaluation.comments}</p>
                    <p className={styles.evaluationDate}>Évaluée le {evaluation.date}</p>
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
