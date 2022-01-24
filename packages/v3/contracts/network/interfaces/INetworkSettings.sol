// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.11;

import { IUpgradeable } from "../../utility/interfaces/IUpgradeable.sol";

import { ReserveToken } from "../../token/ReserveToken.sol";

error NotWhitelisted();

/**
 * @dev Network Settings interface
 */
interface INetworkSettings is IUpgradeable {
    /**
     * @dev returns the protected tokens whitelist
     */
    function protectedTokenWhitelist() external view returns (ReserveToken[] memory);

    /**
     * @dev checks whether a given token is whitelisted
     */
    function isTokenWhitelisted(ReserveToken pool) external view returns (bool);

    /**
     * @dev returns the network token funding limit for a given pool
     */
    function poolFundingLimit(ReserveToken pool) external view returns (uint256);

    /**
     * @dev returns the minimum network token trading liquidity required before the system enables trading in the
     * relevant pool
     */
    function minLiquidityForTrading() external view returns (uint256);

    /**
     * @dev returns the global network fee (in units of PPM)
     *
     * notes:
     *
     * - the network fee is a portion of the total fees from each pool
     */
    function networkFeePPM() external view returns (uint32);

    /**
     * @dev returns the withdrawal fee (in units of PPM)
     */
    function withdrawalFeePPM() external view returns (uint32);

    /**
     * @dev returns the flash-loan fee (in units of PPM)
     */
    function flashLoanFeePPM() external view returns (uint32);

    /**
     * @dev returns the maximum deviation of the average rate from the spot rate (in units of PPM)
     */
    function averageRateMaxDeviationPPM() external view returns (uint32);
}
