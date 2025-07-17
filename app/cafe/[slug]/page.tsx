'uce client';
interface Props {
    params: {
      slug: string;
    };
  }
  
import Order from "@/app/ui/cafe/order";
export default function Page({params}:Props) {
    const slug = typeof params.slug === "string" ? params.slug : JSON.stringify(params.slug);
   
    return (
        <>
            <div className="font-bold text-center text-2xl">Table # : {slug}
            
            </div>
            <Order numberTable={slug} />
            
        </>
    )
}