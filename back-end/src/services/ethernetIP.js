const { Controller, Tag, EthernetIP } = require('ethernet-ip');

module.exports = {
    read: async (node, account) => {
        try {
            const PLC = new Controller();
            PLC.on('error', () => {
                return "error";
            });
            PLC.on('close', () => {
                return "close";
            });
            PLC.on('lookup', () => {
                return "lookup";
            });
            if (node.role.read && account.permission.read) {
                await PLC.connect(node.datasource.host.toString());
                let tag = new Tag(node.variable.toString());
                await PLC.readTag(tag);
                PLC.destroy();
                return tag.value;
            }
            else {
                return "Lock";
            }
        } catch (err) {
            console.log(`readEtherNetIP:\n ${err}`);
            return "Error";
        }
    },

    readControl: async (node, account) => {
        try {
            const PLC = new Controller();
            PLC.on('error', () => {
                return "error";
            });
            PLC.on('close', () => {
                return "close";
            });
            PLC.on('lookup', () => {
                return "lookup";
            });
            if (node.role.write && account.permission.write) {
                await PLC.connect(node.datasource.host.toString());
                let tag = new Tag(node.variable.toString());
                await PLC.readTag(tag);
                PLC.destroy();
                return tag.value;
            }
            else {
                return "Lock";
            }
        } catch (err) {
            console.log(`readEtherNetIP:\n ${err}`);
            return "Error";
        }
    },

    write: async (node, account, value) => {
        try {
            if (node.role.write && account.permission.write) {
                const PLC = new Controller();
                PLC.on('error', () => {
                    return "Error";
                });
                PLC.on('close', () => {
                    return "close";
                });
                PLC.on('lookup', () => {
                    return "lookup";
                });
                await PLC.connect(node.datasource.host.toString());
                let tag = new Tag(node.variable.toString());
                await PLC.readTag(tag);
                tag.value = value;
                let result = await PLC.writeTag(tag);
                PLC.destroy();
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(`try catch EtherNetIP write ${err}`);
            return false;
        }
    }
}