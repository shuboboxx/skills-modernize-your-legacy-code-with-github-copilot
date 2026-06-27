# COBOL Application Test Plan

This test plan covers the current COBOL application business logic and implementation. It is designed for stakeholder validation and can later be used to create unit and integration tests in a Node.js application.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-01 | View account balance | Application is running with initial balance `1000.00` | 1. Start the program
2. Enter option `1` | Display current balance `1000.00` |  |  |  |
| TC-02 | Credit account balance | Application is running with initial balance `1000.00` | 1. Start the program
2. Enter option `2`
3. Enter `200.00` | Display `Amount credited. New balance: 1200.00` and update balance to `1200.00` |  |  |  |
| TC-03 | Debit account successfully | Application is running with balance `1000.00` or more | 1. Start the program
2. Enter option `3`
3. Enter `500.00` | Display `Amount debited. New balance: 500.00` and update balance to `500.00` |  |  |  |
| TC-04 | Debit with insufficient funds | Application is running with balance `100.00` | 1. Start the program
2. Enter option `3`
3. Enter `200.00` | Display `Insufficient funds for this debit.` and keep balance at `100.00` |  |  |  |
| TC-05 | Handle invalid menu option | Application is running | 1. Start the program
2. Enter option `5` or any invalid choice | Display `Invalid choice, please select 1-4.` and continue showing the menu |  |  |  |
| TC-06 | Exit the program | Application is running | 1. Start the program
2. Enter option `4` | Display `Exiting the program. Goodbye!` and terminate the program |  |  |  |
| TC-07 | Data access separation | Application is running | 1. Execute a balance query, credit, or debit operation
2. Confirm `DataProgram` is called for data access | `Operations` should call `DataProgram` for `READ` or `WRITE`, and `DataProgram` should maintain the account balance state |  |  |  |
| TC-08 | Initial balance consistency | First application run | 1. Start the program
2. Enter option `1` | Display initial balance `1000.00` |  |  |  |

## Notes for Node.js Test Conversion
- Use the business logic as the basis for Node.js unit tests:
  - Balance query returns the current balance
  - Credit increases the balance and persists the change
  - Debit checks balance before withdrawal and rejects if insufficient
  - Invalid menu choices do not terminate the application
  - Exit choice terminates the session cleanly
- Use the Actual Result and Status columns for manual validation and stakeholder review.
