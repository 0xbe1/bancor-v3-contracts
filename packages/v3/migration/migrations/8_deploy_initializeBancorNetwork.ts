import { Migration } from '../engine/types';
import { NextState as InitialState } from './7_deploy_liquidityPoolCollection';

export type NextState = InitialState;

const migration: Migration = {
    up: async (signer, contracts, initialState: InitialState, { deploy, execute, deployProxy }): Promise<NextState> => {
        const bancorNetwork = await contracts.BancorNetwork.attach(initialState.bancorNetwork.proxyContract);

        await execute(
            'Initialize BancorNetwork',
            bancorNetwork.initialize,
            initialState.pendingWithdrawals.proxyContract
        );

        return initialState;
    },

    healthCheck: async (
        signer,
        config,
        contracts,
        initialState: InitialState,
        state: NextState,
        { deploy, execute }
    ) => {
        const bancorNetwork = await contracts.BancorNetwork.attach(state.bancorNetwork.proxyContract);

        if ((await bancorNetwork.owner()) !== (await signer.getAddress())) throw new Error('Invalid Owner');
    },

    down: async (
        signer,
        contracts,
        initialState: InitialState,
        newState: NextState,
        { deploy, execute }
    ): Promise<InitialState> => {
        return initialState;
    }
};
export default migration;
