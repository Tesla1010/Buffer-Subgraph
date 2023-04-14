import { Provide, Withdraw, Profit } from "../generated/BinaryPool/BinaryPool";
import {
  _createEventDataEntity,
  _loadOrCreateUserPoolEntity,
  _loadOrCreateCounter,
} from "./initialize";

export function handleProvide(event: Provide): void {
  _createEventDataEntity(
    event.transaction.hash,
    event.params.amount,
    event.params.account,
    "Provide",
    event.address,
    event.params.writeAmount,
    event.block.timestamp
  );
  let userPoolData = _loadOrCreateUserPoolEntity(
    event.params.account,
    event.address
  );
  userPoolData.amount = userPoolData.amount.plus(event.params.amount);
  userPoolData.save();
}

export function handleWithdraw(event: Withdraw): void {
  _createEventDataEntity(
    event.transaction.hash,
    event.params.amount,
    event.params.account,
    "Withdraw",
    event.address,
    event.params.writeAmount,
    event.block.timestamp
  );
  let userPoolData = _loadOrCreateUserPoolEntity(
    event.params.account,
    event.address
  );
  userPoolData.amount = userPoolData.amount.minus(event.params.amount);
  userPoolData.save();
}

export function handlePause(event: Profit): void {
  let a = "1";
}
