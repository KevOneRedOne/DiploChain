'use client';

import Link from 'next/link';
import Header from '../components/Header';
import styles from './index.module.scss';

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              🎓 DiploChain
            </h1>
            <p className={styles.heroSubtitle}>
              La première plateforme blockchain pour la vérification sécurisée des diplômes
            </p>
            <p className={styles.heroDescription}>
              Révolutionnez la validation des diplômes avec la technologie blockchain. 
              Sécurisé, transparent et vérifiable instantanément.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/Dashboard/Students" className={styles.primaryBtn}>
                Espace Étudiant
              </Link>
              <Link href="/Dashboard/Institutions" className={styles.secondaryBtn}>
                Espace Établissement
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Pourquoi DiploChain ?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔐</div>
              <h3 className={styles.featureTitle}>Sécurité Blockchain</h3>
              <p className={styles.featureText}>
                Vos diplômes sont stockés de manière immuable sur la blockchain Ethereum
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Vérification Instantanée</h3>
              <p className={styles.featureText}>
                Les employeurs peuvent vérifier l'authenticité des diplômes en quelques secondes
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌍</div>
              <h3 className={styles.featureTitle}>Reconnaissance Mondiale</h3>
              <p className={styles.featureText}>
                Système universel accessible partout dans le monde 24h/24
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>1000+</div>
              <div className={styles.statLabel}>Diplômes Vérifiés</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Établissements Partenaires</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>99.9%</div>
              <div className={styles.statLabel}>Temps de Disponibilité</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Prêt à révolutionner la vérification des diplômes ?</h2>
          <p className={styles.ctaText}>
            Rejoignez des milliers d'étudiants et d'institutions qui font confiance à DiploChain
          </p>
          <a href="/Dashboard/Companies" className={styles.ctaButton}>
            Démarrer Maintenant
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2024 DiploChain. Propulsé par la blockchain Ethereum.
        </p>
      </footer>
    </div>
  );
}
