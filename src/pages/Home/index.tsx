import { Catalog } from "./components/Catalog";
import { Hero } from "./components/Hero";
import { Navigate } from "./components/Navigate";

export default function Home() {
    return (
        <div className="h-screen max-w-[1100px] m-auto  flex flex-col items-center justify-start">
           <Hero />
           <Navigate />
           <Catalog /> 
        </div>
    )
}

