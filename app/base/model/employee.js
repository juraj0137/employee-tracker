/**
 * Created by jkubala on 11/19/16.
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const baseSchema = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    }
};

const model = mongoose.model("Employees", new Schema(baseSchema));

export {
    model as default,
    baseSchema
}