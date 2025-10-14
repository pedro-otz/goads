"use server";

import { UpdateEventSchema } from "@/schemas";
import * as z from "zod";

export const UpdateEvent = async (values: z.infer<typeof UpdateEventSchema>) => {
  const validatedFields = UpdateEventSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" };
  }
  
  try {
    // console.log("dados =",validatedFields.data);
    
    const url = `http://localhost:3001/events/${validatedFields.data.id}`
    const res = await fetch(url, {
      method : "PUT",
      headers : { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data)
    })
   
    const responseData = await res.json();

    if(!responseData){
      console.error("Error to update post")
    }
    
  }catch(err){
    console.error("Error to update post ",err)
  }
  

  return { success: "Evento Atualizado com sucesso!" };
}