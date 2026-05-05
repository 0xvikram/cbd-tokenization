import { network } from "hardhat";

async function main() {
  const { ethers } = await network.create();

  const [owner, user1, user2] = await ethers.getSigners();

  console.log("Owner:", owner.address);
  console.log("User1:", user1.address);
  console.log("User2:", user2.address);

  // -------------------------
  // Deploy USDC
  // -------------------------
  const USDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await USDC.deploy();
  await usdc.waitForDeployment();

  const usdcAddress = await usdc.getAddress();
  console.log("USDC deployed:", usdcAddress);

  // -------------------------
  // Deploy Factory
  // -------------------------
  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  console.log("Factory deployed:", await factory.getAddress());

  // -------------------------
  // Create Property
  // -------------------------
  await factory.createProperty(usdcAddress);
  const properties = await factory.getProperties();
  const propertyAddress = properties[0];

  console.log("Property created:", propertyAddress);

  const property = await ethers.getContractAt("Property", propertyAddress);

  // -------------------------
  // Give users USDC
  // -------------------------
  await usdc.transfer(user1.address, 1000 * 10**6);
  await usdc.transfer(user2.address, 2000 * 10**6);

  console.log("USDC distributed to users");

  // -------------------------
  // Users approve + deposit
  // -------------------------
  await usdc.connect(user1).approve(propertyAddress, 1000 * 10**6);
  await property.connect(user1).deposit(1000 * 10**6);

  await usdc.connect(user2).approve(propertyAddress, 2000 * 10**6);
  await property.connect(user2).deposit(2000 * 10**6);

  console.log("Users invested");

  // -------------------------
  // Check balances BEFORE
  // -------------------------
  console.log("\nBefore distribution:");
  console.log("User1:", (await usdc.balanceOf(user1.address)).toString());
  console.log("User2:", (await usdc.balanceOf(user2.address)).toString());

  // -------------------------
  // Admin adds profit
  // -------------------------
  await usdc.approve(propertyAddress, 3000 * 10**6);
  await property.depositProfit(3000 * 10**6);

  console.log("Profit added");

  // -------------------------
  // Distribute profit
  // -------------------------
  await property.distribute();

  console.log("Distribution done");

  // -------------------------
  // Check balances AFTER
  // -------------------------
  console.log("\nAfter distribution:");
  console.log("User1:", (await usdc.balanceOf(user1.address)).toString());
  console.log("User2:", (await usdc.balanceOf(user2.address)).toString());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});