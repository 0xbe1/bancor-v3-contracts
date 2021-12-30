// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.10;

import { StakingRewardsMath } from "../staking-rewards/StakingRewardsMath.sol";

contract TestStakingRewardsMath is StakingRewardsMath {
    function calculateFlatRewardsT(
        uint32 timeElapsed,
        uint32 remainingProgramDuration,
        uint256 remainingRewards
    ) external pure returns (uint256) {
        return _calculateFlatRewards(timeElapsed, remainingProgramDuration, remainingRewards);
    }

    function calculateExponentialDecayRewardsAfterTimeElapsedT(uint32 timeElapsed, uint256 totalRewards)
        external
        pure
        returns (uint256)
    {
        return _calculateExponentialDecayRewardsAfterTimeElapsed(timeElapsed, totalRewards);
    }
}
