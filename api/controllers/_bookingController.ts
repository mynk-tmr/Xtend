import { Request, Response } from "express";
import { Booking } from "../models/_booking.js";
import { Listing } from "../models/_listing.js";
import { getValidationErrors } from "../middlewares/_validator.js";

export async function getAllBookings(req: Request, res: Response) {
  const bookings = await Booking.find({
    userId: req.userId,
  });
  return res.status(200).send(bookings);
}

export async function getOneBooking(req: Request, res: Response) {
  const booking = await Booking.findOne({
    _id: req.params.id,
    userId: req.userId,
  });
  if (!booking) return res.sendStatus(404);
  return res.status(200).send(booking);
}

export async function requestBooking(req: Request, res: Response) {
  const errors = getValidationErrors(req);
  if (errors) {
    return res.status(400).send(errors);
  }
  const listing = await Listing.findOne({ _id: req.params.id });
  if (!listing) return res.sendStatus(404);

  //checks
  if (listing.userId === req.userId) return res.sendStatus(400);
  let booking = await Booking.findOne({
    _id: req.params.id,
    userId: req.userId,
  });
  if (booking) return res.sendStatus(400);
  const start = new Date(req.body.start);
  const end = new Date(req.body.end);
  if (start < new Date() || end < new Date()) return res.sendStatus(400);
  if (start > end) return res.sendStatus(400);

  //booking
  booking = new Booking({
    userId: req.userId,
    listingId: req.params.id,
    start: req.body.start,
    end: req.body.end,
    status: "pending",
    price: listing.price - listing.discount,
  });
  await booking.save();
  return res.status(201).send(booking);
}

export async function confirmBooking(req: Request, res: Response) {
  const booking = await Booking.findOneAndUpdate({
    _id: req.params.id,
    userId: req.userId,
    status: "accepted",
  });
  if (!booking) return res.sendStatus(404);
  return res.status(200).send(booking);
}

export async function cancelBooking(req: Request, res: Response) {
  const booking = await Booking.findOneAndUpdate({
    _id: req.params.id,
    userId: req.userId,
    status: "rejected",
  });
  if (!booking) return res.sendStatus(404);
  return res.status(200).send(booking);
}
