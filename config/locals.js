module.exports = {
   hookTimeout: 60000,
   host: process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
  port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
  environment: process.env.NODE_ENV || 'development'
};