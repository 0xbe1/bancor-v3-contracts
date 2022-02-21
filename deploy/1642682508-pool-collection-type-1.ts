import { ContractName, DeploymentTag, deploy, execute, DeployedContracts } from '../utils/Deploy';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async ({ getNamedAccounts }: HardhatRuntimeEnvironment) => {
    const { deployer } = await getNamedAccounts();

    const network = await DeployedContracts.BancorNetworkV1.deployed();
    const bnt = await DeployedContracts.BNT.deployed();
    const networkSettings = await DeployedContracts.NetworkSettingsV1.deployed();
    const omniVault = await DeployedContracts.OmniVaultV1.deployed();

    const omniPool = await DeployedContracts.OmniPoolV1.deployed();
    const externalProtectionVault = await DeployedContracts.ExternalProtectionVaultV1.deployed();
    const poolTokenFactory = await DeployedContracts.PoolTokenFactoryV1.deployed();
    const poolCollectionUpgrader = await DeployedContracts.PoolCollectionUpgraderV1.deployed();

    const poolCollectionAddress = await deploy({
        name: ContractName.PoolCollectionType1V1,
        contract: 'PoolCollection',
        from: deployer,
        args: [
            network.address,
            bnt.address,
            networkSettings.address,
            omniVault.address,
            omniPool.address,
            externalProtectionVault.address,
            poolTokenFactory.address,
            poolCollectionUpgrader.address
        ]
    });

    await execute({
        name: ContractName.BancorNetworkV1,
        methodName: 'addPoolCollection',
        args: [poolCollectionAddress],
        from: deployer
    });

    return true;
};

func.id = ContractName.PoolCollectionType1V1;
func.dependencies = [
    DeploymentTag.V2,
    ContractName.BancorNetworkV1,
    ContractName.NetworkSettingsV1,
    ContractName.OmniVaultV1,
    ContractName.OmniPoolV1,
    ContractName.ExternalProtectionVaultV1,
    ContractName.PoolTokenFactoryV1,
    ContractName.PendingWithdrawalsV1,
    ContractName.PoolCollectionUpgraderV1
];
func.tags = [DeploymentTag.V3, ContractName.PoolCollectionType1V1];

export default func;
