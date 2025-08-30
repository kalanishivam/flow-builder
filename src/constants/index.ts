import { MailPlus, MessageCircle } from "lucide-react";

export const sideBarOptions = [
    {
        "title" : "New Message",
        "icon" : MessageCircle,
        "messageStyle" : "text-blue-300 ",
        "type" : "sendMessage",
    },
    {
        "title" : "Send Mail",
        "icon" : MailPlus,
        "messageStyle" : "text-green-300 ",
        "type" : "recipient",
    }
]