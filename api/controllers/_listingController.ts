import { uploadFiles } from "../middlewares/_cloudinary.js";
import { Listing } from "../models/_listing.js";
import { getValidationErrors } from "../middlewares/_validator.js";
import { Request, Response } from "express";

export async function addList(req: Request, res: Response) {
  const errors = getValidationErrors(req);
  if (errors) {
    return res.status(400).send(errors);
  }
  try {
    const list = req.body;
    list.images = await uploadFiles(req.files as Express.Multer.File[]);
    list.userId = req.userId;
    list.rating = 1;
    const listing = new Listing(list);
    await listing.save();
    return res.status(201).send(listing);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function updateList(req: Request, res: Response) {
  const errors = getValidationErrors(req);
  if (errors) {
    return res.status(400).send(errors);
  }
  try {
    const oldlist = req.body;
    const list = await Listing.findOneAndUpdate(
      {
        _id: req.params.id.toString(),
        userId: req.userId,
      },
      oldlist,
      { new: true }
    );
    if (!list) return res.sendStatus(404);
    const newImages = await uploadFiles(req.files as Express.Multer.File[]);
    list.images = [...newImages, ...(list.images || [])];
    await list.save();
    return res.status(201).send(list);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getOneUserList(req: Request, res: Response) {
  try {
    const id = req.params.id.toString();
    const listing = await Listing.findOne({ userId: req.userId, _id: id });
    if (!listing) return res.sendStatus(404);
    return res.status(200).send(listing);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getAllUserList(req: Request, res: Response) {
  try {
    const listing = await Listing.find({ userId: req.userId });
    if (!listing) return res.sendStatus(404);
    return res.status(200).send(listing);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function deleteList(req: Request, res: Response) {
  try {
    await Listing.findOneAndDelete({
      _id: req.params.id.toString(),
      userId: req.userId,
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
