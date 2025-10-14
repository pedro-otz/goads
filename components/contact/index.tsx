'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { AlertCircle, Building2, Clock, Mail, Phone } from "lucide-react";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ref } from "firebase/storage";
import { Button } from "../ui/button";


interface ContacthtmlFormeProps {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

const Contact = () => {
    return (
          <section
            id="contact"
            className="container py-24 sm:py-32"
          >
            <section className="bg-muted p-8 rounded-xl border grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-4">
                  <h2 className="text-lg text-primary mb-2 tracking-wider"><span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text"> Contato 
                  </span></h2>
        
                  <h2 className="text-3xl md:text-4xl font-bold">Tire suas dúvidas</h2>
                </div>
                <p className="mb-8 text-muted-htmlForeground lg:w-5/6">
                  Converse com nosso suporte e tire todas as suas dúvidas!
                </p>
        
                <div className="flex flex-col gap-4">
                  {/* <div>
                    <div className="flex gap-2 mb-1">
                      <Building2 />
                      <div className="font-bold">Find Us</div>
                    </div>
        
                    <div>742 Evergreen Terrace, Springfield, IL 62704</div>
                  </div> */}
        
                  <div>
                    <div className="flex gap-2 mb-1">
                      <Phone />
                      <div className="font-bold">Whatsapp</div>
                    </div>
        
                    <div>(14) 99812-1211</div>
                  </div>
        
                  <div>
                    <div className="flex gap-2 mb-1">
                      <Mail />
                      <div className="font-bold">Mail Us</div>
                    </div>
        
                    <div>suportelicit@gmail.com</div>
                  </div>
        
                  {/* <div>
                    <div className="flex gap-2">
                      <Clock />
                      <div className="font-bold">Visit Us</div>
                    </div>
        
                    <div>
                      <div>Monday - Friday</div>
                      <div>8AM - 4PM</div>
                    </div>
                  </div> */}
                </div>
              </div>
        
              <Card className="bg-muted/60 dark:bg-card">
                <CardHeader className="text-primary text-2xl"> </CardHeader>
                <CardContent>
                  <div
                    className="grid gap-4"
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col w-full gap-1.5">
                        <Label htmlFor="first-name">Nome</Label>
                        <Input
                          id="first-name"
                          type="text"
                          placeholder="Leopoldo"
                          v-model="contacthtmlForm.firstName"
                        />
                      </div>
        
                      <div className="flex flex-col w-full gap-1.5">
                        <Label htmlFor="last-name">Sobrenome</Label>
                        <Input
                          id="last-name"
                          type="text"
                          placeholder="Miranda"
                          v-model="contacthtmlForm.lastName"
                        />
                      </div>
                    </div>
        
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="leomirandadev@gmail.com"
                        v-model="contacthtmlForm.email"
                      />
                    </div>
        
                    {/* <div className="flex flex-col gap-1.5">
                      <Label htmlFor="subject">Assunto</Label>
        
                      <Select v-model="contacthtmlForm.subject">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Web Development">
                              Web Development
                            </SelectItem>
                            <SelectItem value="Mobile Development">
                              Mobile Development
                            </SelectItem>
                            <SelectItem value="Figma Design"> Figma Design </SelectItem>
                            <SelectItem value="REST API "> REST API </SelectItem>
                            <SelectItem value="FullStack Project">
                              FullStack Project
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div> */}
        
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        placeholder="Digite aqui sua mensagem..."
                      />
                    </div>
        
                    {/* <Alert
                      variant="destructive"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        There is an error in the htmlForm. Please check your input.
                      </AlertDescription>
                    </Alert> */}
        
                    <Button className="mt-4">Enviar</Button>
                  </div>
                </CardContent>
        
                <CardFooter></CardFooter>
              </Card>
            </section>
          </section>
    
         );
}
 
export default Contact;
