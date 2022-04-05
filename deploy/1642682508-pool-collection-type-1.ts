import { ContractName, deploy, DeployedContracts, DeploymentTag, execute } from '../utils/Deploy';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async ({ getNamedAccounts }: HardhatRuntimeEnvironment) => {
    const { deployer } = await getNamedAccounts();

    const network = await DeployedContracts.BancorNetworkV1.deployed();
    const bnt = await DeployedContracts.BNT.deployed();
    const networkSettings = await DeployedContracts.NetworkSettingsV1.deployed();
    const masterVault = await DeployedContracts.MasterVault.deployed();

    const bntPool = await DeployedContracts.BNTPool.deployed();
    const externalProtectionVault = await DeployedContracts.ExternalProtectionVault.deployed();
    const poolTokenFactory = await DeployedContracts.PoolTokenFactory.deployed();
    const poolMigrator = await DeployedContracts.PoolMigrator.deployed();

    const poolCollectionAddress = await deploy({
        name: ContractName.PoolCollectionType1V1,
        contract: 'PoolCollection',
        from: deployer,
        args: [
            network.address,
            bnt.address,
            networkSettings.address,
            masterVault.address,
            bntPool.address,
            externalProtectionVault.address,
            poolTokenFactory.address,
            poolMigrator.address
        ]
    });

    await execute({
        name: ContractName.BancorNetwork,
        methodName: 'addPoolCollection',
        args: [poolCollectionAddress],
        from: deployer
    });

    return true;
};

func.id = DeploymentTag.PoolCollectionType1V1;
func.dependencies = [
    DeploymentTag.V2,
    DeploymentTag.BancorNetworkV1,
    DeploymentTag.NetworkSettingsV1,
    DeploymentTag.MasterVaultV1,
    DeploymentTag.BNTPoolV1,
    DeploymentTag.ExternalProtectionVaultV1,
    DeploymentTag.PoolTokenFactoryV1,
    DeploymentTag.PendingWithdrawalsV1,
    DeploymentTag.PoolMigratorV1
];
func.tags = [DeploymentTag.V3, DeploymentTag.PoolCollectionType1V1];

export default func;
