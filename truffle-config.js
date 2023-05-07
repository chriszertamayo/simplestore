
const PrivateKeyProvider = require('@truffle/hdwallet-provider')
const privateKey = "0bd9ee6acf148beb235b1da37352e6cb804f6629054f01a0b80c1eef92fc1ee7"

module.exports = {
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 22000,            // Standard Ethereum port (default: none)
      gas: 5000000,
      gasPrice: 0,
      network_id: "*",
      type: 'quorum'
    },
    // develop: {
    //   port: 8545,
    // },
    // quickstartWallet: {
    //   provider: () =>
    //     new PrivateKeyProvider(privateKey, "http://localhost:8545"),
    //   network_id: "*",
    //   type: "quorum",
    //   gasPrice: 0,
    //   chainId: 1337,
    // },


    compilers: {
      solc: {
        version: '^0.5.0',
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
};
