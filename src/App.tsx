import { w3mProvider, w3mConnectors, EthereumClient } from '@web3modal/ethereum';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, celoAlfajores, mainnet, polygon } from 'wagmi/chains'
import './App.css';
import { ConfigDashboard } from './features/configDashboard/ConfigDashboard';
import Dashboard from './pages/Dashboard';
import { Web3Modal } from '@web3modal/react';
import { HomePage } from './features/configDashboard/HomePage';
import Main from './pages/common/Menu';

const chains = [arbitrum, mainnet, polygon, celoAlfajores]
const projectId = '069174f78da055a3b481d25147362c18'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
          <Main></Main>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
