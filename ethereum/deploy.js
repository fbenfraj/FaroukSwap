const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const bytecodePath = path.resolve(
  __dirname,
  "contracts",
  "build",
  "ethereum_contracts_FaroukSwap_sol_FaroukSwap.bin"
);

const abiPath = path.resolve(
  __dirname,
  "contracts",
  "build",
  "ethereum_contracts_FaroukSwap_sol_FaroukSwap.abi"
);

// don't forget encoding!
const bytecode = fs.readFileSync(bytecodePath, "utf8");
const abi = JSON.parse(fs.readFileSync(abiPath));

// this is a test wallet on the rinkeby network
const provider = new HDWalletProvider(
  "only can expect lion glove pudding rain hotel enemy pupil gadget make",
  "https://rinkeby.infura.io/v3/4b5b32a4e0d14a3ba8a80ee206a0c812"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
