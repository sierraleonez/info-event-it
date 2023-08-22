"use client";
import NavBar from "@/components/molecules/navbar";
import { AuthContext } from "@/components/providers/route-guard";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { useQuery } from "react-query";
import { request } from "../utils/axiosInstance";
import EventCard from "@/components/molecules/cards/eventCard";
import EventSection from "@/components/organisms/EventSection";

function generateData(amount: number) {
  const date = new Date();
  const res = [];
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  for (let i = 0; i < amount; i++) {
    res.push({
      primary: i,
      secondary: random(1, 100),
    });
  }
  return res;
}

type Dataset = {
  primary: number;
  secondary: number;
};

export default function DashboardPage() {
  const Auth = useContext(AuthContext);
  const { data: events, isLoading: eventLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await request({ url: "/events", method: "GET" });
      console.log(res);
      return res?.data?.data;
    },
  });
	const memoizedRandomData = useMemo(() => generateData(20), [])
  const data = [
    {
      label: "Series1",
      data: memoizedRandomData,
    },
  ];
  const primaryAxis = useMemo(
    (): AxisOptions<Dataset> => ({
      getValue: (d) => d.primary,
    }),
    []
  );
  const secondaryAxes = useMemo(
    (): AxisOptions<Dataset>[] => [
      {
        getValue: (d) => d.secondary,
      },
    ],
    []
  );
  return (
    <Box className="relative">
      <NavBar />
      <Box className="py-16 px-16">
        <Box className="grid gap-y-4 py-4">
					<Typography>Hello, piece of shit</Typography>
          <Paper className="p-4">
            <Typography>Events Statistics</Typography>
            <Box className="w-full h-24">
              <Chart
                options={{
                  data,
                  primaryAxis,
                  secondaryAxes,
                }}
              />
            </Box>
          </Paper>
          <Paper className="p-4">
            <Typography>Your Events</Typography>
            <Box>{!eventLoading && <EventSection events={events} />}</Box>
          </Paper>
        </Box>
        {/* <Typography>this is dashboard</Typography>
            <Button onClick={() => Auth.logout()}>
                Logout
            </Button> */}
        <Button>Create Event</Button>
      </Box>
    </Box>
  );
}
