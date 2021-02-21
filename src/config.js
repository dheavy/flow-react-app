import {config} from '@onflow/fcl'

config()
  .put('accessNode.api', process.env.REACT_APP_ACCESS_NODE) // Configure FCLs Access Node
  .put('challenge.handshake', process.env.REACT_APP_WALLET_DISCOVERY) // Configure FCLs Wallet
  .put('0xProfile', process.env.REACT_APP_CONTRACT_PROFILE) // Let's us use `0xProfile` in Cadence
