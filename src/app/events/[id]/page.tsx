import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
	Paper,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import { md } from "@/tmp/markdown";
import {
  AccessTime,
  ExpandMore,
  LocationOnOutlined,
} from "@mui/icons-material";
import remarkGfm from "remark-gfm";

async function fetchData(id: string) {
	const res = await fetch(`http://localhost:3001/events/${id}`).then(res => res.json())
	return res?.data
	
}

export default async function EventDetail({ params }: { params: { id: string } }) {
	const event = await fetchData(params.id)

  return (
    <div>
      <Hero></Hero>
      <div>
        <div className="grid grid-cols-10 px-32 gap-x-8">
          {/* Thumbnail */}
          <div className="relative col-span-2">
            <Image
              src={
                "https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
              }
              alt="thumbnail"
              width={100}
              height={100}
              className="w-full shadow rounded-sm shadow-black aspect-square absolute -top-[70px]"
            />
          </div>
          {/* Title */}
          <div className="flex flex-col gap-y-2 col-span-5 p-4">
            <div className="px-1 rounded-md border-black border w-fit">
              <p>{event.type}</p>
            </div>
            <p className="font-medium text-3xl">{event.title}</p>
            <p>Diselenggarakan oleh: {event.publisher}</p>
          </div>
          {/* Additional info */}
          <Paper className="py-4 flex flex-col col-span-3 w-full gap-y-3 px-2">
            <div className="grid gap-y-2">
              <p className="font-medium">
                <AccessTime /> Aug 8, 2023
              </p>
              <p className="font-medium">
                <LocationOnOutlined /> {event.location}
              </p>
            </div>
            {/* Event type */}
            <div className="grid gap-y-3">
              <div className="flex gap-x-2">
                <PilBox content="Free" color="green" />
                <PilBox content="Paid" color="red" />
              </div>
              {/* Event participant target */}
              <div className="flex gap-x-2 flex-wrap gap-y-2">
                <PilBox content="Umum" color="blue" />
                <PilBox content="Professional" color="blue" />
              </div>
              {/* Event material */}
              <div className="flex gap-x-2 flex-wrap gap-y-2">
                <PilBox content="Cloud" color="pink" />
                <PilBox content="Web3" color="purple" />
              </div>
            </div>

            <Button variant="outlined" className="w-full">
              Register
            </Button>
						<Button variant="outlined" className="w-full">
              Contact Person
            </Button>
          </Paper>
				<div className="flex flex-col col-span-7">
          <ReactAccordion
            summary={<p>Event Details</p>}
            detail={<ReactMarkdown remarkPlugins={[remarkGfm]} children={md} />}
          />
          <ReactAccordion
            summary={<p>Rundown</p>}
            detail={<ReactMarkdown remarkPlugins={[remarkGfm]} children={md} />}
          />
          <ReactAccordion
            summary={<p>FAQ</p>}
            detail={<ReactMarkdown remarkPlugins={[remarkGfm]} children={md} />}
          />
        </div>
        </div>
      </div>

			{/* Footer */}
			<div className="w-full bg-zinc-800 px-24 py-16">
				
			</div>
    </div>
  );
}

function Hero({ children }: { children?: React.ReactElement }) {
  return <div className="bg-hero-image p-28 bg-center">{children}</div>;
}

function PilBox({
  content,
  color = "green",
}: {
  content: string;
  color?: string;
}) {
  return (
    <div className={`px-2 border border-${color}-500 rounded-md`}>
      <p className={`text-sm text-${color}-500`}>{content}</p>
    </div>
  );
}

function ReactAccordion({
  summary,
  detail,
}: {
  summary: React.ReactElement;
  detail: React.ReactElement;
}) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>{summary}</AccordionSummary>
      <AccordionDetails>{detail}</AccordionDetails>
    </Accordion>
  );
}

export async function generateStaticParams() {
	const events = await fetch("http://localhost:3001/events").then(res => res.json())
	return events.data.map((event: any) => ({
		id: event.id
	}))
}
