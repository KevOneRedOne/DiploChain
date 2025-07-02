import { DiplomaContract } from '../types/web3';

export const DIPLOMA_NFT_ABI = [
  'function nextTokenId() view returns (uint256)',
  'function accreditedSchools(address) view returns (bool)',
  'function diplomaDetails(uint256) view returns (string studentName, string diplomaTitle, string institution, string issueDate, string ipfsCID)',
  'function tokenAddress() view returns (address)',
  'function addSchool(address _school)',
  'function mintDiploma(address to, string studentName, string diplomaTitle, string institution, string issueDate, string ipfsCID)',
  'function updateDiplomaData(uint256, string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function owner() view returns (address)',
  'function companies(address) view returns (uint256 id, string name, string country)',
  'function students(address) view returns (uint256 id, string nom, string prenom, string email)',
  'function schools(address) view returns (uint256 id, string name, string country, bool accredited)',
  'function diplomaToStudent(uint256) view returns (uint256)',
  'function diplomaToSchool(uint256) view returns (uint256)',
  'function isSchoolAccredited(address) view returns (bool)',
  'function registerCompany(address account, uint256 id, string name, string country)',
  'function registerStudent(address account, uint256 id, string nom, string prenom, string email)',
  'function registerSchool(address account, uint256 id, string name, string country)',
  'event DiplomaMinted(address indexed to, uint256 indexed tokenId, string studentName, string institution)',
  'event SchoolAccredited(address indexed addedBy, address schoolAcc)',
];

export const DIPLOMA_TOKEN_ABI = [
  'function INITIAL_SUPPLY() view returns (uint256)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'function buyTokens() payable',
  'function rewardForEvaluation(address company)',
  'function payForVerification(address to)',
  'function owner() view returns (address)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
];

export const CONTRACTS: Record<
  string,
  {
    diplomaNFT: DiplomaContract;
    diplomaToken: DiplomaContract;
  }
> = {
  // Hardhat local network
  hardhat: {
    diplomaNFT: {
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      abi: DIPLOMA_NFT_ABI,
    },
    diplomaToken: {
      address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      abi: DIPLOMA_TOKEN_ABI,
    },
  },
  // Sonic testnet
  sonic: {
    diplomaNFT: {
      address: '0x232B40F317315A303D75A7d846c85e8330db4329',
      abi: DIPLOMA_NFT_ABI,
    },
    diplomaToken: {
      address: '0xF0bC756473b8667912E7EB0413301ceCf5c08a4A',
      abi: DIPLOMA_TOKEN_ABI,
    },
  },
  // Blaze testnet (mêmes contrats que Sonic)
  blaze: {
    diplomaNFT: {
      address: '0x232B40F317315A303D75A7d846c85e8330db4329',
      abi: DIPLOMA_NFT_ABI,
    },
    diplomaToken: {
      address: '0xF0bC756473b8667912E7EB0413301ceCf5c08a4A',
      abi: DIPLOMA_TOKEN_ABI,
    },
  },
  // Sepolia testnet
  sepolia: {
    diplomaNFT: {
      address: '',
      abi: DIPLOMA_NFT_ABI,
    },
    diplomaToken: {
      address: '',
      abi: DIPLOMA_TOKEN_ABI,
    },
  },
  // Goerli testnet
  goerli: {
    diplomaNFT: {
      address: '',
      abi: DIPLOMA_NFT_ABI,
    },
    diplomaToken: {
      address: '',
      abi: DIPLOMA_TOKEN_ABI,
    },
  },
};

export const getContractsForNetwork = (chainId: number) => {
  const networkKey = getNetworkKey(chainId);
  return CONTRACTS[networkKey] || CONTRACTS.blaze;
};

const getNetworkKey = (chainId: number): string => {
  console.log('Getting network key for chainId:', chainId);

  switch (chainId) {
    case 31337:
      return 'hardhat';
    case 11155111:
      return 'sepolia';
    case 5:
      return 'goerli';
    case 64165:
      return 'sonic';
    case 57054:
      return 'blaze';
    case 146:
    case 64240:
      return 'blaze';
    default:
      console.warn('Unknown chainId, defaulting to blaze:', chainId);
      return 'blaze';
  }
};
