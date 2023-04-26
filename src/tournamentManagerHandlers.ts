import { BigInt } from "@graphprotocol/graph-ts";
import { _loadOrCreateTournamentEntity } from "./initialize";

export function updateTournamentState(
  tournamentID: BigInt,
  state: string,
  timestamp: BigInt
): void {
  let tournamentEntity = _loadOrCreateTournamentEntity(tournamentID);
  tournamentEntity.lastUpdated = timestamp;
  tournamentEntity.state = state;
  tournamentEntity.save();
}
