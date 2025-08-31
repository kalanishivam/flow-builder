import "server-only"
import { Resend   } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email : string[] , textToSend : string) =>{
    try{
        const { data, error } = await resend.emails.send({
      from: 'TEST <onboarding@resend.dev>',
      to: email,
      subject: 'Hello world',
      text: textToSend,
    });
    if(error){
        return {success : false}
    }
    return {success : true}
    }catch(error){
        return {success : false}
    }
}