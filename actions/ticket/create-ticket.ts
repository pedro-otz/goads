"use server";

import { CreateTicketSchema } from "@/schemas";
import * as z from "zod";

export const createTicket = async (values: z.infer<typeof CreateTicketSchema>) => {
  const validatedFields = CreateTicketSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }
  
  try {
    
    const url = "http://localhost:3001/checkout/create"
    const res = await fetch(url, {
      method : "POST",
      headers : { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data)
    })
   
    const responseData = await res.json();

    if(responseData.statusCode == 400){
      return { error: responseData.message };
    }
    
    if(!responseData){
      console.error("Error to create ticket")
    }

    return { success: "Ticket criado com sucesso!",data:responseData };

  }catch(err){
    console.error("Error to create ticket ",err)
  }
  
}