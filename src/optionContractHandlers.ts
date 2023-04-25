import { Address } from "@graphprotocol/graph-ts";
import {
  Create,
  Expire,
  Exercise,
  BufferBinaryOptions,
  CreateContract
} from "../generated/BufferBinaryOptions/BufferBinaryOptions";
import { _getDayId, _getHourId, _getWeekId } from "./helpers";
import {
  _loadOrCreateOptionContractEntity,
  _loadOrCreateOptionDataEntity
} from "./initialize";
import { BufferRouter } from "../generated/BufferRouter/BufferRouter";
import { State, RouterAddress } from "./config";


export function _handleCreateContract(event: CreateContract): void {
  let contractAddress = event.address;
  let routerContract = BufferRouter.bind(Address.fromString(RouterAddress));
  if (routerContract.contractRegistry(contractAddress) == true) {
    let optionContract = _loadOrCreateOptionContractEntity(contractAddress);
    optionContract.asset = event.params.assetPair;
    optionContract.config = event.params.config;
  }
}


export function _handleCreate(event: Create): void {
  let contractAddress = event.address;
  let routerContract = BufferRouter.bind(Address.fromString(RouterAddress));
  if (routerContract.contractRegistry(contractAddress) == true) {
    let optionID = event.params.id;
    let optionContractInstance = BufferBinaryOptions.bind(contractAddress);
    let optionData = optionContractInstance.options(optionID);
    let isAbove = optionData.value6 ? true : false;
    let totalFee = event.params.totalFee;
    let userOptionData = _loadOrCreateOptionDataEntity(
      optionID,
      contractAddress
    );
    userOptionData.user = event.params.account;
    userOptionData.totalFee = totalFee;
    userOptionData.state = optionData.value0;
    userOptionData.strike = optionData.value1;
    userOptionData.amount = optionData.value2;
    userOptionData.expirationTime = optionData.value5;
    userOptionData.isAbove = isAbove;
    userOptionData.creationTime = optionData.value8;
    userOptionData.settlementFee = event.params.settlementFee;
    userOptionData.save();
  }
}

export function _handleExpire(event: Expire): void {
  let contractAddress = event.address;
  let routerContract = BufferRouter.bind(Address.fromString(RouterAddress));
  if (routerContract.contractRegistry(contractAddress) == true) {
    let userOptionData = _loadOrCreateOptionDataEntity(
      event.params.id,
      contractAddress
    );
    userOptionData.state = State.expired;
    userOptionData.expirationPrice = event.params.priceAtExpiration;
    userOptionData.save();
  }
}

export function _handleExercise(event: Exercise): void {
  let contractAddress = event.address;
  let routerContract = BufferRouter.bind(Address.fromString(RouterAddress));
  if (routerContract.contractRegistry(contractAddress) == true) {
    let userOptionData = _loadOrCreateOptionDataEntity(
      event.params.id,
      contractAddress
    );
    userOptionData.state = State.exercised;
    userOptionData.payout = event.params.profit;
    userOptionData.expirationPrice = event.params.priceAtExpiration;
    userOptionData.save();
  }
}

