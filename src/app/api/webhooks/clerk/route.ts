import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import db from "@/db";
 //https://flow-builder-lime.vercel.app/api/webhooks/clerk
 //https://helped-slowly-heron.ngrok-free.app/api/webhooks/clerk

export async function POST(req: Request) {
  try {
    console.log(`in the webhook route`)
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Missing webhook secret" },
        { status: 500 }
      );
    }
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return NextResponse.json(
        { error: "Error occured- missing or corrupt data" },
        { status: 400 }
      );
    }
    const wh = new Webhook(webhookSecret);

    let evt: WebhookEvent;
    const payload = await req.text();
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.log(`error in the webhoook line 34`);
      console.log(err);
      return NextResponse.json(
        { error: "Error occured- invalid signature" },
        { status: 400 }
      );
    }
    const eventType = evt.type;
    if (eventType === "user.created") {
      const { id, first_name, last_name } = evt.data;
      const { email_address } = evt.data.email_addresses[0];
      await db.user.create({
        data: {
          clerkUserId: id,
          name: `${first_name} ${last_name == null ? "" : last_name}`,
          email: email_address,
        },
      });
    } else if (eventType === "user.updated") {
      const { id, first_name, last_name } = evt.data;
      const { email_address } = evt.data.email_addresses[0];
      await db.user.update({
        where: {
          clerkUserId: id,
        },
        data: {
          name: `${first_name} ${last_name}`,
          email: email_address,
        },
      });
    }

    return NextResponse.json({message : "success"} , {status : 200});
  } catch (error) {
    console.log(`error inthe webhook`);
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
