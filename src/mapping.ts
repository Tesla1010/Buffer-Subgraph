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
  CreateTournament
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

export function handleCreateTournament(event: CreateTournament): void {
  updateTournamentState(
    event.params.tournamentId,
    "Created",
    event.block.timestamp
  );
}

export function handleVerifyTournament(event: VerifyTournament): void {
  updateTournamentState(
    event.params.tournamentId,
    "Upcoming",
    event.block.timestamp
  );
}

export function handleStartTournament(event: StartTournament): void {
  updateTournamentState(
    event.params.tournamentId,
    "Live",
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
    "Closed",
    event.block.timestamp
  );
}
