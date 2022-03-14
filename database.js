const Sequelize = require('sequelize');

// Create server instance
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const contributors = sequelize.define('contributors', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
    serverid: {
		type: Sequelize.STRING,
	},
	description: {
        type: Sequelize.TEXT,
        defaultValue: "",
    },
    devExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    communityExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    marketingExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    productExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    opsExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel1: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel2: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel3: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel4: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel5: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    daoInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    defiInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    nftInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    publicGoodsInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    artInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
});

const projects = sequelize.define('projects', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
    serverid: {
		type: Sequelize.STRING,
	},
    description: {
        type: Sequelize.TEXT,
        defaultValue: "",
    },
    devRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    communityRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    marketingRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    productRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    opsRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel1: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel2: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel3: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel4: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel5: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    daoType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    defiType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    nftType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    publicGoodsType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    artType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
});

module.exports ={
    contributors,projects
}
