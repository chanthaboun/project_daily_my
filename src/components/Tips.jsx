// src/components/Tips.jsx (Updated with Add/Edit/Delete functionality)
import React from "react";
import {
	Typography,
	Paper,
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	useMediaQuery,
	useTheme,
	Card,
	CardContent,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Grid,
	IconButton,
	TextField,
	Button,
	Tooltip,
	InputBase,
	Fab,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Dialog,
} from "@mui/material";
import {
	LightbulbOutlined as LightbulbIcon,
	ExpandMore as ExpandMoreIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	Add as AddIcon,
	Save as SaveIcon,
	AddCircle as AddCircleIcon,
	RemoveCircle as RemoveCircleIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useSchedule } from "../contexts/ScheduleContext";

const Tips = () => {
	const {
		schedules,
		editMode,
		addNewTip,
		deleteTip,
		updateTipTitle,
		addTipItem,
		deleteTipItem,
		updateTipItem,
	} = useSchedule();

	const { tips } = schedules;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

	// ສະຖານະສຳລັບຈັດການການແກ້ໄຂຫົວຂໍ້
	const [editingTitle, setEditingTitle] = useState(null);
	const [editingItems, setEditingItems] = useState({});
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [currentEditData, setCurrentEditData] = useState({
		tipId: null,
		itemIndex: null,
		text: "",
	});

	// ຟັງຊັນຈັດການການແກ້ໄຂຫົວຂໍ້
	const handleTitleEditStart = (tipId, title) => {
		setEditingTitle({ id: tipId, value: title });
	};

	const handleTitleEditEnd = (tipId) => {
		if (editingTitle && editingTitle.id === tipId) {
			updateTipTitle(tipId, editingTitle.value);
			setEditingTitle(null);
		}
	};

	const handleTitleChange = (e) => {
		setEditingTitle((prev) => ({ ...prev, value: e.target.value }));
	};

	// ຟັງຊັນຈັດການການແກ້ໄຂລາຍການ
	const handleItemEditStart = (tipId, itemIndex, text) => {
		setCurrentEditData({ tipId, itemIndex, text });
		setEditDialogOpen(true);
	};

	const handleItemEditEnd = () => {
		const { tipId, itemIndex, text } = currentEditData;
		if (text && text.trim() !== "") {
			updateTipItem(tipId, itemIndex, text);
		}
		setEditDialogOpen(false);
	};

	const handleItemChange = (e) => {
		setCurrentEditData((prev) => ({ ...prev, text: e.target.value }));
	};

	// ຟັງຊັນເພີ່ມຄຳແນະນຳໃໝ່
	const handleAddNewTip = () => {
		addNewTip();
	};

	// ຟັງຊັນລົບຄຳແນະນຳ
	const handleDeleteTip = (tipId) => {
		deleteTip(tipId);
	};

	// ຟັງຊັນເພີ່ມລາຍການໃນຄຳແນະນຳ
	const handleAddItem = (tipId) => {
		addTipItem(tipId);
	};

	// ຟັງຊັນລົບລາຍການໃນຄຳແນະນຳ
	const handleDeleteItem = (tipId, itemIndex) => {
		deleteTipItem(tipId, itemIndex);
	};

	// ສຳລັບໂທລະສັບມືຖື - ສະແດງເປັນແບບ Accordion
	if (isMobile) {
		return (
			<>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 2,
					}}
				>
					<Typography variant="h4" sx={{ mt: 3 }}>
						ຄຳແນະນຳເພີ່ມເຕີມສຳລັບຄວາມສຳເລັດ
					</Typography>

					{editMode && (
						<Fab
							color="primary"
							size="small"
							onClick={handleAddNewTip}
							sx={{ mt: 3 }}
						>
							<AddIcon />
						</Fab>
					)}
				</Box>

				<Box sx={{ mb: 8 }}>
					{" "}
					{/* ເພີ່ມພື້ນທີ່ດ້ານລຸ່ມສຳລັບ bottom navigation */}
					{tips.map((tip) => (
						<Accordion key={tip.id} sx={{ mb: 1 }}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								sx={{
									bgcolor: "rgba(52, 152, 219, 0.1)",
									"&.Mui-expanded": {
										bgcolor: "rgba(52, 152, 219, 0.2)",
									},
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										width: "100%",
										pr: 2,
									}}
								>
									{editingTitle && editingTitle.id === tip.id ? (
										<TextField
											value={editingTitle.value}
											onChange={handleTitleChange}
											onBlur={() => handleTitleEditEnd(tip.id)}
											autoFocus
											fullWidth
											size="small"
											variant="standard"
											sx={{ ml: 1 }}
										/>
									) : (
										<Box
											sx={{ display: "flex", alignItems: "center", flex: 1 }}
										>
											<LightbulbIcon
												color="primary"
												fontSize="small"
												sx={{ mr: 1 }}
											/>
											<Typography variant="subtitle1">{tip.title}</Typography>
										</Box>
									)}

									{editMode && (
										<Box sx={{ display: "flex", ml: 2 }}>
											<IconButton
												size="small"
												onClick={(e) => {
													e.stopPropagation();
													handleTitleEditStart(tip.id, tip.title);
												}}
											>
												<EditIcon fontSize="small" />
											</IconButton>
											<IconButton
												size="small"
												color="error"
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteTip(tip.id);
												}}
											>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</Box>
									)}
								</Box>
							</AccordionSummary>
							<AccordionDetails>
								<List dense disablePadding>
									{tip.items.map((item, index) => (
										<ListItem
											key={`${tip.id}-item-${index}`}
											sx={{ py: 0.5 }}
											secondaryAction={
												editMode && (
													<Box>
														<IconButton
															edge="end"
															size="small"
															onClick={() =>
																handleItemEditStart(tip.id, index, item)
															}
														>
															<EditIcon fontSize="small" />
														</IconButton>
														<IconButton
															edge="end"
															size="small"
															color="error"
															onClick={() => handleDeleteItem(tip.id, index)}
														>
															<DeleteIcon fontSize="small" />
														</IconButton>
													</Box>
												)
											}
										>
											<ListItemText
												primary={item}
												primaryTypographyProps={{
													fontSize: "0.95rem",
													lineHeight: 1.4,
													paddingRight: editMode ? 10 : 0,
												}}
											/>
										</ListItem>
									))}

									{editMode && (
										<ListItem>
											<Button
												startIcon={<AddIcon />}
												onClick={() => handleAddItem(tip.id)}
												variant="outlined"
												size="small"
												sx={{ mt: 1 }}
												fullWidth
											>
												ເພີ່ມລາຍການໃໝ່
											</Button>
										</ListItem>
									)}
								</List>
							</AccordionDetails>
						</Accordion>
					))}
				</Box>

				{/* ກ່ອງສົນທະນາສຳລັບແກ້ໄຂລາຍການ */}
				<Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
					<DialogTitle>ແກ້ໄຂລາຍການ</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							fullWidth
							multiline
							rows={2}
							value={currentEditData.text}
							onChange={handleItemChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setEditDialogOpen(false)}>ຍົກເລີກ</Button>
						<Button onClick={handleItemEditEnd} variant="contained">
							ບັນທຶກ
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}

	// ສຳລັບແທັບເລັດ - ສະແດງເປັນແບບ Grid ຂອງ Cards
	if (isTablet) {
		return (
			<>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 2,
					}}
				>
					<Typography variant="h3" sx={{ mt: 3 }}>
						ຄຳແນະນຳເພີ່ມເຕີມສຳລັບຄວາມສຳເລັດ
					</Typography>

					{editMode && (
						<Button
							variant="contained"
							startIcon={<AddIcon />}
							onClick={handleAddNewTip}
							sx={{ mt: 3 }}
						>
							ເພີ່ມຄຳແນະນຳໃໝ່
						</Button>
					)}
				</Box>

				<Grid container spacing={2}>
					{tips.map((tip) => (
						<Grid item xs={12} sm={6} key={tip.id}>
							<Card
								elevation={2}
								sx={{
									height: "100%",
									borderTop: "4px solid #3498db",
									borderRadius: "4px",
									bgcolor: "rgba(240, 247, 255, 0.8)",
								}}
							>
								<CardContent>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "flex-start",
											mb: 2,
										}}
									>
										{editingTitle && editingTitle.id === tip.id ? (
											<TextField
												value={editingTitle.value}
												onChange={handleTitleChange}
												onBlur={() => handleTitleEditEnd(tip.id)}
												autoFocus
												fullWidth
												size="small"
												variant="standard"
											/>
										) : (
											<Typography
												variant="h5"
												sx={{
													display: "flex",
													alignItems: "center",
													gap: 1,
												}}
											>
												<LightbulbIcon color="primary" /> {tip.title}
											</Typography>
										)}

										{editMode && (
											<Box>
												<IconButton
													size="small"
													onClick={() =>
														handleTitleEditStart(tip.id, tip.title)
													}
												>
													<EditIcon fontSize="small" />
												</IconButton>
												<IconButton
													size="small"
													color="error"
													onClick={() => handleDeleteTip(tip.id)}
												>
													<DeleteIcon fontSize="small" />
												</IconButton>
											</Box>
										)}
									</Box>

									<List sx={{ pl: 1 }}>
										{tip.items.map((item, index) => (
											<ListItem
												key={`${tip.id}-item-${index}`}
												sx={{ py: 0.5 }}
												secondaryAction={
													editMode && (
														<Box>
															<IconButton
																edge="end"
																size="small"
																onClick={() =>
																	handleItemEditStart(tip.id, index, item)
																}
															>
																<EditIcon fontSize="small" />
															</IconButton>
															<IconButton
																edge="end"
																size="small"
																color="error"
																onClick={() => handleDeleteItem(tip.id, index)}
															>
																<DeleteIcon fontSize="small" />
															</IconButton>
														</Box>
													)
												}
											>
												<ListItemText
													primary={item}
													primaryTypographyProps={{
														fontSize: "0.95rem",
														paddingRight: editMode ? 15 : 0,
													}}
												/>
											</ListItem>
										))}

										{editMode && (
											<ListItem>
												<Button
													startIcon={<AddIcon />}
													onClick={() => handleAddItem(tip.id)}
													variant="outlined"
													size="small"
													sx={{ mt: 1 }}
													fullWidth
												>
													ເພີ່ມລາຍການໃໝ່
												</Button>
											</ListItem>
										)}
									</List>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>

				{/* ກ່ອງສົນທະນາສຳລັບແກ້ໄຂລາຍການ */}
				<Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
					<DialogTitle>ແກ້ໄຂລາຍການ</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							fullWidth
							multiline
							rows={3}
							value={currentEditData.text}
							onChange={handleItemChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setEditDialogOpen(false)}>ຍົກເລີກ</Button>
						<Button onClick={handleItemEditEnd} variant="contained">
							ບັນທຶກ
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}

	// ສຳລັບໜ້າຈໍໃຫຍ່ - ສະແດງເປັນແບບເດີມ
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 2,
				}}
			>
				<Typography variant="h2" sx={{ mt: 3 }}>
					ຄຳແນະນຳເພີ່ມເຕີມສຳລັບຄວາມສຳເລັດ
				</Typography>

				{editMode && (
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={handleAddNewTip}
						sx={{ mt: 3 }}
					>
						ເພີ່ມຄຳແນະນຳໃໝ່
					</Button>
				)}
			</Box>

			{tips.map((tip) => (
				<Paper
					key={tip.id}
					elevation={2}
					sx={{
						p: 3,
						my: 2,
						borderLeft: "5px solid #3498db",
						borderRadius: "4px",
						bgcolor: "rgba(240, 247, 255, 0.8)",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							mb: 2,
						}}
					>
						{editingTitle && editingTitle.id === tip.id ? (
							<TextField
								value={editingTitle.value}
								onChange={handleTitleChange}
								onBlur={() => handleTitleEditEnd(tip.id)}
								autoFocus
								fullWidth
								variant="standard"
								sx={{ fontSize: "1.2rem", maxWidth: "80%" }}
							/>
						) : (
							<Typography
								variant="h3"
								sx={{
									mb: 2,
									display: "flex",
									alignItems: "center",
									gap: 1,
								}}
							>
								<LightbulbIcon color="primary" /> {tip.title}
							</Typography>
						)}

						{editMode && (
							<Box>
								<Tooltip title="ແກ້ໄຂຫົວຂໍ້">
									<IconButton
										onClick={() => handleTitleEditStart(tip.id, tip.title)}
										color="primary"
									>
										<EditIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title="ລົບຄຳແນະນຳນີ້">
									<IconButton
										color="error"
										onClick={() => handleDeleteTip(tip.id)}
									>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</Box>
						)}
					</Box>

					<List sx={{ pl: 2 }}>
						{tip.items.map((item, index) => (
							<ListItem
								key={`${tip.id}-item-${index}`}
								sx={{ py: 0.5 }}
								secondaryAction={
									editMode && (
										<Box>
											<Tooltip title="ແກ້ໄຂລາຍການນີ້">
												<IconButton
													edge="end"
													onClick={() =>
														handleItemEditStart(tip.id, index, item)
													}
												>
													<EditIcon />
												</IconButton>
											</Tooltip>
											<Tooltip title="ລົບລາຍການນີ້">
												<IconButton
													edge="end"
													color="error"
													onClick={() => handleDeleteItem(tip.id, index)}
												>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</Box>
									)
								}
							>
								<ListItemText
									primary={item}
									primaryTypographyProps={{
										paddingRight: editMode ? 15 : 0,
									}}
								/>
							</ListItem>
						))}

						{editMode && (
							<ListItem>
								<Button
									startIcon={<AddCircleIcon />}
									onClick={() => handleAddItem(tip.id)}
									variant="outlined"
									sx={{ mt: 1 }}
								>
									ເພີ່ມລາຍການໃໝ່
								</Button>
							</ListItem>
						)}
					</List>
				</Paper>
			))}

			{/* ກ່ອງສົນທະນາສຳລັບແກ້ໄຂລາຍການ */}
			<Dialog
				open={editDialogOpen}
				onClose={() => setEditDialogOpen(false)}
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle>ແກ້ໄຂລາຍການ</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						fullWidth
						multiline
						rows={4}
						value={currentEditData.text}
						onChange={handleItemChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setEditDialogOpen(false)}>ຍົກເລີກ</Button>
					<Button onClick={handleItemEditEnd} variant="contained">
						ບັນທຶກ
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Tips;