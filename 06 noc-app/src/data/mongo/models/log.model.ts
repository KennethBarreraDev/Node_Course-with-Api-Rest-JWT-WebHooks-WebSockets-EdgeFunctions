//    level: Logseverity.LOW | Logseverity.MEDIUM  | Logseverity.HIGH;
//     message: string;
//     createdAt?: Date;
//     origin: string;

import mongoose from 'mongoose'
import { Logseverity } from '../../../domain/entities/log.entity';

const LogSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date()
    },
    origin: {
        type: String,
        required: true
    },
    level:{
        type: String,
        required: true,
        enum: [Logseverity.LOW, Logseverity.HIGH, Logseverity.MEDIUM ]
      }
});

export const LogModel = mongoose.model('Log', LogSchema)