# DiploChain 🎓

A revolutionary blockchain-based diploma verification platform built on Ethereum, enabling secure, transparent, and instant verification of academic credentials.

## 🌟 Overview

DiploChain is a decentralized application (DApp) that leverages blockchain technology to create an immutable, secure system for diploma issuance and verification. The platform connects educational institutions, students, and companies through smart contracts, ensuring the authenticity and integrity of academic credentials.

## ✨ Key Features

### 🔐 **Secure Blockchain Storage**
- Diplomas stored immutably on Ethereum blockchain
- IPFS integration for metadata storage
- Tamper-proof certificate validation

### ⚡ **Instant Verification**
- Real-time diploma authenticity verification
- Token-based verification system (10 DIPTOK per verification)
- Automated verification process for employers

### 🏫 **Multi-Role Support**
- **Students**: Receive and manage blockchain diplomas
- **Institutions**: Issue verified academic credentials
- **Companies**: Verify candidate qualifications instantly

### 🪙 **Token Economy**
- **DiplomaToken (DIPTOK)**: Platform utility token
- Purchase rate: 0.01 ETH = 100 DIPTOK
- Evaluation rewards: 15 DIPTOK for internship evaluations

## 🏗️ Technical Architecture

### Smart Contracts
- **DiplomaNFT.sol**: ERC721 NFT contract for diploma certificates
- **DiplomaToken.sol**: ERC20 token for platform transactions
- **OpenZeppelin**: Security-focused contract libraries

### Frontend
- **Next.js 15**: React-based web application
- **TypeScript**: Type-safe development
- **Ethers.js & Web3.js**: Blockchain interaction
- **SCSS**: Modular styling architecture

### Blockchain Integration
- **Network**: Blaze Testnet (Sonic Labs)
- **Chain ID**: 57054
- **RPC URL**: https://rpc.blaze.soniclabs.com

## 🚀 Deployed Contracts

### DiplomaToken (DIPTOK)
- **Address**: `0xF0bC756473b8667912E7EB0413301ceCf5c08a4A`
- **Explorer**: [View on Blaze Explorer](https://blaze.soniclabs.com/address/0xf0bc756473b8667912e7eb0413301cecf5c08a4a)

### MockNFTDiploma
- **Address**: `0x232B40F317315A303D75A7d846c85e8330db4329`
- **Explorer**: [View on Blaze Explorer](https://blaze.soniclabs.com/address/0x232B40F317315A303D75A7d846c85e8330db4329)

## 📁 Project Structure

```
DiploChain/
├── frontend/              # Next.js web application
│   ├── src/
│   │   ├── app/          # App router pages
│   │   │   ├── Dashboard/
│   │   │   │   ├── Students/    # Student dashboard
│   │   │   │   ├── Institutions/ # Institution dashboard
│   │   │   │   └── Companies/   # Company dashboard
│   │   ├── components/   # Reusable React components
│   │   │   ├── Diploma/  # Diploma-related components
│   │   │   ├── Token/    # Token management
│   │   │   └── Web3/     # Blockchain integration
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Utility functions
├── smartContract/        # Hardhat development environment
│   ├── contracts/        # Solidity smart contracts
│   ├── scripts/          # Deployment scripts
│   └── test/            # Contract tests
└── docs/                # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MetaMask wallet
- Git

### 1. Clone Repository
```bash
git clone https://github.com/your-username/DiploChain.git
cd DiploChain
```

### 2. Smart Contract Setup
```bash
cd smartContract
npm install
npx hardhat compile
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Configuration
Create `.env` files in both `frontend` and `smartContract` directories:

**smartContract/.env**
```env
PRIVATE_KEY=your_private_key_here
BLAZE_RPC_URL=https://rpc.blaze.soniclabs.com
```

**frontend/.env.local**
```env
NEXT_PUBLIC_DIPLOMA_TOKEN_ADDRESS=0xF0bC756473b8667912E7EB0413301ceCf5c08a4A
NEXT_PUBLIC_DIPLOMA_NFT_ADDRESS=0x232B40F317315A303D75A7d846c85e8330db4329
NEXT_PUBLIC_CHAIN_ID=57054
```

## 🔧 Development Commands

### Smart Contracts
```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to testnet
npm run build

# Security analysis
npm run slither
```

### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Code linting
npm run lint

# Format code
npm run format
```

## 🔒 Security Features

### Smart Contract Security
- **Mythril Analysis**: Automated vulnerability scanning
- **Access Control**: Role-based permissions
- **OpenZeppelin**: Battle-tested contract libraries
- **Immutable Data**: Blockchain-based storage

### Code Quality
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety
- **Husky**: Pre-commit hooks

## 🎯 Usage Scenarios

### For Educational Institutions
1. Register as accredited institution
2. Mint diploma NFTs for graduates
3. Store metadata on IPFS
4. Track issued certificates

### For Students
1. Connect MetaMask wallet
2. Receive diploma NFTs
3. Share verification links
4. Manage academic credentials

### For Companies
1. Purchase DIPTOK tokens
2. Verify candidate diplomas
3. Pay verification fees
4. Access verification history

## 🧪 Testing

### Contract Testing
```bash
cd smartContract
npx hardhat test
```

### Security Analysis
```bash
# Install Mythril
pip install mythril

# Analyze contracts
myth analyze contracts/diplomaNFT.sol --solv 0.8.24
myth analyze contracts/diplomaToken.sol --solv 0.8.24
```

## 🚀 Deployment

### Local Development
```bash
# Start local Hardhat node
npx hardhat node

# Deploy contracts locally
npx hardhat run scripts/deployDiploma.ts --network localhost
```

### Testnet Deployment
```bash
# Deploy to Blaze Testnet
npx hardhat run scripts/deployDiploma.ts --network blaze
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📋 Roadmap

- [ ] **Phase 1**: Core NFT diploma minting
- [ ] **Phase 2**: Token economy implementation
- [ ] **Phase 3**: IPFS integration
- [ ] **Phase 4**: Mobile application
- [ ] **Phase 5**: Mainnet deployment

## 🏆 Team Roles

- **DEV 1**: Smart Contracts & Blockchain Backend
- **DEV 2**: Frontend & Web3 Integration
- **DEV 3**: Infrastructure & Security Testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [DiploChain DApp](https://your-demo-url.com)
- **Documentation**: [Project Docs](./docs/)
- **Blaze Explorer**: [View Contracts](https://blaze.soniclabs.com)

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Join our community discussions

---

*Built with ❤️ using Ethereum, Next.js, and cutting-edge Web3 technologies*