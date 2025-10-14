"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical, Eye, EyeOff, Loader2, Upload } from "lucide-react";
import { useState } from "react";

const Account = () => {
    const user = useCurrentUser()
    console.log(user);
    const [selectedOption, setSelectedOption] = useState("profile")
    const [seePassword,SetseePassword] = useState<boolean>(false)

    return (
        <section className="flex h-full flex-col">
            <Card>
                <CardContent className="shadow-lg">
                    <div className="flex sm:flex-row flex-col gap-4">
                    <div className="space-y-2 sm:border-r  p-2 sm:w-fit w-full mt-4">
                        <Button
                        variant={selectedOption === "profile" ? "secondary" : "ghost"}
                        onClick={() => setSelectedOption("profile")}
                        className="w-full justify-start"
                        >
                        Perfil
                        </Button>
                        <Button
                        variant={selectedOption === "password" ? "secondary" : "ghost"}
                        onClick={() => setSelectedOption("password")}
                        className="w-full justify-start"
                        >
                        Senha
                        </Button>
                        <Button
                        variant={selectedOption === "photo" ? "secondary" : "ghost"}
                        onClick={() => setSelectedOption("photo")}
                        className="w-full justify-start"
                        >
                        Foto
                        </Button>
                        <Button
                        variant={selectedOption === "delete" ? "secondary" : "ghost"}
                        onClick={() => setSelectedOption("delete")}
                        className="w-full justify-start"
                        >
                        Apagar Conta
                        </Button>
                    </div>
                    <div className="space-y-4 sm:mt-4 border-t sm:border-none pt-4 sm:w-[600px] w-fit">
                        {selectedOption === "profile" && (
                            <div id="profile" className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Perfil</h3>
                                <p className="text-muted-foreground">Mude algumas informações do seu perfil</p>
                            </div>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <Label htmlFor="name">Nome</Label>
                                <Input 
                                    id="name" 
                                    value={user?.name || ""}
                                    />
                                </div>
                                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    value={user?.email || ""}
                                />
                                </div>
                                <Button className="w-full">
                                    Salvar
                                </Button>
                                </div>
                            </div>
                            )}
                            {selectedOption === "password" && (
                            <div id="password" className="space-y-6 relative">
                                <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Senha</h3>
                                <p className="text-muted-foreground">Troque a senha da sua conta</p>
                                </div>
                                <div className="grid gap-4">
                                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                    <Label htmlFor="current-password">Senha Atual</Label>
                                    <Input 
                                    id="currentpassword" 
                                    type={seePassword ? 'text' : 'password'} 
                                    placeholder="Coloque sua senha atual" 
                                    />
                                    <Button className="absolute z-10 bottom-1 right-1 h-7 w-7" size="icon" variant="ghost" type="button" onClick={()=>SetseePassword(!seePassword)}>
                                        {seePassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                    <Label htmlFor="new-password">Nova Senha</Label>
                                    <Input 
                                    id="newpassword" 
                                    type={seePassword ? 'text' : 'password'} 
                                    placeholder="Confirme sua nova senha" 
                                    />
                                </div>
                                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                    <Label htmlFor="confirm-password">Confirme a nova senha</Label>
                                    <Input 
                                    id="confirmpassword" 
                                    type={seePassword ? 'text' : 'password'} 
                                    placeholder="Confirme sua nova senha" 
                                    />
                                </div>
                                <Button className="w-full">
                                    Altear senhar
                                </Button>
                                </div>
                            </div>
                            )}
                            {selectedOption === "photo" && (
                            <div id="photo" className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Foto de perfil</h3>
                                <p className="text-muted-foreground">Troque sua foto de perfil</p>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <Avatar className="w-32 h-32">
                                <AvatarImage 
                                src={user?.image || ""} 
                                alt={user?.name || ""} 
                                />
                                <AvatarFallback>{user?.name?.charAt(0) || ""}</AvatarFallback>
                                </Avatar>
                                <form>
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="photo-upload"
                                    />
                                    <Label htmlFor="photo-upload" className="cursor-pointer flex gap-4 items-center justify-center border px-4 py-2 rounded-md">
                                        {/* <Button variant="outline" className="gap-2"> */}
                                        <Upload className="h-4 w-4" />
                                        Escolher foto
                                        {/* </Button> */}
                                    </Label>
                                    <Button type="submit">
                                      Salvar Foto
                                    </Button>
                                    </div>
                                </form>
                            </div>
                            </div>
                        )}
                        {selectedOption === "delete" && (
                            <div id="delete" className="space-y-6">
                                <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-red-500">Deletar Conta</h3>
                                <p className="text-muted-foreground text-xs">Sua conta será permanentemente deletada e você perderá todos seus dados</p>
                                <p className="text-muted-foreground font-bold">Digite "{user?.name}" para confirmar a exclusão da conta</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                <div className="flex flex-col items-start gap-4">
                                    <Input 
                                    id="deleteconfirmation" 
                                    placeholder={`Digite "${user?.name}" para confirmar`}
                                    />
                                </div>
                                <Button variant="destructive" className="w-full">
                                    Deletar Conta
                                </Button>
                                </div>
                            </div>
                            )}
                        </div>
                        
                    </div>
                </CardContent>
                </Card>
        </section>
    );
}

export default Account;