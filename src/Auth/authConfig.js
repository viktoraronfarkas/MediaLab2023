const config = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.DIRECTORY_TENANT_ID,

    scopes: ['openid', 'profile', 'User.Read'],
  },
};

export default config;
