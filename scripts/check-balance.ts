import { network } from "hardhat";

async function main() {
  const { ethers } = await network.create();
  
  const usdcAddress = "0xB0c0b2ec739fBF960c4A8bca9D589dfe45F2eC41";
  const userAddress = "0x8549a0e78DEBd17CB88A90e4C05A4D80CD61F79C";
  const deployerAddress = "0x294F5853Db5252EB84e1799D597EFEB41EA636E9";
  
  const USDC = await ethers.getContractAt("MockUSDC", usdcAddress);
  
  const balanceUser = await USDC.balanceOf(userAddress);
  const balanceDeployer = await USDC.balanceOf(deployerAddress);
  
  console.log(`User ${userAddress} balance: ${ethers.formatUnits(balanceUser, 6)} USDC`);
  console.log(`Deployer ${deployerAddress} balance: ${ethers.formatUnits(balanceDeployer, 6)} USDC`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
