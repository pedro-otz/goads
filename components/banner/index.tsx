import { Button } from "../ui/button";
type BannerProps = {
    title : string,
    description : string,
    cta : string,
}
const Banner = ({title,description,cta} : BannerProps) => {
    return ( 
        <section className="container flex sm:flex-row flex-col items-center justify-center sm:justify-between mt-4 rounded-2xl
        ">
            <div className="min-h-[100px] flex justify-around items-center w-full gap-4 sm:flex-row flex-col mt-4 border rounded-2xl p-4 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div>
                    <h1 className="text-lg font-bold">{title}</h1>
                    <p className="text-sm">{description}</p>
                </div>
                <Button>{cta}</Button>
            </div>
        </section>
     );
}
 
export default Banner;