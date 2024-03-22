import { uploadFiles } from "../middlewares/_cloudinary.js";
import { Listing } from "../models/_listing.js";
import { getValidationErrors } from "../middlewares/_validator.js";
import { Request, Response } from "express";
import { Booking } from "../models/_booking.js";
import q2m from "query-to-mongo";

export async function addList(req: Request, res: Response) {
  const errors = getValidationErrors(req);
  if (errors) {
    return res.status(400).send(errors);
  }
  try {
    const list = req.body;
    list.facilities = [list.facilities].flat(Infinity);
    list.images = await uploadFiles(req.files as Express.Multer.File[]);
    list.userId = req.userId;
    list.rating = 1;
    list.lastUpdated = new Date();
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
    oldlist.facilities = [oldlist.facilities].flat(Infinity);
    oldlist.images = [oldlist.previousImages ?? []].flat(Infinity);
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
    list.images = [...newImages, ...list.images];
    await list.save();
    return res.status(201).send(list);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getOneUserList(req: Request, res: Response) {
  try {
    const listing = await Listing.findOne({
      userId: req.userId,
      _id: req.params.id,
    });
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
    return res.status(200).send(listing);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function deleteList(req: Request, res: Response) {
  const listing = await Listing.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  if (!listing) return res.sendStatus(404);
  return res.status(204);
}

export async function getOneList(req: Request, res: Response) {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
    });
    if (!listing) return res.sendStatus(404);
    return res.status(200).send(listing);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

//using q2m library
//e.g. ?limit=1&offset=0&facilities:all=Guarded Area,Fire Protection
//gets converted to

//options: {skip:0, limit:1} AND criteria: {$all : ["Guar..", "Fir.."] }

export async function getAllList(req: Request, res: Response) {
  try {
    const query = q2m(req.query);
    query.options.skip ??= 0;
    query.options.limit ??= 3;
    query.options.sort ??= { createdAt: -1 };

    const bookings = await Booking.find({
      userId: req.userId,
    });

    query.criteria = {
      ...query.criteria,
      _id: { $not: { $in: bookings.map((b) => b.listingId) } },
    };

    const count = await Listing.countDocuments(query.criteria);
    const listings = await Listing.find(query.criteria)
      //@ts-expect-error sort types not provided by library
      .sort(query.options.sort)
      .skip(query.options.skip)
      .limit(query.options.limit);
    //@ts-expect-error link types not provided by library
    if (count) res.links(query.links("", count)); //auto gen pagination links
    return res.status(200).send(listings);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
