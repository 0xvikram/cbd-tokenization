import { network } from "hardhat";

async function main() {
  const { ethers } = await network.create();
  
  const propertyAddress = "0xbE5046F40c76339C0869392e0b3c75AF6C8a0Efc";
  const factoryAddress = "0x6c4524fE5273596DB2B62f749ce3059DC9A34e12";
  
  const property = await ethers.getContractAt("Property", propertyAddress);
  
  const usdcAddress = await property.usdc();
  console.log(`Property is using USDC at: ${usdcAddress}`);
  
  const factory = await ethers.getContractAt("Factory", factoryAddress);
  const properties = await factory.getProperties();
  console.log(`Factory properties: ${properties.join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
