import { Address, BigInt } from "@graphprotocol/graph-ts";
import {Slots_Outcome_Event } from "../generated/Slots/Slots";
import {
  PlayerResult,
  Counter
} from "../generated/schema";
let ZERO = BigInt.fromI32(0);
const zeroAddress = '0x0000000000000000000000000000000000000000';

function loadOrCreateCounter(): Counter {
  let entity = Counter.load("counter");
  if (!entity) {
    entity = new Counter("counter");
    entity.counter = 0;
    entity.save();
  }
  return entity;
}

function loadOrPlayerResultData(): PlayerResult {
  let counter = loadOrCreateCounter();
  let entity = PlayerResult.load(counter.counter.toString());
  if (!entity) {
    entity = new PlayerResult(counter.counter.toString());
    entity.save();
  }
  return entity;
}

export function handleSlots_Outcome_Event(event: Slots_Outcome_Event): void {
  let playerResult = loadOrPlayerResultData();
  playerResult.playerAddress = event.params.playerAddress;
  playerResult.wager  = event.params.wager;
  playerResult.payouts = event.params.payouts;
  playerResult.numGames = event.params.numGames;
  playerResult.slotIDs = event.params.slotIDs;
  playerResult.multipliers = event.params.multipliers;
  playerResult.payout = event.params.payout;
  playerResult.save();
} 
