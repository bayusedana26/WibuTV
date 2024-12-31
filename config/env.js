const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'NODE_ENV'];

const validateEnv = () => {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

module.exports = validateEnv; 