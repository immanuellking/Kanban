import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  //   const { id } = evt.data
  //   const eventType = evt.type
  //   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  //   console.log('Webhook payload:', body)
  if (evt.type === "user.created") {
    const { id, email_addresses } = evt.data;
    const email = email_addresses[0].email_address
    try {
      await dbConnect();

      const userExist = await User.findOne({ email });

      if (!userExist) {
        const user = await User.create({ email, clerkId: id });
        return NextResponse.json(
          { success: true, message: "User created successfully and added to db.", user },
          { status: 201 }
        );
      }

      return NextResponse.json(
        { success: true, message: "User already exist in db." },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in create-user API:", error);

      if (error instanceof Error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { success: false, error: "An unknown error occurred." },
        { status: 500 }
      );
    }
  }

  return new Response("Webhook received", { status: 200 });
}
