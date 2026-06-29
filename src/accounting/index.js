const readline = require('readline');

const INITIAL_BALANCE = 1000.00;
let storedBalance = INITIAL_BALANCE;

function readBalance() {
  return storedBalance;
}

function writeBalance(newBalance) {
  storedBalance = newBalance;
}

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

const defaultPromptImpl = (message) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

let promptImpl = defaultPromptImpl;

async function prompt(message) {
  return promptImpl(message);
}

function setPrompt(fn) {
  promptImpl = fn;
}

function resetPrompt() {
  promptImpl = defaultPromptImpl;
}

async function handleTotal() {
  const balance = readBalance();
  console.log(`Current balance: ${balance.toFixed(2)}`);
}

async function handleCredit() {
  const amountInput = await prompt('Enter credit amount: ');
  const amount = parseFloat(amountInput);

  if (Number.isNaN(amount) || amount < 0) {
    console.log('Invalid credit amount.');
    return;
  }

  const balance = readBalance();
  const newBalance = balance + amount;
  writeBalance(newBalance);
  console.log(`Amount credited. New balance: ${newBalance.toFixed(2)}`);
}

async function handleDebit() {
  const amountInput = await prompt('Enter debit amount: ');
  const amount = parseFloat(amountInput);

  if (Number.isNaN(amount) || amount < 0) {
    console.log('Invalid debit amount.');
    return;
  }

  const balance = readBalance();
  if (balance >= amount) {
    const newBalance = balance - amount;
    writeBalance(newBalance);
    console.log(`Amount debited. New balance: ${newBalance.toFixed(2)}`);
  } else {
    console.log('Insufficient funds for this debit.');
  }
}

async function processChoice(choice) {
  switch (choice) {
    case 1:
      await handleTotal();
      return true;
    case 2:
      await handleCredit();
      return true;
    case 3:
      await handleDebit();
      return true;
    case 4:
      return false;
    default:
      console.log('Invalid choice, please select 1-4.');
      return true;
  }
}

async function run() {
  let continueFlag = true;

  while (continueFlag) {
    displayMenu();
    const choiceInput = await prompt('Enter your choice (1-4): ');
    const choice = parseInt(choiceInput, 10);
    continueFlag = await processChoice(choice);
  }

  console.log('Exiting the program. Goodbye!');
}

if (require.main === module) {
  run();
}

module.exports = {
  INITIAL_BALANCE,
  readBalance,
  writeBalance,
  prompt,
  setPrompt,
  resetPrompt,
  handleTotal,
  handleCredit,
  handleDebit,
  processChoice,
  run,
};
