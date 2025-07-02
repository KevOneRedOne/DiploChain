import { useState, useCallback } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { useContracts } from '../context/ContractContext';
import { ethers } from 'ethers';
import { TokenBalance } from '../types/web3';

export interface CompanyProfile {
  id: number;
  name: string;
  country: string;
}

export interface DiplomaVerification {
  tokenId: number;
  studentName: string;
  diplomaTitle: string;
  institution: string;
  issueDate: string;
  ipfsCID: string;
  isValid: boolean;
  verificationDate: Date;
}

export const useCompany = () => {
  const { account, signer } = useWeb3();
  const { diplomaNFTContract, diplomaTokenContract, getTokenBalance } =
    useContracts();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Récupérer le profil entreprise
  const getCompanyProfile = useCallback(
    async (address?: string): Promise<CompanyProfile | null> => {
      if (!diplomaNFTContract) {
        throw new Error('Contrat non initialisé');
      }

      const companyAddress = address || account;
      if (!companyAddress) {
        throw new Error('Adresse entreprise manquante');
      }

      setIsLoading(true);
      setError(null);

      try {
        const company = await diplomaNFTContract.companies(companyAddress);

        if (!company.id || company.id === 0) {
          return null;
        }

        return {
          id: Number(company.id),
          name: company.name,
          country: company.country,
        };
      } catch (err: any) {
        console.error(
          'Erreur lors de la récupération du profil entreprise:',
          err
        );
        setError(`Erreur: ${err.message}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [diplomaNFTContract, account]
  );

  // 2. Récupérer le solde de tokens DIPTOK
  const getCompanyTokenBalance = useCallback(
    async (address?: string): Promise<TokenBalance | null> => {
      if (!diplomaTokenContract) {
        throw new Error('Contrat token non initialisé');
      }

      const companyAddress = address || account;
      if (!companyAddress) {
        throw new Error('Adresse entreprise manquante');
      }

      setIsLoading(true);
      setError(null);

      try {
        const balance = await getTokenBalance(companyAddress);
        return balance;
      } catch (err: any) {
        console.error('Erreur lors de la récupération du solde:', err);
        setError(`Erreur: ${err.message}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [diplomaTokenContract, getTokenBalance, account]
  );

  // 3. Acheter des tokens
  const buyTokens = useCallback(async (): Promise<boolean> => {
    if (!diplomaTokenContract || !signer) {
      throw new Error('Contrat non initialisé ou signer manquant');
    }

    setIsLoading(true);
    setError(null);

    try {
      const contractWithSigner = diplomaTokenContract.connect(signer);
      const tx = await contractWithSigner.buyTokens({
        value: ethers.parseEther('0.01'),
      });

      console.log("Transaction d'achat soumise:", tx.hash);
      await tx.wait();
      console.log('Achat de tokens confirmé');

      return true;
    } catch (err: any) {
      console.error("Erreur lors de l'achat de tokens:", err);
      setError(`Erreur lors de l'achat: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [diplomaTokenContract, signer]);

  // 4. Vérifier l'authenticité d'un diplôme
  const verifyDiploma = useCallback(
    async (tokenId: number): Promise<DiplomaVerification | null> => {
      if (!diplomaNFTContract) {
        throw new Error('Contrat NFT non initialisé');
      }

      setIsLoading(true);
      setError(null);

      try {
        // Vérifier si le NFT existe
        let owner: string;
        try {
          owner = await diplomaNFTContract.ownerOf(tokenId);
        } catch (err) {
          throw new Error("Ce diplôme n'existe pas");
        }

        // Récupérer les détails du diplôme
        const details = await diplomaNFTContract.diplomaDetails(tokenId);

        if (!details.studentName) {
          throw new Error('Diplôme invalide - métadonnées manquantes');
        }

        // Vérifier si l'école émettrice est accréditée
        const schoolId = await diplomaNFTContract.diplomaToSchool(tokenId);

        const verification: DiplomaVerification = {
          tokenId,
          studentName: details.studentName,
          diplomaTitle: details.diplomaTitle,
          institution: details.institution,
          issueDate: details.issueDate,
          ipfsCID: details.ipfsCID,
          isValid: true, // Si on arrive ici, le diplôme est valide
          verificationDate: new Date(),
        };

        return verification;
      } catch (err: any) {
        console.error('Erreur lors de la vérification:', err);
        setError(`Erreur de vérification: ${err.message}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [diplomaNFTContract]
  );

  // 5. Payer pour une vérification
  const payForVerification = useCallback(
    async (toAddress?: string): Promise<boolean> => {
      if (!diplomaTokenContract || !signer) {
        throw new Error('Contrat token non initialisé ou signer manquant');
      }

      setIsLoading(true);
      setError(null);

      try {
        // Par défaut, payer vers l'adresse du contrat ou l'owner
        const paymentAddress =
          toAddress || (await diplomaTokenContract.owner());

        const contractWithSigner = diplomaTokenContract.connect(signer);
        const tx = await contractWithSigner.payForVerification(paymentAddress);

        console.log('Paiement de vérification soumis:', tx.hash);
        await tx.wait();
        console.log('Paiement confirmé');

        return true;
      } catch (err: any) {
        console.error('Erreur lors du paiement:', err);
        setError(`Erreur de paiement: ${err.message}`);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [diplomaTokenContract, signer]
  );

  // 6. Historique des vérifications (via les événements)
  const getVerificationHistory = useCallback(async (): Promise<any[]> => {
    if (!diplomaTokenContract || !account) {
      return [];
    }

    try {
      // Écouter les événements de transfert depuis le compte de l'entreprise
      // pour les paiements de vérification (10 DIPTOK)
      const filter = diplomaTokenContract.filters.Transfer(account, null, null);
      const events = await diplomaTokenContract.queryFilter(filter);

      return events.filter((event: any) => {
        // Filtrer pour les paiements de 10 DIPTOK (vérifications)
        return event.args && ethers.formatEther(event.args.value) === '10.0';
      });
    } catch (err) {
      console.error("Erreur lors de la récupération de l'historique:", err);
      return [];
    }
  }, [diplomaTokenContract, account]);

  return {
    // État
    isLoading,
    error,

    // Fonctions
    getCompanyProfile,
    getCompanyTokenBalance,
    buyTokens,
    verifyDiploma,
    payForVerification,
    getVerificationHistory,
  };
};
