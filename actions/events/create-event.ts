"use server";

import { CreateEventSchema } from "@/schemas";
import * as z from "zod";

export const createEvent = async (values: z.infer<typeof CreateEventSchema>) => {
  const validatedFields = CreateEventSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }
  
  try {
    
    const url = "http://localhost:3001/events/"
    const res = await fetch(url, {
      method : "POST",
      headers : { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data)
    })
   
    const responseData = await res.json();

    if(!responseData){
      console.error("Error to create post")
    }
    
  }catch(err){
    console.error("Error to create post ",err)
  }
  

  return { success: "Evento criado com sucesso!" };
}