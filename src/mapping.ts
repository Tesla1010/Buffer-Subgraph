import {
  Create,
  Expire,
  Exercise,
  Pause,
  CreateContract,
} from "../generated/BufferBinaryOptions/BufferBinaryOptions";
import {
  InitiateTrade,
  CancelTrade,
  OpenTrade,
} from "../generated/BufferRouter/BufferRouter";
import {
  _handleCreate,
  _handleExpire,
  _handleExercise,
  _handleCreateContract,
} from "./optionContractHandlers";
import {
  _handleCancelTrade,
  _handleOpenTrade,
  _handleInitiateTrade,
} from "./routerContractHandlers";

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
