import { network } from "hardhat";

async function main() {
  const { ethers } = await network.create();
  
  const [deployer] = await ethers.getSigners();
  const usdcAddress = "0xB0c0b2ec739fBF960c4A8bca9D589dfe45F2eC41";
  
  console.log("Minting from deployer:", deployer.address);
  
  // The NEW MetaMask address the user is using
  const userAddress = "0xa9480338C79E19B13b497760ffc5bd47134abD2b";
  
  const USDC = await ethers.getContractAt("MockUSDC", usdcAddress);
  
  const amount = ethers.parseUnits("1000000", 6); 

  console.log(`Transferring ${ethers.formatUnits(amount, 6)} USDC to ${userAddress}...`);
  
  const tx = await USDC.transfer(userAddress, amount);
  await tx.wait();
  
  console.log("Transfer successful! You now have USDC in your new wallet.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
