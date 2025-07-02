import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Types pour les données du contrat
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

interface School {
  name: string;
  address: string;
}

// ABI partiel pour les fonctions nécessaires
const CONTRACT_ABI = [
  // Fonction students(address) - mapping public
  "function students(address) public view returns (uint256 id, string nom, string prenom, string email)",
  
  // Fonctions ERC721 standard
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  
  // Fonctions pour les détails des diplômes
  "function diplomaDetails(uint256 tokenId) public view returns (uint256 id, string title, string institution, string date, string metadataURI)",
  "function diplomaToSchool(uint256 tokenId) public view returns (address)",
  "function schools(address schoolAddr) public view returns (string name)",
  
  // Fonction de transfert
  "function safeTransferFrom(address from, address to, uint256 tokenId) public",
  
  // Fonction pour l'URI du token
  "function tokenURI(uint256 tokenId) public view returns (string)"
];

// Adresse du contrat (à remplacer par la vraie adresse)
const CONTRACT_ADDRESS = "0x..."; // TODO: Remplacer par l'adresse réelle du contrat

export const useContract = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    initializeContract();
  }, []);

  const initializeContract = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(browserProvider);
        
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }

        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          browserProvider
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation du contrat:', error);
      }
    }
  };

  // 1. Fonction pour récupérer les informations personnelles de l'étudiant
  const getStudentInfo = async (studentAddress: string): Promise<Student | null> => {
    if (!contract) return null;
    
    try {
      const result = await contract.students(studentAddress);
      return {
        id: Number(result.id),
        nom: result.nom,
        prenom: result.prenom,
        email: result.email
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des infos étudiant:', error);
      return null;
    }
  };

  // 2. Fonction pour récupérer la liste des diplômes possédés
  const getStudentDiplomas = async (studentAddress: string): Promise<DiplomaDetails[]> => {
    if (!contract) return [];
    
    try {
      // Récupérer le nombre de NFTs possédés
      const balance = await contract.balanceOf(studentAddress);
      const diplomas: DiplomaDetails[] = [];

      // Pour chaque NFT possédé, récupérer les détails
      for (let i = 0; i < Number(balance); i++) {
        try {
          const tokenId = await contract.tokenOfOwnerByIndex(studentAddress, i);
          const diplomaInfo = await contract.diplomaDetails(tokenId);
          
          diplomas.push({
            id: Number(tokenId),
            title: diplomaInfo.title,
            institution: diplomaInfo.institution,
            date: diplomaInfo.date,
            metadataURI: diplomaInfo.metadataURI
          });
        } catch (error) {
          console.error(`Erreur pour le token ${i}:`, error);
        }
      }

      return diplomas;
    } catch (error) {
      console.error('Erreur lors de la récupération des diplômes:', error);
      return [];
    }
  };

  // 3. Fonction pour récupérer les détails d'un diplôme spécifique
  const getDiplomaDetails = async (tokenId: number) => {
    if (!contract) return null;
    
    try {
      const diplomaInfo = await contract.diplomaDetails(tokenId);
      const schoolAddress = await contract.diplomaToSchool(tokenId);
      const schoolInfo = await contract.schools(schoolAddress);
      const tokenURI = await contract.tokenURI(tokenId);

      return {
        diploma: {
          id: Number(tokenId),
          title: diplomaInfo.title,
          institution: diplomaInfo.institution,
          date: diplomaInfo.date,
          metadataURI: diplomaInfo.metadataURI
        },
        school: {
          name: schoolInfo.name,
          address: schoolAddress
        },
        tokenURI: tokenURI
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du diplôme:', error);
      return null;
    }
  };

  // 4. Fonction pour transférer un diplôme (vers wallet personnel)
  const transferDiploma = async (to: string, tokenId: number) => {
    if (!contract || !account || !provider) return false;
    
    try {
      const signer = await provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      
      const tx = await contractWithSigner.getFunction("safeTransferFrom")(account, to, tokenId);
      await tx.wait();
      
      return true;
    } catch (error) {
      console.error('Erreur lors du transfert du diplôme:', error);
      return false;
    }
  };

  return {
    contract,
    account,
    provider,
    getStudentInfo,
    getStudentDiplomas,
    getDiplomaDetails,
    transferDiploma,
    initializeContract
  };
}; 