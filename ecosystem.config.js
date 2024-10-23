module.exports = {
  apps: [
    {
      name: 'my-api',
      script: './dist/src/main.js', // Update to point to the compiled JS
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
