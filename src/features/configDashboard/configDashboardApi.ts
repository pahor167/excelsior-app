import { ContractFactory } from 'ethers';
import { abi, bytecode } from '../../templates/ERC20';
import { fetchSigner } from '@wagmi/core';

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export async function getBalance(name: string, symbol: string) {

}


export async function deployContractReal(name: string, symbol: string) {
  try {
    const signer = await fetchSigner()
    if (signer == null) {
      console.log("No signer !!");
      return;
    }
    const factory = new ContractFactory(abi, bytecode, signer);

    const contract = await factory.deploy(name, symbol);
    console.log(contract);  
  } catch (error) {
    console.log(error);
  }
  
}
