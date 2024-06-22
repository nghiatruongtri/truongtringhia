import mongoose, {Document, Model} from "mongoose";
import {IUser} from "./user.model"; // Assuming you have defined IUser interface in user.model.ts

// Interface representing a document in MongoDB
export interface ITask extends Document {
    description: string;
    completed: boolean;
    owner: IUser["_id"];
}

// Define the schema for the TaskModel model
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

// Define TaskModel model with ITask interface
const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export default Task;
