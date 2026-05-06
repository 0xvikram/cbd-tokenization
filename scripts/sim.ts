import { network } from "hardhat";

async function main() {
  const { ethers } = await network.create();
  
  const propertyAddress = "0xbE5046F40c76339C0869392e0b3c75AF6C8a0Efc";
  const userAddress = "0x8549a0e78DEBd17CB88A90e4C05A4D80CD61F79C";
  
  const property = await ethers.getContractAt("Property", propertyAddress);
  
  const value = ethers.parseUnits("2000", 6);
  
  console.log("Simulating depositProfit...");
  try {
    const gas = await property.depositProfit.estimateGas(value, { from: userAddress });
    console.log("Gas estimate:", gas.toString());
  } catch (e: any) {
    console.error("Simulation failed:", e.message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
