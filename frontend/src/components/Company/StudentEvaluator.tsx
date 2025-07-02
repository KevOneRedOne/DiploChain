'use client';

import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import styles from './StudentEvaluator.module.scss';

interface StudentEvaluatorProps {
  onEvaluationComplete?: (evaluation: StudentEvaluation) => void;
}

interface StudentEvaluation {
  studentAddress: string;
  studentName: string;
  position: string;
  rating: number;
  comment: string;
  skills: string[];
  evaluationDate: Date;
}

const StudentEvaluator: React.FC<StudentEvaluatorProps> = ({
  onEvaluationComplete,
}) => {
  const { account } = useWeb3();

  const [studentAddress, setStudentAddress] = useState('');
  const [studentName, setStudentName] = useState('');
  const [position, setPosition] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const predefinedSkills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'C++',
    'HTML/CSS',
    'Git',
    'SQL',
    'MongoDB',
    'AWS',
    'Communication',
    "Travail d'équipe",
    'Leadership',
    'Résolution de problèmes',
    'Analyse',
    'Créativité',
    'Adaptabilité',
    'Gestion du temps',
  ];

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentAddress || !studentName || !position || rating === 0) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      const evaluation: StudentEvaluation = {
        studentAddress,
        studentName,
        position,
        rating,
        comment,
        skills,
        evaluationDate: new Date(),
      };

      // Ici, on pourrait appeler une fonction smart contract ou stocker off-chain
      // Pour l'instant, on simule l'évaluation

      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Évaluation soumise:', evaluation);

      if (onEvaluationComplete) {
        onEvaluationComplete(evaluation);
      }

      // Réinitialiser le formulaire
      resetForm();
      alert('Évaluation soumise avec succès !');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert("Erreur lors de la soumission de l'évaluation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStudentAddress('');
    setStudentName('');
    setPosition('');
    setRating(0);
    setComment('');
    setSkills([]);
    setNewSkill('');
    setShowForm(false);
  };

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const renderStarRating = () => {
    return (
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className={`${styles.star} ${star <= rating ? styles.active : ''}`}
            onClick={() => setRating(star)}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  if (!showForm) {
    return (
      <div className={styles.studentEvaluator}>
        <div className={styles.header}>
          <h3 className={styles.title}>⭐ Évaluation de Stagiaire</h3>
          <p className={styles.subtitle}>
            Évaluez les performances de vos stagiaires et obtenez des
            récompenses
          </p>
        </div>

        <div className={styles.intro}>
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>💰</span>
              <div>
                <h4>Récompense</h4>
                <p>Recevez 15 DIPTOK pour chaque évaluation</p>
              </div>
            </div>

            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>📊</span>
              <div>
                <h4>Transparence</h4>
                <p>Évaluations vérifiables sur la blockchain</p>
              </div>
            </div>

            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>🤝</span>
              <div>
                <h4>Réseau</h4>
                <p>Participez à l'écosystème éducatif</p>
              </div>
            </div>
          </div>

          <button
            className={styles.startButton}
            onClick={() => setShowForm(true)}
          >
            Commencer une évaluation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.studentEvaluator}>
      <div className={styles.header}>
        <h3 className={styles.title}>⭐ Évaluation de Stagiaire</h3>
        <button
          className={styles.closeButton}
          onClick={() => setShowForm(false)}
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmitEvaluation} className={styles.evaluationForm}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="studentAddress" className={styles.label}>
              Adresse Ethereum de l'étudiant *
            </label>
            <input
              id="studentAddress"
              type="text"
              value={studentAddress}
              onChange={e => setStudentAddress(e.target.value)}
              placeholder="0x..."
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="studentName" className={styles.label}>
              Nom de l'étudiant *
            </label>
            <input
              id="studentName"
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              placeholder="Nom complet de l'étudiant"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="position" className={styles.label}>
              Poste occupé *
            </label>
            <input
              id="position"
              type="text"
              value={position}
              onChange={e => setPosition(e.target.value)}
              placeholder="Ex: Développeur Frontend"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Note globale * ({rating}/5)</label>
            {renderStarRating()}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Compétences évaluées</label>

          <div className={styles.skillsContainer}>
            <div className={styles.skillInput}>
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Ajouter une compétence"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => addSkill(newSkill)}
                className={styles.addSkillButton}
              >
                Ajouter
              </button>
            </div>

            <div className={styles.predefinedSkills}>
              {predefinedSkills.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className={styles.skillTag}
                  disabled={skills.includes(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>

            {skills.length > 0 && (
              <div className={styles.selectedSkills}>
                <h4>Compétences sélectionnées:</h4>
                <div className={styles.skillsList}>
                  {skills.map(skill => (
                    <span key={skill} className={styles.selectedSkill}>
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className={styles.removeSkillButton}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="comment" className={styles.label}>
            Commentaires détaillés
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Décrivez les forces, points d'amélioration, recommandations..."
            className={styles.textarea}
            rows={4}
          />
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={resetForm}
            className={styles.cancelButton}
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Soumission...' : "Soumettre l'évaluation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentEvaluator;
