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
