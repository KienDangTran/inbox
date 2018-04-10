const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const provider = ganache.provider();
const web3 = new Web3(provider);
let accounts;
let inbox;
const INIT_MSG = 'Hi there!';
const NEW_MSG = 'Bye there!';

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INIT_MSG] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploy a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INIT_MSG);
  });

  it('can set the message', async () => {
    await inbox.methods.setMessage(NEW_MSG).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, NEW_MSG);    
  });
});