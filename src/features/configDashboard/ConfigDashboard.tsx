import React, { useState } from 'react';

import { useAccount, useContract, useSigner, useClient, useProvider } from 'wagmi'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectName,
  selectAmount,
  deployContract,
  setName,
  setAmount,
} from './configDashboardSlice';
import styles from './ConfigDashboard.module.css';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, celoAlfajores, mainnet, polygon } from 'wagmi/chains'
import { HomePage } from './HomePage';

const chains = [arbitrum, mainnet, polygon, celoAlfajores]
const projectId = '069174f78da055a3b481d25147362c18'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)


export function ConfigDashboard() {
  const name = useAppSelector(selectName);
  const amount = useAppSelector(selectAmount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div className={styles.configDashBoard}>

      <WagmiConfig client={wagmiClient}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient}  />

      <input
        className={styles.textbox}
        aria-label="Name"
        // value={name}
        onChange={(e) => dispatch(setName(e.target.value))
        }
      />
      <input
        className={styles.textbox}
        aria-label="Amount"
        value={amount}
        onChange={(e) => dispatch(setAmount(e.target.value))}
      />
      <button
        className={styles.button}
        aria-label="Deploy"
        onClick={() => dispatch(deployContract(10))}
      >
        -
      </button>
      Config dashboard
    </div>
  );
}
