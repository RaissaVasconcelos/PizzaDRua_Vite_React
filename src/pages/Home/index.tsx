import { Catalog } from "./components/Catalog";
import { Hero } from "./components/Hero";
import { Navigate } from "./components/Navigate";

export default function Home() {
  return (
    <div className="mt-20">
      <Hero />
      <Navigate />
      <Catalog />
    </div>
  )
}

