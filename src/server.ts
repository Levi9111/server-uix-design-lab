import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

const main = async () => {
  try {
    const databaseConnection = await mongoose.connect(config.database_url!);

    if (databaseConnection.connection.readyState === 1) {
      console.log('🟢 Database connected successfully');
    } else {
      console.log('🟡 MongoDB connected but not ready');
    }

    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`),
    );
  } catch (error) {
    console.error('🔴 Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

main();
