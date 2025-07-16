"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
const main = async () => {
    try {
        const databaseConnection = await mongoose_1.default.connect(config_1.default.database_url);
        if (databaseConnection.connection.readyState === 1) {
            console.log('🟢 Database connected successfully');
        }
        else {
            console.log('🟡 MongoDB connected but not ready');
        }
        app_1.default.listen(config_1.default.port, () => console.log(`Server running on port ${config_1.default.port}`));
    }
    catch (error) {
        console.error('🔴 Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};
main();
//# sourceMappingURL=server.js.map