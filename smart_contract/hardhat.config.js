

//https://eth-ropsten.alchemyapi.io/v2/NuJFavCIoR1Wzc0nqYaaX-tQ85vXTkU0
require("@nomiclabs/hardhat-waffle"); 

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/NuJFavCIoR1Wzc0nqYaaX-tQ85vXTkU0",
      accounts: ["6b4d0a667757fb7b64f046226a95307a14aa0fd70708ab98ce77b86e290beb8c"]
    }
  }
}