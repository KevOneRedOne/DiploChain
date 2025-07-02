'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './Web3Context';
import { getContractsForNetwork } from '../config/contracts';
import {
  ContractContextType,
  DiplomaMeta,
  DiplomaToken,
  TokenBalance,
} from '../types/web3';

const ContractContext = createContext<ContractContextType | undefined>(
  undefined
);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { provider, signer, chainId, isConnected } = useWeb3();

  const [diplomaNFTContract, setDiplomaNFTContract] = useState<any>(null);
  const [diplomaTokenContract, setDiplomaTokenContract] = useState<any>(null);
  const [isContractsLoaded, setIsContractsLoaded] = useState(false);

  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [lastTransactionHash, setLastTransactionHash] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeContracts = async () => {
      if (!provider || !chainId || !isConnected) {
        setIsContractsLoaded(false);
        return;
      }

      try {
        const contracts = getContractsForNetwork(chainId);

        if (!contracts.diplomaNFT.address || !contracts.diplomaToken.address) {
          console.warn('Adresses des contrats non définies pour ce réseau');
          setIsContractsLoaded(false);
          return;
        }

        const nftContract = new ethers.Contract(
          contracts.diplomaNFT.address,
          contracts.diplomaNFT.abi,
          provider
        );

        const tokenContract = new ethers.Contract(
          contracts.diplomaToken.address,
          contracts.diplomaToken.abi,
          provider
        );

        setDiplomaNFTContract(nftContract);
        setDiplomaTokenContract(tokenContract);
        setIsContractsLoaded(true);
        setError(null);

        console.log('Contrats initialisés avec succès');
      } catch (err) {
        console.error("Erreur lors de l'initialisation des contrats:", err);
        setError("Impossible d'initialiser les contrats");
        setIsContractsLoaded(false);
      }
    };

    initializeContracts();
  }, [provider, chainId, isConnected]);

  const mintDiploma = async (
    to: string,
    studentName: string,
    diplomaTitle: string,
    institution: string,
    issueDate: string,
    ipfsCID: string
  ) => {
    if (!diplomaNFTContract || !signer) {
      throw new Error('Contrat non initialisé ou signer manquant');
    }

    setIsTransactionPending(true);
    setError(null);

    try {
      const contractWithSigner = diplomaNFTContract.connect(signer);
      const tx = await contractWithSigner.mintDiploma(
        to,
        studentName,
        diplomaTitle,
        institution,
        issueDate,
        ipfsCID
      );

      setLastTransactionHash(tx.hash);
      console.log('Transaction soumise:', tx.hash);

      const receipt = await tx.wait();
      console.log('Transaction confirmée:', receipt);

      return receipt;
    } catch (err: any) {
      console.error('Erreur lors du mint:', err);
      setError(`Erreur lors du mint: ${err.message}`);
      throw err;
    } finally {
      setIsTransactionPending(false);
    }
  };

  const getDiplomaDetails = async (
    tokenId: number
  ): Promise<DiplomaMeta | null> => {
    if (!diplomaNFTContract) {
      throw new Error('Contrat non initialisé');
    }

    try {
      const details = await diplomaNFTContract.diplomaDetails(tokenId);
      return {
        studentName: details.studentName,
        diplomaTitle: details.diplomaTitle,
        institution: details.institution,
        issueDate: details.issueDate,
        ipfsCID: details.ipfsCID,
      };
    } catch (err) {
      console.error('Erreur lors de la récupération des détails:', err);
      return null;
    }
  };

  const getUserDiplomas = async (address: string): Promise<DiplomaToken[]> => {
    if (!diplomaNFTContract) {
      throw new Error('Contrat non initialisé');
    }

    try {
      const balance = await diplomaNFTContract.balanceOf(address);
      const diplomas: DiplomaToken[] = [];

      const filter = diplomaNFTContract.filters.DiplomaMinted(address);
      const events = await diplomaNFTContract.queryFilter(filter);

      for (const event of events) {
        const tokenId = event.args?.tokenId;
        if (tokenId) {
          try {
            const details = await getDiplomaDetails(Number(tokenId));
            const tokenURI = await diplomaNFTContract.tokenURI(tokenId);

            if (details) {
              diplomas.push({
                id: Number(tokenId),
                owner: address,
                metadata: details,
                tokenURI,
              });
            }
          } catch (err) {
            console.error(`Erreur pour le token ${tokenId}:`, err);
          }
        }
      }

      console.log(`L'utilisateur ${address} possède ${balance} diplômes`);
      return diplomas;
    } catch (err) {
      console.error('Erreur lors de la récupération des diplômes:', err);
      return [];
    }
  };

  const buyTokens = async () => {
    if (!diplomaTokenContract || !signer) {
      throw new Error('Contrat non initialisé ou signer manquant');
    }

    setIsTransactionPending(true);
    setError(null);

    try {
      const contractWithSigner = diplomaTokenContract.connect(signer);
      const tx = await contractWithSigner.buyTokens({
        value: ethers.parseEther('0.01'),
      });

      setLastTransactionHash(tx.hash);
      console.log("Transaction d'achat soumise:", tx.hash);

      const receipt = await tx.wait();
      console.log('Achat confirmé:', receipt);

      return receipt;
    } catch (err: any) {
      console.error("Erreur lors de l'achat:", err);
      setError(`Erreur lors de l'achat: ${err.message}`);
      throw err;
    } finally {
      setIsTransactionPending(false);
    }
  };

  const getTokenBalance = async (address: string): Promise<TokenBalance> => {
    if (!diplomaTokenContract) {
      throw new Error('Contrat non initialisé');
    }

    try {
      const [balance, symbol, decimals] = await Promise.all([
        diplomaTokenContract.balanceOf(address),
        diplomaTokenContract.symbol(),
        diplomaTokenContract.decimals(),
      ]);

      return {
        balance: ethers.formatUnits(balance, decimals),
        symbol,
        decimals,
      };
    } catch (err) {
      console.error('Erreur lors de la récupération du solde:', err);
      return {
        balance: '0',
        symbol: 'DIPTOK',
        decimals: 18,
      };
    }
  };

  const payForVerification = async (diplomaDAppAddress: string) => {
    if (!diplomaTokenContract || !signer) {
      throw new Error('Contrat non initialisé ou signer manquant');
    }

    setIsTransactionPending(true);
    setError(null);

    try {
      const contractWithSigner = diplomaTokenContract.connect(signer);
      const tx =
        await contractWithSigner.payForVerification(diplomaDAppAddress);

      setLastTransactionHash(tx.hash);
      console.log('Transaction de paiement soumise:', tx.hash);

      const receipt = await tx.wait();
      console.log('Paiement confirmé:', receipt);

      return receipt;
    } catch (err: any) {
      console.error('Erreur lors du paiement:', err);
      setError(`Erreur lors du paiement: ${err.message}`);
      throw err;
    } finally {
      setIsTransactionPending(false);
    }
  };

  const addAccreditedSchool = async (schoolAddress: string) => {
    if (!diplomaNFTContract || !signer) {
      throw new Error('Contrat non initialisé ou signer manquant');
    }

    setIsTransactionPending(true);
    setError(null);

    try {
      const contractWithSigner = diplomaNFTContract.connect(signer);
      const tx = await contractWithSigner.addSchool(schoolAddress);

      setLastTransactionHash(tx.hash);
      console.log("Transaction d'ajout d'école soumise:", tx.hash);

      const receipt = await tx.wait();
      console.log('École ajoutée:', receipt);

      return receipt;
    } catch (err: any) {
      console.error("Erreur lors de l'ajout de l'école:", err);
      setError(`Erreur lors de l'ajout de l'école: ${err.message}`);
      throw err;
    } finally {
      setIsTransactionPending(false);
    }
  };

  const isSchoolAccredited = async (
    schoolAddress: string
  ): Promise<boolean> => {
    if (!diplomaNFTContract) {
      throw new Error('Contrat non initialisé');
    }

    try {
      return await diplomaNFTContract.accreditedSchools(schoolAddress);
    } catch (err) {
      console.error("Erreur lors de la vérification de l'accréditation:", err);
      return false;
    }
  };

  const rewardCompanyForEvaluation = async (companyAddress: string) => {
    if (!diplomaTokenContract || !signer) {
      throw new Error('Contrat non initialisé ou signer manquant');
    }

    setIsTransactionPending(true);
    setError(null);

    try {
      const contractWithSigner = diplomaTokenContract.connect(signer);
      const tx = await contractWithSigner.rewardForEvaluation(companyAddress);

      setLastTransactionHash(tx.hash);
      console.log('Transaction de récompense soumise:', tx.hash);

      const receipt = await tx.wait();
      console.log('Récompense accordée:', receipt);

      return receipt;
    } catch (err: any) {
      console.error("Erreur lors de l'attribution de la récompense:", err);
      setError(`Erreur lors de l'attribution de la récompense: ${err.message}`);
      throw err;
    } finally {
      setIsTransactionPending(false);
    }
  };

  const registerCompany = async (
    companyAddress: string,
    id: number,
    name: string,
    country: string
  ) => {
    if (!diplomaNFTContract || !signer) {
      throw new Error('Contrat non initialisé ou signer manquant');
    }

    setIsTransactionPending(true);
    setError(null);

    try {
      const contractWithSigner = diplomaNFTContract.connect(signer);
      const tx = await contractWithSigner.registerCompany(
        companyAddress,
        id,
        name,
        country
      );

      setLastTransactionHash(tx.hash);
      console.log(
        "Transaction d'enregistrement d'entreprise soumise:",
        tx.hash
      );

      const receipt = await tx.wait();
      console.log('Entreprise enregistrée:', receipt);

      return receipt;
    } catch (err: any) {
      console.error("Erreur lors de l'enregistrement de l'entreprise:", err);
      setError(
        `Erreur lors de l'enregistrement de l'entreprise: ${err.message}`
      );
      throw err;
    } finally {
      setIsTransactionPending(false);
    }
  };

  const value: ContractContextType = {
    diplomaNFTContract,
    diplomaTokenContract,
    isContractsLoaded,

    mintDiploma,
    getDiplomaDetails,
    getUserDiplomas,
    addAccreditedSchool,
    isSchoolAccredited,
    registerCompany,

    buyTokens,
    getTokenBalance,
    payForVerification,
    rewardCompanyForEvaluation,

    isTransactionPending,
    lastTransactionHash,
    error,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = (): ContractContextType => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContracts doit être utilisé dans un ContractProvider');
  }
  return context;
};
