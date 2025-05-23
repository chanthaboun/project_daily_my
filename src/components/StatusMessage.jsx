// src/components/StatusMessage.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSchedule } from "../contexts/ScheduleContext";

const StatusMessage = () => {
	const { statusMessage } = useSchedule();
	const { message, type } = statusMessage;

	const isOpen = Boolean(message);

	const alertType =
		type === "success" ? "success" : type === "error" ? "error" : "warning";

	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={3000}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			<Alert severity={alertType} variant="filled" sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default StatusMessage;