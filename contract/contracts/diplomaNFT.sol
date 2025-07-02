// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract DiplomaNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId = 1;

    // Entities
    struct Student {
        uint256 id;
        string nom;
        string prenom;
        string email;
    }
    struct School {
        uint256 id;
        string name;
        string country;
        bool accredited;
    }
    struct Company {
        uint256 id;
        string name;
        string country;
    }

    mapping(address => Student) public students;
    mapping(address => School) public schools;
    mapping(address => Company) public companies;
    mapping(uint256 => uint256) public diplomaToStudent;    // diplomaTokenId => studentId
    mapping(uint256 => uint256) public diplomaToSchool;     // diplomaTokenId => schoolId

    // Role logic
    mapping(address => bool) public isSchoolAccredited;

    struct DiplomaMeta {
        string studentName;
        string diplomaTitle;
        string institution;
        string issueDate;
        string ipfsCID;
    }
    mapping(uint256 => DiplomaMeta) public diplomaDetails;

    event DiplomaMinted(address to, uint256 tokenId, string studentName, string institution);
    event SchoolAccredited(address indexed addedBy, address schoolAcc);

    constructor() ERC721("DiplomaNFT", "DIPLOMA") Ownable(msg.sender) {
        isSchoolAccredited[msg.sender] = true;
    }

    // --- Gestion des rôles/entités ---
    function registerStudent(address account, uint256 id, string calldata nom, string calldata prenom, string calldata email) external {
        students[account] = Student(id, nom, prenom, email);
    }
    function registerSchool(address account, uint256 id, string calldata name, string calldata country) external onlyOwner {
        schools[account] = School(id, name, country, true);
        isSchoolAccredited[account] = true;
        emit SchoolAccredited(msg.sender, account);
    }
    function registerCompany(address account, uint256 id, string calldata name, string calldata country) external onlyOwner {
        companies[account] = Company(id, name, country);
    }

    function addSchool(address account) external onlyOwner {
        isSchoolAccredited[account] = true;
        emit SchoolAccredited(msg.sender, account);
    }

    // --- Mint du diplôme (par un établissement accrédité uniquement) ---
    function mintDiploma(
        address to,
        string memory studentName,
        string memory diplomaTitle,
        string memory institution,
        string memory issueDate,
        string memory ipfsCID
    ) external {
        require(isSchoolAccredited[msg.sender], "Not accredited establishment");
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        diplomaDetails[tokenId] = DiplomaMeta(studentName, diplomaTitle, institution, issueDate, ipfsCID);
        _setTokenURI(tokenId, string(abi.encodePacked("ipfs://", ipfsCID)));

        // Si tous bien liés, associer aux id
        diplomaToStudent[tokenId] = students[to].id;
        diplomaToSchool[tokenId]  = schools[msg.sender].id;
        emit DiplomaMinted(to, tokenId, studentName, institution);
    }

    function updateDiplomaData(uint256 /*tokenId*/, string memory) public pure {
        revert("Data is immutable after minting");
    }
}
