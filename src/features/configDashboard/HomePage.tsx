import { Web3Button } from '@web3modal/react'
import { useBalance, useClient, useProvider, useSigner } from 'wagmi';

export function HomePage() {

  const { data, isError, isLoading } = useBalance({
    address: '0x7E71FB21D0B30F5669f8F387D4A1114294F8E418',
  })
 
  if (isLoading) return (<div>Fetching balance… <Web3Button /></div> )
  if (isError) return <div>Error fetching balance <Web3Button /> </div>
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
      <Web3Button /> 
    </div>
  )
}
