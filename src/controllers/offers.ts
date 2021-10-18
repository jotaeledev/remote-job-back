import { Application, Request, Response } from "express";
import offersModel from "../models/offers/offer.model";


export const loadControllerOffers = (app: Application): void => {
  app.get("/offers", async (req: Request, res: Response) => {
    try {
      const offers = await offersModel.find();
      return res.status(200).send(offers);
      
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
    
  });

  app.get("/offers/:id", async (req: Request, res: Response) => {
    try {
      const offer = await offersModel.findById(req.params.id);
      return res.status(200).send(offer);
      
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  });

  app.get("/searchOffers/:search", async (req: Request, res: Response) => {
    try {
      const offer = await offersModel.find({$or: [{ title: { $regex: req.params.search,  $options: "i" } }, { description: { $regex: req.params.search, $options: "i" } }]});
      return res.status(200).send(offer);
      
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  });

  app.post("/saveOffer", async(req: Request, res: Response) =>{
    try{
      const doc = new offersModel({
        title: req.body.title, 
        company: req.body.company,
        description: req.body.description,
        country: req.body.country,
        salary: req.body.salary,
        email: req.body.email,
        createdAt: req.body.createdAt,
      })

      const offer = await doc.save();
      return res.status(200).send(offer);
      
    }catch(error){
      return res.status(500).json(error);
    }
    
  })

  
};
