# 🔗 Configuration Web3 - DiploChain Frontend

## 📋 Vue d'ensemble

Cette documentation couvre la configuration complète de l'intégration Web3 pour l'application DiploChain. La configuration utilise **ethers.js v6** avec **React 19** et **Next.js 15**.

## 🏗️ Architecture

```
src/
├── types/
│   └── web3.ts              # Types TypeScript pour Web3
├── config/
│   └── networks.ts          # Configuration des réseaux blockchain
├── hooks/
│   └── useMetaMask.ts       # Hook personnalisé pour MetaMask
├── context/
│   └── Web3Context.tsx      # Contexte global Web3
├── components/
│   ├── Header.tsx           # En-tête avec connexion wallet
│   └── Web3/
│       ├── WalletConnection.tsx  # Composant de connexion
│       └── NetworkStatus.tsx     # Statut du réseau
└── utils/
    └── web3.ts              # Utilitaires Web3
```

## 🔧 Composants Principaux

### 1. **Web3Context**
Le contexte global qui fournit l'état Web3 à toute l'application :
- État de connexion MetaMask
- Informations du compte utilisateur
- Provider et signer ethers.js
- Fonctions de connexion/déconnexion
- Gestion des erreurs

### 2. **useMetaMask Hook**
Hook personnalisé qui gère :
- Détection de MetaMask
- Connexion/déconnexion automatique
- Écoute des changements de compte/réseau
- Reconnexion automatique
- Gestion des erreurs

### 3. **Configuration des Réseaux**
Support pour :
- **Hardhat Local** (développement) - Chain ID: 31337
- **Sepolia Testnet** - Chain ID: 11155111
- **Goerli Testnet** - Chain ID: 5

## 🚀 Utilisation

### Configuration dans le Layout
```tsx
// src/app/layout.tsx
import { Web3Provider } from "../context/Web3Context";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
```

### Utilisation dans les Composants
```tsx
import { useWeb3 } from '../context/Web3Context';

function MonComposant() {
  const {
    account,
    isConnected,
    connectWallet,
    provider,
    signer
  } = useWeb3();

  return (
    <div>
      {isConnected ? (
        <p>Connecté: {account}</p>
      ) : (
        <button onClick={connectWallet}>
          Connecter MetaMask
        </button>
      )}
    </div>
  );
}
```

### Interaction avec les Smart Contracts
```tsx
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';

function ContractInteraction() {
  const { signer, isConnected } = useWeb3();

  const interactWithContract = async () => {
    if (!isConnected || !signer) return;

    const contractAddress = "0x...";
    const contractABI = [...];

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    try {
      const tx = await contract.someFunction();
      await tx.wait();
      console.log('Transaction confirmée');
    } catch (error) {
      console.error('Erreur transaction:', error);
    }
  };

  return (
    <button onClick={interactWithContract}>
      Interagir avec le contrat
    </button>
  );
}
```

## 🛠️ Fonctionnalités Implémentées

### ✅ Connexion MetaMask
- [x] Détection automatique de MetaMask
- [x] Demande de connexion utilisateur
- [x] Gestion des erreurs de connexion
- [x] Interface utilisateur de connexion

### ✅ Gestion des Comptes
- [x] Affichage de l'adresse connectée
- [x] Formatage des adresses (truncature)
- [x] Écoute des changements de compte
- [x] Déconnexion manuelle

### ✅ Gestion des Réseaux
- [x] Détection du réseau actuel
- [x] Support multi-réseaux (Hardhat, Sepolia, Goerli)
- [x] Changement de réseau automatique
- [x] Ajout de nouveaux réseaux

### ✅ Persistance
- [x] Reconnexion automatique au rechargement
- [x] Sauvegarde de l'état de connexion
- [x] Gestion du cache localStorage

### ✅ Interface Utilisateur
- [x] Composant Header avec connexion
- [x] Indicateur de statut réseau
- [x] Messages d'erreur utilisateur
- [x] Design responsive

## 🔍 Utilitaires Disponibles

Le fichier `src/utils/web3.ts` contient des fonctions utilitaires :

```tsx
import { formatAddress, formatEther, isValidAddress } from '../utils/web3';

// Formater une adresse
const shortAddress = formatAddress("0x1234...abcd");

// Formater des montants ETH
const ethAmount = formatEther("1000000000000000000"); // "1.0000"

// Valider une adresse
const isValid = isValidAddress("0x1234...");
```

## ⚠️ Points Importants

### Gestion des Erreurs
- **Code 4001** : Utilisateur refuse la connexion
- **Code 4902** : Réseau inconnu (ajout automatique)
- Erreurs de transaction gérées avec try/catch

### Performance
- Reconnexion automatique optimisée
- Event listeners proprement nettoyés
- Rechargement de page lors du changement de réseau

### Sécurité
- Validation des adresses avant utilisation
- Vérification de l'état de connexion
- Gestion sécurisée des providers

## 🧪 Tests de Développement

### Prérequis
1. MetaMask installé et configuré
2. Réseau Hardhat local en cours d'exécution
3. Comptes de test avec ETH fictif

### Commandes de Test
```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
# Tester la connexion MetaMask
# Vérifier le changement de réseau
```

### Scénarios de Test
1. **Connexion initiale** : Premier connexion avec MetaMask
2. **Changement de compte** : Changer de compte dans MetaMask
3. **Changement de réseau** : Basculer entre réseaux supportés
4. **Déconnexion** : Déconnecter et reconnecter
5. **Rechargement** : Tester la persistance après rechargement

## 🚧 Prochaines Étapes

Selon la roadmap DiploChain :

1. **Intégration Smart Contracts**
   - Connexion aux contrats DiplomaToken
   - Connexion aux contrats DiplomaRegistry
   - Gestion des transactions

2. **Composants Métier**
   - Formulaires d'inscription institutions
   - Interface création de diplômes
   - Système de vérification

3. **Optimisations**
   - Gestion du cache des données
   - Loading states améliorés
   - Notifications de transactions

## 📚 Ressources

- [Ethers.js v6 Documentation](https://docs.ethers.org/v6/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Note** : Cette configuration respecte les exigences de la todolist DiploChain pour la phase de setup (9h00-9h30) et les fondations frontend (9h30-12h00). 