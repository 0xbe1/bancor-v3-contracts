// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.7.6;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { IUpgradeable } from "../../utility/interfaces/IUpgradeable.sol";
import { ITokenHolder } from "../../utility/interfaces/ITokenHolder.sol";

import { IReserveToken } from "../../token/interfaces/IReserveToken.sol";

import { ILiquidityPoolCollection } from "../../pools/interfaces/ILiquidityPoolCollection.sol";

import { INetworkSettings } from "./INetworkSettings.sol";
import { IPendingWithdrawals } from "./IPendingWithdrawals.sol";

/**
 * @dev Bancor Network interface
 */
interface IBancorNetwork is IUpgradeable {
    /**
     * @dev returns the network token contract
     */
    function networkToken() external view returns (IERC20);

    /**
     * @dev returns the network settings contract
     */
    function settings() external view returns (INetworkSettings);

    /**
     * @dev returns the pending withdrawals contract
     */
    function pendingWithdrawals() external view returns (IPendingWithdrawals);

    /**
     * @dev returns the address of the external protection wallet
     */
    function externalProtectionWallet() external view returns (ITokenHolder);

    /**
     * @dev returns the set of all valid liquidity pool collections
     */
    function poolCollections() external view returns (ILiquidityPoolCollection[] memory);

    /**
     * @dev returns the most recent collection that was added to the liquidity pool collections set for a specific type
     */
    function latestPoolCollection(uint16 poolType) external view returns (ILiquidityPoolCollection);

    /**
     * @dev returns the set of all liquidity pools
     */
    function liquidityPools() external view returns (IReserveToken[] memory);

    /**
     * @dev returns the respective liquidity pool collection for the provided pool
     */
    function collectionByPool(IReserveToken pool) external view returns (ILiquidityPoolCollection);

    /**
     * @dev returns whether the pool is valid
     */
    function isPoolValid(IReserveToken pool) external view returns (bool);

    /**
     * @dev creates a new pool
     *
     * requirements:
     *
     * - the pool doesn't exist
     */
    function createPool(uint16 poolType, IReserveToken reserveToken) external;
}
