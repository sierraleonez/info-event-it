"use client";

import { Box, Input, MenuItem, Select, TextField, Typography } from "@mui/material";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from "react-hook-form";
import { Editor } from 'react-draft-wysiwyg'
import { DatePicker } from "@mui/x-date-pickers";
const EVENT_TYPE = [
	{
		label: 'Webinar',
		value: 'webinar',
	},
	{
		label: 'Pelatihan',
		value: 'pelatihan',
	},
	{
		label: 'Summit',
		value: 'summit',
	},
]
export default function CreateEventForm() {
  const { register, handleSubmit } = useForm();

 
  return (
    <form className="flex flex-col gap-y-4">
      <TextField label="Title" {...register("title", { required: true })} />
			<Select label="Event Type">
				{EVENT_TYPE.map(event => (
					<MenuItem key={event.value} value={event.value}>{event.label}</MenuItem>
				))}
			</Select>
      <Box className="w-96">
			<Typography>Event Description</Typography>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName border border-black py-0"
      />
      </Box>
			<Box>
				<Typography>Event Date</Typography>
				<DatePicker/>
			</Box>

			<Box>
				<Typography>Background Image</Typography>
				<Input type="file"/>
			</Box>

			<Box>
				<Typography>Thumbnail Image</Typography>
				<Input type="file"/>
			</Box>

			<TextField type="url" label="Registration URL" {...register("registration_url")}/>

			<Box>
				<Typography>Event Location</Typography>
				<TextField label="Event Online URL"/>
				<TextField label="Event Offline Location"/>
			</Box>
    </form>

  );
}
