import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(req : NextRequest , {params} : {params : Promise<{flowId : string}>}){
    try{
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({error : "You are not logged in"} , {status : 401})
        }
    const {flowId} = await params;
    const flowDetails = await db.workflow.findUnique({
        where :{
            id : flowId,
            user : {
                clerkUserId : userId
            }
        },
        include : {
            nodes : {
                select : {
                    nodeId : true,
                    measuredHeight : true,
                    measuredWidth : true,
                    positionX : true,
                    positionY : true,
                    type : true,
                    data : true
                }
                },
            edges : {
                select : {
                    edgeId : true,
                    sourceNode : {
                        select : {
                            nodeId : true,
                        }
                    },
                    targetNode : {
                        select : {
                            nodeId : true,
                        }
                    }
                }
            }
            }
    })
    return NextResponse.json(flowDetails , {status : 200});
    }catch(error){
        console.log(error);
        return NextResponse.json({error : "Internal Server Error"} , {status : 500})
    }

}