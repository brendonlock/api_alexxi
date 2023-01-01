import { Schema, model, Document} from "mongoose";
import { UserDocument } from "./user.model";

export interface UserInput {
    user: UserDocument['_id'];
    valid: Boolean;
    userAgent: string;
}

export interface SessionDocument extends UserInput, Document {
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
  },
  {
    timestamps: true,
  }
);

const SessionModel = model<SessionDocument>("Session", sessionSchema);

export default SessionModel;