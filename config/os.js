const os = require('os');
const _ = require('lodash');

const type = os.type();
const { username: pc_name } =  os.userInfo();

const network_ethernet = os.networkInterfaces()['Ethernet 2'];
const { address: ip_ethernet } = _.last(network_ethernet);

module.exports = {
    type,
    pc_name,
    ip_ethernet
}
