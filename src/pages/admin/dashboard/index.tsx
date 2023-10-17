import { Card } from "./components/Card";

export default function Dashboard() {
  return (
    <div className="w-11/12 mx-3 flex mt-10 items-center justify-center gap-5">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}