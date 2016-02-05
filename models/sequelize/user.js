var Sequelize = require('sequelize');

exports.UserDefine = function(sequelize) {
    var User = sequelize.define(
      	'User', { 
          _id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
          },
          firstName: {
            type: Sequelize.STRING,
            allowNulls: false,
            validate: {
                len: [3,255] 
            }            
          },
          username:  {
            type: Sequelize.STRING,
            allowNulls: false,
            validate: {
                len: [3,255] 
            }
          },
          password: {
            type: Sequelize.STRING,
            allowNulls: false,
            validate: {
                len: [6,255] 
            }
          },
          email: {
            type: Sequelize.STRING,
            allowNulls: false,
            validate: {
                len: [3,255],
                isEmail: true
            }
          },
          accountIdOauth2: {
            type: Sequelize.STRING
          },
          typeOauth2: {
            type: Sequelize.STRING
          },
        },
        {
         indexes: [
            // Create a unique index on '_id', 'username', 'email', 'accountIdOauth2'
            {
              name:'user__id_index',
              unique: true,
              fields: ['_id']
            },
            {
              name:'user_username_index',
              unique: true,
              fields: ['username']
            },
            {
              name:'user_email_index',
              unique: true,
              fields: ['email']
            },
            {
              name:'user_accountIdOauth2_index',
              unique: true,
              fields: ['accountIdOauth2']
            }
        ]
        });
    exports.User = User;
    return User;
};



