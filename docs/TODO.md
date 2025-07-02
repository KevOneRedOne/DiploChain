# 📋 DiploChain - Todo List Développement

> **Objectif** : Développer une DApp de vérification de diplômes en 1 journée avec 3 développeurs

## 👥 Équipe & Rôles

- **🔧 DEV 1** - Smart Contracts (Backend Blockchain)
- **💻 DEV 2** - Frontend/Interface (React/Web3)
- **🛠️ DEV 3** - Infrastructure/Tests (Déploiement/Sécurité)

---

## ⏰ Planning par Phase

### **9h00 - 9h30 : Setup & Architecture (30min)**

#### 🟡 TOUS - Configuration initiale
- [ ] Installation Node.js, npm, Git
- [ ] Installation et configuration MetaMask
- [ ] Installation Hardhat : `npm install --save-dev hardhat`
- [ ] Clone du repository et structure des dossiers
- [ ] Définition des interfaces entre composants
- [ ] Répartition finale des tâches et communication

---

### **9h30 - 12h00 : Phase 1 - Développement Core (2h30)**

#### 🔵 DEV 1 - Smart Contracts Foundation

**ERC20 Token Contract**
- [ ] Créer `contracts/DiplomaToken.sol`
- [ ] Implémenter ERC20 avec OpenZeppelin
- [ ] Ajouter fonctions : `mint()`, `transfer()`, `approve()`
- [ ] Définir total supply et decimals
- [ ] Ajouter contrôles d'accès (Ownable)

**Contract Principal**
- [ ] Créer `contracts/DiplomaRegistry.sol`
- [ ] Implémenter gestion des établissements
  - [ ] `registerInstitution(name, address)`
  - [ ] `verifyInstitution(address)`
- [ ] Implémenter gestion des entreprises
  - [ ] `registerCompany(name, address)`
- [ ] Implémenter gestion des étudiants
  - [ ] `createStudentProfile(address, institutionId)`
- [ ] Système de paiement en tokens
  - [ ] `purchaseTokens()` - 0.01 ETH = 100 tokens
  - [ ] `payVerification()` - 10 tokens par vérification

#### 🟢 DEV 2 - Frontend Setup

**Configuration React & Web3**
- [ ] Créer app React : `npx create-react-app frontend`
- [ ] Installer Web3.js : `npm install web3`
- [ ] Installer ethers.js : `npm install ethers`
- [ ] Configuration connexion MetaMask
- [ ] Créer contexte Web3 global

**Pages principales**
- [ ] Créer `components/Header.ts` avec connexion wallet
- [ ] Créer `pages/Home.js` - Page d'accueil
- [ ] Créer `pages/Dashboard/Institutions/page.ts` - Dashboard établissements
- [ ] Créer `pages/Dashboard/Companies/page.ts` - Dashboard entreprises
- [ ] Créer `pages/Dashboard/Students/page.ts` - Dashboard étudiants

**Formulaires de base**
- [ ] `components/RegisterInstitution.js`
- [ ] `components/RegisterCompany.js`
- [ ] `components/CreateStudent.js`

#### 🟠 DEV 3 - Infrastructure

**Configuration réseau**
- [ ] Configuration Hardhat network : `npx hardhat node`
- [ ] Configuration Ganache (alternative)
- [ ] Créer `hardhat.config.js` avec réseaux

**Scripts de déploiement**
- [ ] Créer `scripts/deploy.js`
- [ ] Script déploiement DiplomaToken
- [ ] Script déploiement DiplomaRegistry
- [ ] Script de configuration initiale

**IPFS Configuration**
- [ ] Installation IPFS local ou Pinata
- [ ] Configuration upload métadonnées
- [ ] Test stockage/récupération fichiers

**Tests unitaires**
- [ ] Créer `test/DiplomaToken.test.js`
- [ ] Créer `test/DiplomaRegistry.test.js`
- [ ] Tests fonctions de base
- [ ] Tests contrôles d'accès

---

### **12h00 - 13h00 : 🍽️ PAUSE DÉJEUNER**

---

### **13h00 - 15h30 : Phase 2 - Fonctionnalités Avancées (2h30)**

#### 🔵 DEV 1 - Smart Contracts NFT

**Contract NFT Diplôme**
- [ ] Créer `contracts/DiplomaNFT.sol` (ERC721)
- [ ] Implémenter avec OpenZeppelin ERC721
- [ ] Fonction `mintDiploma(to, tokenId, metadataURI)`
- [ ] Restriction : seuls établissements vérifiés
- [ ] Métadonnées : nom, diplôme, établissement, date

**Intégration IPFS**
- [ ] Structure métadonnées JSON
- [ ] Upload automatique vers IPFS
- [ ] Lien CID dans NFT
- [ ] Fonction `getDiplomaMetadata(tokenId)`

**Système de vérification**
- [ ] Fonction `verifyDiploma(tokenId, companyAddress)`
- [ ] Paiement automatique 10 tokens
- [ ] Émission événement `DiplomaVerified`
- [ ] Historique des vérifications

**Évaluation des stages**
- [ ] Fonction `evaluateIntern(studentAddress, score, comments)`
- [ ] Récompense 15 tokens pour évaluateur
- [ ] Stockage évaluations liées à l'étudiant

#### 🟢 DEV 2 - Interface Utilisateur Avancée

**Gestion des diplômes**
- [ ] `components/CreateDiploma.js` - Formulaire création
- [ ] `components/DiplomaCard.js` - Affichage diplôme
- [ ] `components/VerifyDiploma.js` - Interface vérification
- [ ] Intégration upload métadonnées IPFS

**Gestion des tokens**
- [ ] `components/TokenBalance.js` - Affichage solde
- [ ] `components/PurchaseTokens.js` - Achat tokens
- [ ] `components/TokenHistory.js` - Historique transactions
- [ ] Conversion ETH/Tokens en temps réel

**Interface évaluations**
- [ ] `components/EvaluateStudent.js` - Formulaire évaluation
- [ ] `components/StudentEvaluations.js` - Historique notes
- [ ] Système de notation (1-5 étoiles)

**Dashboards spécialisés**
- [ ] Dashboard établissement : liste diplômes émis
- [ ] Dashboard entreprise : vérifications effectuées
- [ ] Dashboard étudiant : mes diplômes et évaluations

#### 🟠 DEV 3 - Tests & Sécurité

**Installation Mythril**
- [ ] Installation : `pip install mythril`
- [ ] Configuration pour analyse Solidity
- [ ] Script d'analyse automatique

**Tests d'intégration**
- [ ] Test complet workflow diplôme
- [ ] Test intégration frontend-backend
- [ ] Test connexion MetaMask
- [ ] Test upload IPFS depuis frontend

**Upload IPFS**
- [ ] `utils/ipfs.js` - Fonctions upload
- [ ] Test upload métadonnées diplôme
- [ ] Vérification récupération données
- [ ] Gestion erreurs réseau

**Première analyse sécurité**
- [ ] Analyse Mythril sur tous les contracts
- [ ] Vérification contrôles d'accès
- [ ] Test attaques reentrancy
- [ ] Documentation vulnérabilités trouvées

---

### **15h30 - 16h00 : Intégration & Debug (30min)**

#### 🔴 TOUS - Debug critique
- [ ] Intégration des 3 composants
- [ ] Test workflow complet end-to-end
- [ ] Résolution bugs bloquants
- [ ] Synchronisation versions contracts/frontend

---

### **16h00 - 17h00 : Phase 3 - Finalisation (1h)**

#### 🔵 DEV 1 - Optimisation
- [ ] Optimisation coût gas des fonctions
- [ ] Ajout événements pour logs détaillés
- [ ] Documentation NatSpec des fonctions
- [ ] Vérification limites et edge cases

#### 🟢 DEV 2 - Polish UI/UX
- [ ] Amélioration design responsive
- [ ] Gestion des erreurs utilisateur
- [ ] Messages de confirmation transactions
- [ ] Loading states et spinners

#### 🟠 DEV 3 - Audit & Déploiement
- [ ] Audit complet Mythril sur version finale
- [ ] Déploiement sur testnet (Goerli/Sepolia)
- [ ] Vérification contracts sur Etherscan
- [ ] Tests finaux sur testnet

---

### **17h00 - 18h00 : Tests & Démo (1h)**

#### 🔴 TOUS - Finalisation
- [ ] Tests complets du workflow utilisateur
- [ ] Préparation données de démo
- [ ] Screenshots/vidéo de démonstration
- [ ] Documentation utilisateur finale
- [ ] Correction bugs de dernière minute

---

## 🛠️ Stack Technique

### Smart Contracts
- [ ] Solidity ^0.8.0
- [ ] OpenZeppelin Contracts
- [ ] Hardhat Development Environment

### Frontend
- [ ] React.js 18+
- [ ] Web3.js ou Ethers.js
- [ ] Bootstrap ou Tailwind CSS

### Infrastructure
- [ ] IPFS (Pinata API ou local)
- [ ] Hardhat Network / Ganache
- [ ] Mythril Security Analyzer

---

## 🎯 Livrables Finaux

### Smart Contracts
- [ ] `DiplomaToken.sol` - Contract ERC20
- [ ] `DiplomaRegistry.sol` - Logique métier principale
- [ ] `DiplomaNFT.sol` - Contract ERC721 pour diplômes
- [ ] Scripts de déploiement complets

### Frontend
- [ ] Application React complète et fonctionnelle
- [ ] Intégration Web3 avec MetaMask
- [ ] Dashboards pour tous types d'utilisateurs
- [ ] Interface responsive et intuitive

### Documentation
- [ ] Rapport d'audit Mythril
- [ ] Guide utilisateur avec captures d'écran
- [ ] Documentation technique des APIs
- [ ] README.md complet

---

## ⚠️ Points Critiques

### Synchronisation
- [ ] Réunion équipe toutes les 2h (11h30, 14h30, 16h30)
- [ ] Communication continue sur Slack/Discord
- [ ] Commits fréquents sur Git

### Gestion des priorités
- [ ] Se concentrer sur MVP fonctionnel
- [ ] Garder version simplifiée en backup
- [ ] Éviter over-engineering

### Tests continus
- [ ] Tester l'intégration à chaque étape
- [ ] Valider interactions blockchain constamment
- [ ] Vérifier compatibilité MetaMask

---

## ✅ Critères de Succès

- [ ] **Création d'établissement** - Fonctionnelle
- [ ] **Création d'entreprise** - Fonctionnelle  
- [ ] **Émission diplôme NFT** - Avec métadonnées IPFS
- [ ] **Vérification authenticité** - Payante en tokens
- [ ] **Système tokens** - Achat/paiement/récompenses
- [ ] **Interface utilisateur** - Intuitive et responsive
- [ ] **Audit sécurité** - Mythril sans vulnérabilités critiques

---

## 🆘 Plan de Secours

Si retard important :
- [ ] Version simplifiée sans NFT (juste registre)
- [ ] UI basique sans polish
- [ ] Tests manuels sans Mythril
- [ ] Déploiement local seulement

**Contact équipe** : #diplochain-dev sur Discord