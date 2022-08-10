module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: '@directus/gatsby-source-directus',
      options: {
        url: `https://g3yw4g18.directus.app`, // Fill with your Directus instance address
        auth: {
          //token: 'my_secret_token', // You can use a static token from an user

          // Or you can use the credentials of an user
          email: 'jackside555@gmail.com',
          password: 'PJuIPYU8gSX_-W[0lxrbaH]p',
        },
      },
    },
  ],
};
