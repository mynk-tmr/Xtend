import { Request, Response } from "express";
import { Booking } from "../models/_booking.js";
import { Listing } from "../models/_listing.js";

export async function getAllBookings(req: Request, res: Response) {
  const bookings = await Booking.find({
    userId: req.userId,
  });
  return res.status(200).send(bookings);
}

export async function getOneBooking(req: Request, res: Response) {
  const booking = await Booking.findOne({
    listingId: req.params.id,
    userId: req.userId,
  });
  if (!booking) return res.sendStatus(404);
  return res.status(200).send(booking);
}

export async function requestBooking(req: Request, res: Response) {
  const listing = await Listing.findOne({ _id: req.params.id });
  if (!listing) return res.sendStatus(404);

  //checks
  if (listing.userId === req.userId) return res.sendStatus(400);
  let booking = await Booking.findOne({
    listingId: req.params.id,
    userId: req.userId,
  });
  if (booking && booking.status !== "canceled")
    return res.status(400).send("Already booked");
  const start = new Date(req.body.start);
  const end = new Date(req.body.end);
  if (end < new Date() || start > end)
    return res.status(400).send("Invalid dates");

  //delete canceled booking
  if (booking) await Booking.deleteOne({ _id: booking._id });

  //booking
  booking = new Booking({
    userId: req.userId,
    listingId: req.params.id,
    start,
    end,
    status: "pending",
    price: listing.price - listing.discount,
  });
  await booking.save();
  return res.status(201).send(booking);
}

export async function confirmBooking(req: Request, res: Response) {
  const booking = await Booking.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  if (!booking) return res.sendStatus(404);
  return res.status(200).send(booking);
}

export async function cancelBooking(req: Request, res: Response) {
  const booking = await Booking.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      status: "canceled",
    },
    {
      new: true,
    }
  );
  if (!booking) return res.sendStatus(404);
  return res.status(200).send(booking);
}
