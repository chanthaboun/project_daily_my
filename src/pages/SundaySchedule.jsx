// src/pages/SundaySchedule.jsx
import React from "react";
import { Container } from "@mui/material";
import ScheduleTable from "../components/ScheduleTable";

const SundaySchedule = () => {
	return (
		<Container>
			<ScheduleTable scheduleType="sunday" title="ຕາຕະລາງສຳລັບວັນອາທິດ" />
		</Container>
	);
};

export default SundaySchedule;