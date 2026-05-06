import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function getProvider() {
    if (!window.ethereum) throw new Error("MetaMask not found");

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider;
}

export async function getSigner() {
    const provider = await getProvider();
    return await provider.getSigner();
}