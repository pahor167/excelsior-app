export function getChainName(chainId: number) {
    switch (chainId) {
        case 1:
            return "Ethereum"
        case 137:
            return "Polygon"
        case 44787:
            return "Alfajores"
        default:
            return "Unknown"
    }
}
