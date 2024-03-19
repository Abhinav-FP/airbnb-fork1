// next.config.js
module.exports = {
  async headers() {
      return [
          {
              source: '/api/:path*',
              headers: [
                  { key: 'Access-Control-Allow-Origin', value: '*' }, // Replace '*' with allowed domains
                  { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE' },
                  { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
              ],
          },
      ];
  },
};
