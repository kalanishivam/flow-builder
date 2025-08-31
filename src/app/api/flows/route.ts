import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(){
    try{
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({error : "You are not logged in"} , {status : 401})
        }
        const allFlows = await db.workflow.findMany({
            where : {
                user : {
                    clerkUserId : userId
                }
            }
        });
        return NextResponse.json(allFlows , {status : 200})
    }catch(error){
        return NextResponse.json({error : "Internal Server Error"} , {status : 500})
    }
}