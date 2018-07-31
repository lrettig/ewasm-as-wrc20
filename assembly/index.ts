// Ewasm-AssemblyScript proof of concept token contract
// Author: Lane Rettig <lane@cryptonyc.org>
// DO NOT USE IN PRODUCTION. THIS CODE HAS NOT BEEN AUDITED.
// All code offered without warranty.

import {
  Contract,
  assert,
  read,
  write,
} from "../node_modules/ewasm"

@ewasm
class TokenContract extends Contract {
  @store
  _balance: Map<Address, Amount>

  init(owner: Address, balance: Amount): void {
     this.setBalance(owner, balance)
  }
  
  getBalance(user: Address): Amount {
    return this._balance[user]
  }

  setBalance(user: Address, amt: Amount): void {
    this._balance[user] = amt
  }

  transfer(sender: Address, recipient: Address, amt: Amount): void {
    var balanceSender = this.getBalance(sender)
    var balanceRecip  = this.getBalance(recipient)
    assert(balanceSender >= amt)
    this.setBalance(sender, balanceSender - amt)
    this.setBalance(recipient, balanceRecip + amt)
  }
}

