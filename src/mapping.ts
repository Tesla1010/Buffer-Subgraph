import { BigInt } from "@graphprotocol/graph-ts";
import {
  Create,
  Expire,
  Exercise,
  CreateContract,
  Pause
} from "../generated/BufferBinaryOptions/BufferBinaryOptions";
import {
  InitiateTrade,
  CancelTrade,
  OpenTrade,
} from "../generated/BufferRouter/BufferRouter";
import {
  StartTournament,
  CloseTournament,
  EndTournament,
  VerifyTournament,
} from "../generated/TournamentManager/TournamentManager";
import {
  _handleCreate,
  _handleExpire,
  _handleExercise,
  _handleCreateContract,
  _handlePause
} from "./optionContractHandlers";
import {
  _handleCancelTrade,
  _handleOpenTrade,
  _handleInitiateTrade,
} from "./routerContractHandlers";
import { updateTournamentState } from "./tournamentManagerHandlers";

export function handleCreateContract(event: CreateContract): void {
  _handleCreateContract(event);
}

export function handleInitiateTrade(event: InitiateTrade): void {
  _handleInitiateTrade(event);
}

export function handleOpenTrade(event: OpenTrade): void {
  _handleOpenTrade(event);
}

export function handleCancelTrade(event: CancelTrade): void {
  _handleCancelTrade(event);
}

export function handleCreate(event: Create): void {
  _handleCreate(event);
}

export function handleExercise(event: Exercise): void {
  _handleExercise(event);
}

export function handleExpire(event: Expire): void {
  _handleExpire(event);
}

export function handlePause(event: Pause): void {
  _handlePause(event);
}

export function handleVerifyTournament(event: VerifyTournament): void {
  updateTournamentState(
    event.params.tournamentId,
    "Verified",
    event.block.timestamp
  );
}

export function handleStartTournament(event: StartTournament): void {
  updateTournamentState(
    event.params.tournamentId,
    "Started",
    event.block.timestamp
  );
}

export function handleCloseTournament(event: CloseTournament): void {
  updateTournamentState(
    event.params.tournamentId,
    "Closed",
    event.block.timestamp
  );
}

export function handleEndTournament(event: EndTournament): void {
  updateTournamentState(
    event.params.tournamentId,
    "Ended",
    event.block.timestamp
  );
}
