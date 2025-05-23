// src/pages/WeekdaySchedule.jsx
import React from "react";
import { Container } from "@mui/material";
import ScheduleTable from "../components/ScheduleTable";

const WeekdaySchedule = () => {
	return (
		<Container>
			<ScheduleTable scheduleType="weekday" title="ຕາຕະລາງປະຈຳວັນ (ວັນຈັນ-ວັນສຸກ)" />
		</Container>
	);
};

export default WeekdaySchedule;