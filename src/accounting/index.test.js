const accounting = require('./index');

describe('Accounting app business logic', () => {
  let consoleSpy;

  beforeEach(() => {
    accounting.writeBalance(accounting.INITIAL_BALANCE);
    accounting.resetPrompt();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    accounting.resetPrompt();
  });

  test('TC-01: View account balance', () => {
    expect(accounting.readBalance()).toBe(1000.00);
  });

  test('TC-02: Credit account balance', async () => {
    accounting.setPrompt(jest.fn().mockResolvedValue('200.00'));

    await accounting.handleCredit();

    expect(accounting.readBalance()).toBe(1200.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1200.00');
  });

  test('TC-03: Debit account successfully', async () => {
    accounting.setPrompt(jest.fn().mockResolvedValue('500.00'));

    await accounting.handleDebit();

    expect(accounting.readBalance()).toBe(500.00);
    expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 500.00');
  });

  test('TC-04: Debit with insufficient funds', async () => {
    accounting.writeBalance(100.00);
    accounting.setPrompt(jest.fn().mockResolvedValue('200.00'));

    await accounting.handleDebit();

    expect(accounting.readBalance()).toBe(100.00);
    expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
  });

  test('TC-05: Handle invalid menu option', async () => {
    const result = await accounting.processChoice(5);

    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith('Invalid choice, please select 1-4.');
  });

  test('TC-06: Exit the program', async () => {
    const result = await accounting.processChoice(4);

    expect(result).toBe(false);
  });

  test('TC-07: Data access separation', async () => {
    accounting.setPrompt(jest.fn().mockResolvedValue('100.00'));

    await accounting.handleCredit();

    expect(accounting.readBalance()).toBe(1100.00);
  });

  test('TC-08: Initial balance consistency', () => {
    expect(accounting.readBalance()).toBe(1000.00);
  });
});
