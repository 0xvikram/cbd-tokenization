import { network } from "hardhat";

async function main() {
  const { ethers } = await network.create();
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const USDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await USDC.deploy();
  await usdc.waitForDeployment();

  console.log("USDC:", await usdc.getAddress());

  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  console.log("Factory:", await factory.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});