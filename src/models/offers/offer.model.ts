import { model, Schema } from "mongoose";
import { OfferInterface } from "./offer.interface";

const offersSchema = new Schema<OfferInterface>({
    id:String,
    title: String, 
    company: String,
    description: String,
    country: String,
    salary: String,
    email:String,
    createdAt: Date,
}, { timestamps: true })

export default model<OfferInterface>('offer', offersSchema);



