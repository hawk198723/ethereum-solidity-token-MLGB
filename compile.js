const path = require("path");
const fs = require("fs");
const solc = require("solc");

const mlgbToken = path.resolve(__dirname, "contract", "MlgbToken.sol");
const source = fs.readFileSync(mlgbToken, "utf8");

// console.log(source);  $node compile.js  //for testing
var input = {
  language: "Solidity",
  sources: {
    "MlgbToken.sol": {
      content: source,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var contract = output.contracts["MlgbToken.sol"]["MlgbToken"];

var dirName = "bin";

const contractByteCodePath = path.join(dirName, "MlgbToken.bin");
fs.writeFileSync(contractByteCodePath, contract.evm.bytecode.object);

const contractAbiPath = path.join(dirName, "MlgbToken.abi");
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi));

//npm install --save @truffle/hdwallet-provider@1.0.42
