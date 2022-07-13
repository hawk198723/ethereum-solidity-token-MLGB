const HDwalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const path = require("path");
const fs = require("fs");
const { exit } = require("process");

const provider = new HDwalletProvider(
  "follow produce dust dinner olive price blast innocent honey hub brain edit",
  "https://rinkeby.infura.io/v3/4565271c0ff244d0b59609d352f16c41"
);

const web3 = new Web3(provider);

const abiPath = path.resolve(__dirname, "bin", "MlgbToken.abi");
const abi = fs.readFileSync(abiPath, "utf8");

const bytecodePath = path.resolve(__dirname, "bin", "MlgbToken.bin");
const bytecode = fs.readFileSync(bytecodePath, "utf8");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy your account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("Contract deployed to", result.options.address);
  exit(0);
};

deploy();
