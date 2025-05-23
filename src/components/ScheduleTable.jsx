// src/components/ScheduleTable.jsx (Updated with Delete functionality)
import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	IconButton,
	Tooltip,
	useMediaQuery,
	useTheme,
	Box,
	Card,
	CardContent,
	Collapse,
	Grid,
	Button,
} from "@mui/material";
import {
	Star,
	StarBorder,
	KeyboardArrowDown as ExpandMoreIcon,
	KeyboardArrowUp as ExpandLessIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useSchedule } from "../contexts/ScheduleContext";

const ScheduleTable = ({ scheduleType, title }) => {
	const {
		schedules,
		editMode,
		updateScheduleItem,
		togglePriority,
		deleteScheduleItem,
	} = useSchedule();

	const scheduleData = schedules[scheduleType];
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

	// ຕົວຄວບຄຸມການຂະຫຍາຍເນື້ອຫາ (ສຳລັບມຸມມອງໂທລະສັບ)
	const [expandedItems, setExpandedItems] = useState({});

	// ຟັງຊັນສຳລັບຂະຫຍາຍ/ຫຍໍ້ລາຍການ
	const toggleExpand = (itemId) => {
		setExpandedItems((prev) => ({
			...prev,
			[itemId]: !prev[itemId],
		}));
	};

	// ຟັງຊັນແປງຂໍ້ຄວາມທີ່ມີຂໍ້ຄວາມແບບ bullet points
	const formatActivityText = (text, itemId) => {
		if (!text || !text.includes("\n")) return text;

		// ແຍກຂໍ້ຄວາມເປັນແຖວຕາມການຂຶ້ນບັນທັດໃໝ່
		const lines = text.split("\n");
		const mainText = lines[0];
		const bulletPoints = lines.slice(1);

		return (
			<>
				{mainText}
				{bulletPoints.length > 0 && (
					<ul
						style={{
							paddingLeft: "1.5rem",
							marginTop: "0.5rem",
							marginBottom: 0,
						}}
					>
						{bulletPoints.map((point) => {
							// ສ້າງຄີຈາກເນື້ອຫາຂອງຂໍ້ຄວາມດ້ວຍຕົວເອງ
							const pointText = point.replace("•", "").trim();
							// ໃຊ້ການລວມກັນລະຫວ່າງ ID ຂອງລາຍການແລະເນື້ອຫາຂອງຂໍ້ຄວາມເພື່ອສ້າງຄີທີ່ບໍ່ຊໍ້າກັນ
							const uniqueKey = `${itemId}-${pointText.substring(0, 10).replace(/\s+/g, "")}`;

							return <li key={uniqueKey}>{pointText}</li>;
						})}
					</ul>
				)}
			</>
		);
	};

	// ຟັງຊັນຈັດການການແກ້ໄຂ
	const handleContentChange = (itemId, field, event) => {
		const newValue = event.target.innerText;
		updateScheduleItem(scheduleType, itemId, field, newValue);
	};

	// ຟັງຊັນຈັດການການລົບລາຍການ
	const handleDeleteItem = (itemId) => {
		deleteScheduleItem(scheduleType, itemId);
	};

	if (!scheduleData || scheduleData.length === 0) {
		return <Typography>ບໍ່ມີຂໍ້ມູນໃນຕາຕະລາງ</Typography>;
	}

	// ສຳລັບໜ້າຈໍມືຖື ແລະ ແທັບເລັດ
	if (isMobile || isTablet) {
		return (
			<>
				<Typography variant="h4" sx={{ mt: 3, mb: 2, textAlign: "center" }}>
					{title}
				</Typography>

				{scheduleData.map((item) => (
					<Card
						key={item.id}
						sx={{
							mb: 2,
							bgcolor: item.priority ? "rgba(255, 224, 224, 0.8)" : "inherit",
							borderLeft: item.priority
								? "4px solid #e74c3c"
								: "1px solid #ddd",
						}}
					>
						<CardContent sx={{ pb: 1 }}>
							<Grid container alignItems="center" spacing={1}>
								<Grid item xs={isMobile ? 8 : 7}>
									<Typography variant="h6" sx={{ fontWeight: "bold" }}>
										{item.time}
									</Typography>
								</Grid>
								<Grid item xs={isMobile ? 4 : 5} sx={{ textAlign: "right" }}>
									{editMode && (
										<IconButton
											size="small"
											color="error"
											onClick={() => handleDeleteItem(item.id)}
											sx={{ mr: 1 }}
										>
											<DeleteIcon />
										</IconButton>
									)}

									<IconButton
										size="small"
										onClick={() => togglePriority(scheduleType, item.id)}
										disabled={!editMode}
										color={item.priority ? "error" : "default"}
										edge="end"
									>
										{item.priority ? <Star /> : <StarBorder />}
									</IconButton>

									{!isMobile && (
										<IconButton
											onClick={() => toggleExpand(item.id)}
											size="small"
											sx={{ ml: 1 }}
										>
											{expandedItems[item.id] ? (
												<ExpandLessIcon />
											) : (
												<ExpandMoreIcon />
											)}
										</IconButton>
									)}
								</Grid>
							</Grid>

							<Box
								sx={{
									mt: 1,
									...(editMode && {
										border: "1px dashed #ccc",
										p: 1,
										borderRadius: "4px",
									}),
								}}
								contentEditable={editMode}
								suppressContentEditableWarning={true}
								onBlur={(e) => handleContentChange(item.id, "activity", e)}
							>
								{editMode
									? item.activity
									: formatActivityText(item.activity, item.id)}
							</Box>

							{isMobile && (
								<Box sx={{ textAlign: "center", mt: 1 }}>
									<IconButton
										onClick={() => toggleExpand(item.id)}
										size="small"
									>
										{expandedItems[item.id] ? (
											<ExpandLessIcon />
										) : (
											<ExpandMoreIcon />
										)}
									</IconButton>
								</Box>
							)}

							<Collapse
								in={expandedItems[item.id]}
								timeout="auto"
								unmountOnExit
							>
								<Box sx={{ mt: 2, pt: 1, borderTop: "1px solid #eee" }}>
									<Typography
										variant="subtitle2"
										color="text.secondary"
										gutterBottom
									>
										ໝາຍເຫດ
									</Typography>
									<Box
										sx={{
											color: "text.secondary",
											...(editMode && {
												border: "1px dashed #ccc",
												p: 1,
												borderRadius: "4px",
											}),
										}}
										contentEditable={editMode}
										suppressContentEditableWarning={true}
										onBlur={(e) => handleContentChange(item.id, "notes", e)}
									>
										{item.notes}
									</Box>
								</Box>
							</Collapse>
						</CardContent>
					</Card>
				))}
			</>
		);
	}

	// ສຳລັບໜ້າຈໍໃຫຍ່
	return (
		<>
			<Typography variant="h2" sx={{ mt: 3, mb: 2 }}>
				{title}
			</Typography>
			<TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width="5%">**</TableCell>
							<TableCell width="20%">ເວລາ</TableCell>
							<TableCell width="40%">ກິດຈະກຳ</TableCell>
							<TableCell width="30%">ໝາຍເຫດ</TableCell>
							{editMode && (
								<TableCell width="5%" align="center">
									ລົບ
								</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{scheduleData.map((item) => (
							<TableRow
								key={item.id}
								sx={{
									bgcolor: item.priority
										? "rgba(255, 224, 224, 0.8)"
										: "inherit",
									"&:nth-of-type(even)": {
										bgcolor: item.priority
											? "rgba(255, 224, 224, 0.9)"
											: "rgba(0, 0, 0, 0.04)",
									},
									"&:hover": {
										bgcolor: item.priority
											? "rgba(255, 224, 224, 1)"
											: "rgba(232, 247, 254, 0.7)",
									},
								}}
							>
								<TableCell padding="checkbox">
									<IconButton
										size="small"
										onClick={() => togglePriority(scheduleType, item.id)}
										disabled={!editMode}
										color={item.priority ? "error" : "default"}
									>
										{item.priority ? <Star /> : <StarBorder />}
									</IconButton>
								</TableCell>
								<TableCell
									contentEditable={editMode}
									suppressContentEditableWarning={true}
									onBlur={(e) => handleContentChange(item.id, "time", e)}
									sx={{
										fontWeight: "bold",
										...(editMode && {
											position: "relative",
											outline: "none",
											"&:hover": { bgcolor: "rgba(232, 247, 254, 0.7)" },
											"&:focus": {
												bgcolor: "rgba(230, 242, 255, 0.9)",
												boxShadow: "inset 0 0 0 2px #3498db",
											},
										}),
									}}
								>
									{item.time}
								</TableCell>
								<TableCell
									contentEditable={editMode}
									suppressContentEditableWarning={true}
									onBlur={(e) => handleContentChange(item.id, "activity", e)}
									sx={{
										...(editMode && {
											outline: "none",
											"&:hover": { bgcolor: "rgba(232, 247, 254, 0.7)" },
											"&:focus": {
												bgcolor: "rgba(230, 242, 255, 0.9)",
												boxShadow: "inset 0 0 0 2px #3498db",
											},
										}),
									}}
								>
									{editMode
										? item.activity
										: formatActivityText(item.activity, item.id)}
								</TableCell>
								<TableCell
									contentEditable={editMode}
									suppressContentEditableWarning={true}
									onBlur={(e) => handleContentChange(item.id, "notes", e)}
									sx={{
										color: "text.secondary",
										...(editMode && {
											outline: "none",
											"&:hover": { bgcolor: "rgba(232, 247, 254, 0.7)" },
											"&:focus": {
												bgcolor: "rgba(230, 242, 255, 0.9)",
												boxShadow: "inset 0 0 0 2px #3498db",
											},
										}),
									}}
								>
									{item.notes}
								</TableCell>
								{editMode && (
									<TableCell align="center">
										<IconButton
											color="error"
											size="small"
											onClick={() => handleDeleteItem(item.id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ScheduleTable;