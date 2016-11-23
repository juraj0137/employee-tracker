/**
 * Created by jkubala on 11/19/16.
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const baseSchema = {
    employeeId: {
        type: Schema.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    salary: {
        type: Number,
        required: true,
    },
};

const model = mongoose.model("Salary", new Schema(baseSchema));

export {
    model as default,
    baseSchema
}