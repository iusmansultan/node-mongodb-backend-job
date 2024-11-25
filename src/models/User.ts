import mongoose, { Schema, Document } from 'mongoose';

interface IAddress {
  city: string;
  state: string;
  country: string;
  street: string;
}

interface IItems extends Document {
  id: string;
  gender: string;
  name: string;
  address: IAddress;
  email: string;
  age: string;
  picture: string;
  createdAt: Date;
}

const AddressSchema: Schema = new Schema({
  city: String,
  state: String,
  country: String,
  street: String,
});

const UserSchema: Schema = new Schema(
  {
    id: { type: String, unique: true },
    gender: String,
    name: String,
    address: AddressSchema,
    email: String,
    age: String,
    picture: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const User = mongoose.model<IItems>('User', UserSchema);
