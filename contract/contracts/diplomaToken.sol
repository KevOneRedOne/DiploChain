// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title ERC20 Token for Diploma DApp Payments & Rewards
contract DiplomaToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 100_000 * 10 ** 18;

    constructor() ERC20("DiplomaToken", "DIPTOK") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY); // déploieur = owner = owner initiale
    }

    /// @dev Achat de tokens à 0.01 ETH pour 100 DIPTOK
    function buyTokens() external payable {
        require(msg.value == 0.01 ether, "Send exactly 0.01 ETH.");
        _transfer(owner(), msg.sender, 100 * 10 ** 18);
    }

    /// @dev Le owner récompense une entreprise après évaluation : 15 DIPTOK
    function rewardForEvaluation(address company) external onlyOwner {
        _transfer(owner(), company, 15 * 10 ** 18);
    }

    /// @dev Paiement de la vérification par un utilisateur : 10 DIPTOK
    function payForVerification(address to) external {
        _transfer(msg.sender, to, 10 * 10 ** 18);
    }
}
