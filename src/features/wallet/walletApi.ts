import { ContractFactory } from 'ethers';
import { abi, bytecode } from '../../templates/ERC20';
import { fetchSigner } from '@wagmi/core';
import { authenticator } from 'otplib';
import  aa from "totp-generator"

export async function generateUrl() {
  console.log("AAA");
  const signer = await fetchSigner()
  console.log("BBB");
  // if (signer == null) {
  //   console.log("signer is null");
  //   throw Error("No signer")
  // }

  // const secret = await signer.getAddress()
  // const uri = await authenticator.keyuri(secret, "test", secret)
  console.log("ZZZZ");
  const token = aa("JBSWY3DPEHPK3PXP", { timestamp: 1686409372 });
  console.log("HELLO");
  console.log(token); // prints a token for given time

  return token
}

export async function check(code: string) {
  const signer = await fetchSigner()
  if (signer == null) {
    throw Error("No signer")
  }

  const secret = await signer.getAddress()
  return await authenticator.check(code, secret)
}
