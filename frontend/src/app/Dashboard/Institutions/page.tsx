'use client';

import Header from '../../../components/Header';
import { useState } from 'react';
import styles from './index.module.scss';

export default function InstitutionsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const mockStudents = [
    {
      id: 1,
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      program: 'Master Informatique',
      status: 'Actif',
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      email: 'thomas.dubois@email.com',
      program: 'Licence Mathématiques',
      status: 'Diplômé',
    },
  ];

  const mockDiplomas = [
    {
      id: 1,
      title: 'Master en Intelligence Artificielle',
      student: 'Sophie Martin',
      date: '2024-06-15',
      status: 'Émis',
      nftId: '#0x1a2b3c',
    },
    {
      id: 2,
      title: 'Licence en Data Science',
      student: 'Thomas Dubois',
      date: '2024-05-20',
      status: 'En cours',
      nftId: '#0x4d5e6f',
    },
  ];

  return (
    <div className="institutions-page">
      <Header />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🏛️ Espace Établissement</h1>
          <p className={styles.subtitle}>Gérez vos étudiants et émettez des diplômes blockchain</p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👨‍🎓</div>
            <div className={styles.statNumber}>{mockStudents.length}</div>
            <div className={styles.statLabel}>Étudiants Actifs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📜</div>
            <div className={styles.statNumber}>{mockDiplomas.length}</div>
            <div className={styles.statLabel}>Diplômes Émis</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⛓️</div>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Blockchain Verified</div>
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
            className={`${styles.tabButton} ${activeTab === 'students' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Étudiants
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'diplomas' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('diplomas')}
          >
            Diplômes
          </button>
        </div>

        {/* Content based on active tab */}
        <div className={styles.content}>
          {activeTab === 'overview' && (
            <div className={styles.overview}>
              <div className={styles.welcomeCard}>
                <h2 className={styles.welcomeTitle}>Tableau de Bord Établissement 🏛️</h2>
                <p className={styles.welcomeText}>
                  Gérez efficacement vos étudiants et émettez des diplômes vérifiables sur la blockchain.
                </p>
                <div className={styles.actionButtons}>
                  <button className={styles.primaryAction}>
                    Émettre un nouveau diplôme
                  </button>
                  <button className={styles.secondaryAction}>
                    Ajouter un étudiant
                  </button>
                </div>
              </div>

              <div className={styles.recentActivity}>
                <h3 className={styles.sectionTitle}>Activité Récente</h3>
                <div className={styles.activityList}>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>🎓</div>
                    <div>
                      <div className={styles.activityTitle}>Diplôme émis</div>
                      <div className={styles.activityDate}>Master IA pour Sophie Martin - il y a 1 jour</div>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>👨‍🎓</div>
                    <div>
                      <div className={styles.activityTitle}>Nouvel étudiant inscrit</div>
                      <div className={styles.activityDate}>Thomas Dubois - il y a 3 jours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className={styles.studentsSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Gestion des Étudiants</h3>
                <button className={styles.addButton}>+ Ajouter un étudiant</button>
              </div>
              
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.tableHeader}>
                    <tr>
                      <th className={styles.th}>Nom</th>
                      <th className={styles.th}>Email</th>
                      <th className={styles.th}>Programme</th>
                      <th className={styles.th}>Statut</th>
                      <th className={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((student) => (
                      <tr key={student.id} className={styles.tableRow}>
                        <td className={styles.td}>{student.name}</td>
                        <td className={styles.td}>{student.email}</td>
                        <td className={styles.td}>{student.program}</td>
                        <td className={styles.td}>{student.status}</td>
                        <td className={styles.td}>
                          <button className={styles.actionBtn}>Voir Profil</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'diplomas' && (
            <div className={styles.diplomasSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Diplômes Blockchain</h3>
                <button className={styles.addButton}>+ Émettre un diplôme</button>
              </div>
              
              <div className={styles.diplomasGrid}>
                {mockDiplomas.map((diploma) => (
                  <div key={diploma.id} className={styles.diplomaCard}>
                    <div className={styles.diplomaHeader}>
                      <div className={styles.diplomaIcon}>🎓</div>
                      <div className={styles.statusBadge}>✅ {diploma.status}</div>
                    </div>
                    <h4 className={styles.diplomaTitle}>{diploma.title}</h4>
                    <p className={styles.diplomaStudent}>{diploma.student}</p>
                    <p className={styles.diplomaDate}>Émis le {diploma.date}</p>
                    <div className={styles.diplomaActions}>
                      <button className={styles.viewButton}>Voir NFT</button>
                      <button className={styles.shareButton}>Partager</button>
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
