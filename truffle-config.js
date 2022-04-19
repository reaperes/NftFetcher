const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const { DEPLOYER_PRIVATE_KEY, JSON_RPC_ENDPOINT } = process.env;

module.exports = {
  networks: {
    local: {
      host: "localhost",
      port: 8545,
      network_id: "*",
    },
    baobab: {
      provider: () => new HDWalletProvider(DEPLOYER_PRIVATE_KEY, JSON_RPC_ENDPOINT),
      network_id: 1001,
      gas: "1000000",
      gasPrice: "750000000000",
    },
    cypress: {
      provider: () => new HDWalletProvider(DEPLOYER_PRIVATE_KEY, JSON_RPC_ENDPOINT),
      network_id: 8217,
      gas: "1000000",
      gasPrice: "750000000000",
    },
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.13",
      settings: {
        optimizer: {
          enabled: true,
          runs: 9999,
        },
        evmVersion: 'london',
      }
    }
  }
}
