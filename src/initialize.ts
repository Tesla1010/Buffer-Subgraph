import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { UserPoolData, EventData, Counter } from "../generated/schema";
let ZERO = BigInt.fromI32(0);

export function _loadOrCreateUserPoolEntity(
  userAddress: Bytes,
  contractAddress: Bytes
): UserPoolData {
  let id = `${userAddress}${contractAddress}`;
  let entity = UserPoolData.load(id);
  if (entity == null) {
    entity = new UserPoolData(id);
    entity.amount = ZERO;
    entity.contractAddress = contractAddress;
    entity.userAddress = userAddress;
    entity.save();
  }
  return entity as UserPoolData;
}

export function _createEventDataEntity(
  id: Bytes,
  amount: BigInt,
  userAddress: Bytes,
  name: string,
  contractAddress: Bytes,
  blpAmount: BigInt,
  timestamp: BigInt
): EventData {
  let counter = _loadOrCreateCounter();
  let entity = EventData.load(id);
  if (entity == null) {
    entity = new EventData(id);
    entity.userAddress = userAddress;
    entity.name = name;
    entity.amount = amount;
    entity.blpAmount = blpAmount;
    entity.contractAddress = contractAddress;
    entity.counter = counter.counter;
    entity.timestamp = timestamp;
    entity.save();
    counter.counter += 1;
    counter.save();
  }
  return entity as EventData;
}

export function _loadOrCreateCounter(): Counter {
  let entity = Counter.load("counter");
  if (!entity) {
    entity = new Counter("counter");
    entity.counter = 0;
    entity.save();
  }
  return entity;
}
