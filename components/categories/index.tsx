"use client"
import { 
    BriefcaseIcon, 
    BusIcon, 
    Circle, 
    DumbbellIcon, 
    FlaskConicalIcon, 
    Gamepad2Icon, 
    GlobeIcon, 
    HeartIcon, 
    Music2Icon, 
    Paintbrush2Icon, 
    SchoolIcon 
  } from "lucide-react";
  import Link from "next/link";
  import { useEffect, useState } from "react";
  
  export type Category = {
    id: string | number;
    name: string;
    icon?: string;
    href: string;
  };
  
  const Categories = () => {
    const [data,setData] = useState<Category[]>([])
    
    const fetchCategories = async () => {
      try{
          const url = "http://localhost:3001/categories";
          const res = await fetch(url)
          const data = await res.json();
          setData(data)
          
      }catch(error){
        console.log(error);
      }
    }
  
    useEffect(()=>{
      fetchCategories()
    },[])

    const iconMap: Record<string, any> = {
      música: Music2Icon,
      gaming: Gamepad2Icon,
      educação: SchoolIcon,
      arte: Paintbrush2Icon,
      negócios: BriefcaseIcon,
      saúde: HeartIcon,
      tecnologia: FlaskConicalIcon,
      comunidade: GlobeIcon,
      fitness: DumbbellIcon,
      transporte: BusIcon,
    };

    return (
      <section className="container flex items-center justify-between gap-4 rounded-sm mt-4 overflow-x-auto [&::-webkit-scrollbar]:hidden p-4">
        {data.map((category) => {
          const Icon = iconMap[category.name.toLowerCase()] || Circle;
          return (
            <Link
              key={category.id}
              className="flex items-center justify-center flex-col gap-2"
              href={category.href}
            >
              <div className="size-16 border rounded-full flex items-center justify-center hover:shadow-lg hover:transition-all hover:-mt-1 hover:mb-1">
                <Icon size={20} />
              </div>
              <p className="text-xs">{category.name}</p>
            </Link>
          );
        })}
      </section>
    );
  };
  
  export default Categories;
  