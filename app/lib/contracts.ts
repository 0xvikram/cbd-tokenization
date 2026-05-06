export const FACTORY_ADDRESS = "0x6c4524fE5273596DB2B62f749ce3059DC9A34e12";
export const USDC_ADDRESS = "0xB0c0b2ec739fBF960c4A8bca9D589dfe45F2eC41";

// Minimal ABI
export const FACTORY_ABI = [
    "function createProperty(address usdc)",
    "function getProperties() view returns (address[])"
];

export const PROPERTY_ABI = [
    "function deposit(uint amount)",
    "function depositProfit(uint amount)",
    "function distribute()",
    "function contributions(address) view returns (uint)",
    "function totalContribution() view returns (uint)"
];

export const USDC_ABI = [
    "function approve(address spender, uint amount)",
    "function balanceOf(address owner) view returns (uint)",
    "function transfer(address to, uint amount)"
];