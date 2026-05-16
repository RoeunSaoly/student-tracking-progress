import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  sequelize,
  Sequelize,
  models: {}
};

/**
 * Dynamically load all models from the modules directory
 */
const initModels = async () => {
  const modulesPath = path.resolve(__dirname, '../modules');
  const modules = fs.readdirSync(modulesPath);

  for (const moduleName of modules) {
    const modelDirPath = path.join(modulesPath, moduleName, 'model');
    
    if (fs.existsSync(modelDirPath) && fs.lstatSync(modelDirPath).isDirectory()) {
      const modelFiles = fs.readdirSync(modelDirPath).filter(file => file.endsWith('.model.js'));
      
      for (const file of modelFiles) {
        const modelPath = path.join(modelDirPath, file);
        // Use pathToFileURL for Windows compatibility and ESM import requirements
        const { default: modelInit } = await import(pathToFileURL(modelPath).href);
        const model = modelInit(sequelize, Sequelize.DataTypes);
        db.models[model.name] = model;
      }
    }
  }

  // After all models are loaded, call associate if it exists
  Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
      db.models[modelName].associate(db.models);
    }
  });

  console.log('✅ Database models initialized successfully');
};

export { initModels };
export default db;
