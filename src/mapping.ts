import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {Slots_Outcome_Event } from "../generated/Slots/Slots";
import {
  PlayerResult
} from "../generated/schema";
let ZERO = BigInt.fromI32(0);
const zeroAddress = '0x0000000000000000000000000000000000000000';

function loadOrCreatePlayerResultData(playerAddress : Bytes, createdAt: BigInt): PlayerResult {
  let entity = PlayerResult.load(playerAddress);
  if (!entity) {
    entity = new PlayerResult(playerAddress);
  }
  entity.createdAt = createdAt;
  return entity;
}

export function handleSlots_Outcome_Event(event: Slots_Outcome_Event): void {
  let playerResult = loadOrCreatePlayerResultData(event.params.playerAddress, event.block.timestamp);
  playerResult.playerAddress = event.params.playerAddress;
  playerResult.wager  = event.params.wager;
  playerResult.payouts = event.params.payouts;
  playerResult.numGames = event.params.numGames;
  playerResult.slotIDs = event.params.slotIDs;
  playerResult.multipliers = event.params.multipliers;
  playerResult.payout = event.params.payout;
  playerResult.txn_hash = event.transaction.hash;
  playerResult.save();
} 
