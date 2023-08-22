import Image from "next/image";
import RedirectButton from "@/components/buttons";
import { Button } from "@mui/material";

async function fetchData() {
  const res = await fetch('http://localhost:3001/events/', { next: { revalidate: 500 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()
  return json?.data
}
export default async function Home() {
  const data = await fetchData()
  return (
      <main className="flex min-h-screen bg-[#FFF] flex-col items-center pb-16">
        <div className="fixed w-full flex justify-between px-32 py-4 bg-[#4d4d4d]">
          <div>
            <p className="font-bold text-white">INFO EVENT IT</p>
          </div>
          <div className="flex gap-x-3">
            <Button variant="text" className="font-bold text-white">LOGIN</Button>
            <Button variant="text" className="font-bold text-white">REGISTER</Button>
          </div>
        </div>
        <div className="bg-[#1e1e1e] py-48 w-full flex justify-center items-center"><p className="font-bold text-3xl text-white">INFO EVENT IT</p></div>
        <div className="px-24">
          <div className="flex justify-center py-12">
            <p className="font-bold text-3xl">INFO EVENT IT</p>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            {data.map((event: any) => (
            <div className="drop-shadow bg-[#f6f6f6] rounded-xl" key={event.id}>
              <div className="grid grid-cols-2 gap-x-3">
                <div className="col-span-1 relative w-full">
                  <Image
                    src={event.flyer}
                    alt="flyer"
                    fill
                    className="rounded-s-xl"
                  />
                </div>
                <div className="grid gap-y-2 py-3 px-2">
                  <div>
                  <p className="font-bold text-lg">{event.title}</p>
                  <p className="text-xs text-[#111111]">{event.publisher}</p>
                  </div>
                  <p className="text-sm text-[#1e1e1e]">{event.description}</p>
                  <RedirectButton dest={`events/${event.id}`}>Learn More</RedirectButton>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </main>
  );
}

