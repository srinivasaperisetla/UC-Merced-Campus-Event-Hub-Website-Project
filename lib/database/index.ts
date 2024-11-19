// Setup for our database

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize a cached connection
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectionToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is missing!");
    }

    // Connect to already existing cached conn or create a new conn
    cached.promise =
        cached.promise ||
        mongoose.connect(MONGODB_URI, {
            dbName: "evently",
            bufferCommands: false,
        });

    cached.conn = await cached.promise;

    return cached.conn;
};
