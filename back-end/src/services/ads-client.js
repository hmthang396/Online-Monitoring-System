const ads = require("ads-client");

const readADS = async (node, account) => {
    
};

module.exports = {
    read: async (node, account) => {
        try {
            if (node.role.read && account.permission.read) {
                let client = await new ads.Client({
                    routerAddress: node.datasource.host.toString(),
                    routerTcpPort: 48898,
                    targetAmsNetId: node.datasource.target.toString(),
                    localAmsNetId: node.datasource.source.toString(),
                    targetAdsPort: 851,
                    localAdsPort: 32750,
                    timeout: 2000,
                });
                client.on('read', () => {
                    console.log(`read`);
                });
                await client.connect();
                await client.removeAllListeners();
                let result = await client.readSymbol(`${node.variable}`);
                await client.disconnect(true);
                return result.value.toFixed(2);
            } else {
                return "Lock";
            }
        } catch (err) {
            await client.disconnect();
            console.log(err);
            return "Error";
        }
    },

    readControl: async (node, account) => {
        try {
            if (node.role.write && account.permission.write) {
                let client = await new ads.Client({
                    routerAddress: node.datasource.host.toString(),
                    routerTcpPort: 48898,
                    targetAmsNetId: node.datasource.target.toString(),
                    localAmsNetId: node.datasource.source.toString(),
                    targetAdsPort: 851,
                    localAdsPort: 32750,
                    timeout: 2000,
                });
                client.on('read', () => {
                    console.log(`read`);
                });
                await client.connect();
                await client.removeAllListeners();
                let result = await client.readSymbol(`${node.variable}`);
                await client.disconnect(true);
                return result.value.toFixed(2);
            } else {
                return "Lock";
            }
        } catch (err) {
            await client.disconnect();
            console.log(err);
            return "Error";
        }
    },

    write: async (node, account, value) => {
        try {
            if (node.role.write && account.permission.write) {
                let client = new ads.Client({
                    routerAddress: node.datasource.host.toString(),
                    routerTcpPort: 48898,
                    targetAmsNetId: node.datasource.target.toString(),
                    localAmsNetId: node.datasource.source.toString(),
                    targetAdsPort: parseInt(node.datasource.port),
                    localAdsPort: 32750,
                    timeout: 500,
                });
                await client.connect();
                let result = await client.writeSymbol(node.variable.toString(), value);
                await client.disconnect();
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(`try catch ADS write ${err}`);
            return false;
        }
    },

    history: async (node)=>{
        try {
            let client = new ads.Client({
                routerAddress: node.datasource.host.toString(),
                routerTcpPort: 48898,
                targetAmsNetId: node.datasource.target.toString(),
                localAmsNetId: node.datasource.source.toString(),
                targetAdsPort: 851,
                localAdsPort: 32750,
                timeout: 500,
            });
            await client.connect();
            let result = await client.readSymbol(`${node.variable}`);
            await client.disconnect();
            return result.value.toFixed(2);
        } catch (err) {
            console.log(err);
            return "Error";
        }
    }
}