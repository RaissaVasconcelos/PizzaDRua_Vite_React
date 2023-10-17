import { Catalog } from "./components/Catalog";
import { Hero } from "./components/Hero";
import { Navigate } from "./components/Navigate";

export default function Home() {
    return (
        <>
           <Hero />
           <Navigate />
           <Catalog /> 
        </>
    )
}

