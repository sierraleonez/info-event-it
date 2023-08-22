import RedirectButton from "@/components/buttons";
import Image from "next/image";

export default function EventCard({ event }: { event: any }) {
    return (
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
    )
}