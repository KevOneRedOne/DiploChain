import { ethers } from "hardhat";

async function main() {
  const DiplomaNFT = await ethers.getContractFactory("DiplomaNFT");
  const diplomaNFT = await DiplomaNFT.deploy();
  await diplomaNFT.waitForDeployment();
  console.log("DiplomaNFT déployé à :", await diplomaNFT.getAddress());
  const DiplomaToken = await ethers.getContractFactory("DiplomaToken");
  const diplomaToken = await DiplomaToken.deploy();
  await diplomaToken.waitForDeployment();
  console.log("DiplomaToken déployé à :", await diplomaToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
