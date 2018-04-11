const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const INIT_MSG = 'Hi there!';


const provider = new HDWalletProvider(
  'basket crucial bracket empty hero spoil organ wonder danger sun loyal tool',
  'https://rinkeby.infura.io/1LfbCSyNzDD1hNmxHLXG'
);

const web3 = new Web3(provider);

const deploy = async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account: ' + accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INIT_MSG] })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('contract deployed to address: ' + result.options.address);
};

deploy();