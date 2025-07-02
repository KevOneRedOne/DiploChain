export interface MetaMaskError {
  code: number;
  message: string;
}

export interface Web3ContextType {
  account: string | null;
  provider: any;
  signer: any;
  chainId: number | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: string) => Promise<void>;
}

export interface DiplomaContract {
  address: string;
  abi: any[];
}

export interface NetworkConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

// Types pour les contrats de diplômes
export interface DiplomaMeta {
  studentName: string;
  diplomaTitle: string;
  institution: string;
  issueDate: string;
  ipfsCID: string;
}

export interface DiplomaToken {
  id: number;
  owner: string;
  metadata: DiplomaMeta;
  tokenURI: string;
}

export interface TokenBalance {
  balance: string;
  symbol: string;
  decimals: number;
}

export interface ContractContextType {
  // État des contrats
  diplomaNFTContract: any;
  diplomaTokenContract: any;
  isContractsLoaded: boolean;
  
  // Fonctions NFT
  mintDiploma: (
    to: string,
    studentName: string,
    diplomaTitle: string,
    institution: string,
    issueDate: string,
    ipfsCID: string
  ) => Promise<any>;
  getDiplomaDetails: (tokenId: number) => Promise<DiplomaMeta | null>;
  getUserDiplomas: (address: string) => Promise<DiplomaToken[]>;
  
  // Fonctions Token
  buyTokens: () => Promise<any>;
  getTokenBalance: (address: string) => Promise<TokenBalance>;
  payForVerification: (diplomaDAppAddress: string) => Promise<any>;
  
  // États
  isTransactionPending: boolean;
  lastTransactionHash: string | null;
  error: string | null;
}
