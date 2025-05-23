// // src/components/AppBar.jsx
// import React from "react";
// import {
// 	AppBar as MUIAppBar,
// 	Toolbar,
// 	Typography,
// 	IconButton,
// 	Box,
// 	Tabs,
// 	Tab,
// 	Menu,
// 	MenuItem,
// 	useMediaQuery,
// 	useTheme,
// 	Drawer,
// 	List,
// 	ListItem,
// 	ListItemIcon,
// 	ListItemText,
// 	Divider,
// 	Button,
// 	BottomNavigation,
// 	BottomNavigationAction,
// } from "@mui/material";

// import {
// 	Menu as MenuIcon,
// 	Edit as EditIcon,
// 	Save as SaveIcon,
// 	Refresh as RefreshIcon,
// 	Add as AddIcon,
// 	Print as PrintIcon,
// 	SaveAlt as SaveAltIcon,
// 	Backup as BackupIcon,
// 	EventNote as WeekdayIcon,
// 	Weekend as WeekendIcon,
// 	CalendarViewWeek as SundayIcon,
// 	Lightbulb as TipsIcon,
// 	Close as CloseIcon,
// } from "@mui/icons-material";

// import { useState } from "react";
// import { useSchedule } from "../contexts/ScheduleContext";

// const AppBar = ({ currentTab, onTabChange }) => {
// 	const {
// 		editMode,
// 		toggleEditMode,
// 		saveChanges,
// 		resetChanges,
// 		saveToLocalStorage,
// 		loadFromLocalStorage,
// 		addNewItem,
// 		printSchedule,
// 		addNewTip,
// 	} = useSchedule();

// 	const theme = useTheme();
// 	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// 	const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

// 	// ສະຖານະສຳລັບເມນູໃນໂທລະສັບມືຖື
// 	const [drawerOpen, setDrawerOpen] = useState(false);
// 	const [menuAnchorEl, setMenuAnchorEl] = useState(null);

// 	const handleMenuOpen = (event) => {
// 		setMenuAnchorEl(event.currentTarget);
// 	};

// 	const handleMenuClose = () => {
// 		setMenuAnchorEl(null);
// 	};

// 	const toggleDrawer = (open) => {
// 		setDrawerOpen(open);
// 	};

// 	// ຟັງຊັນສຳລັບການປ່ຽນ tab
// 	const handleTabChange = (event, newValue) => {
// 		onTabChange(newValue);
// 		setDrawerOpen(false);
// 	};

// 	// ຟັງຊັນເພີ່ມລາຍການໃໝ່ຕາມ tab ປັດຈຸບັນ
// 	const handleAddItem = () => {
// 		if (currentTab !== "tips") {
// 			addNewItem(currentTab);
// 		}
// 		handleMenuClose();
// 	};

// 	// ສ້າງໄອຄອນແລະຂໍ້ຄວາມສຳລັບແຕ່ລະ tab
// 	const getTabInfo = (tabId) => {
// 		switch (tabId) {
// 			case "weekday":
// 				return { icon: <WeekdayIcon />, text: "ວັນຈັນ-ວັນສຸກ" };
// 			case "saturday":
// 				return { icon: <WeekendIcon />, text: "ວັນເສົາ" };
// 			case "sunday":
// 				return { icon: <SundayIcon />, text: "ວັນອາທິດ" };
// 			case "tips":
// 				return { icon: <TipsIcon />, text: "ຄຳແນະນຳເພີ່ມເຕີມ" };
// 			default:
// 				return { icon: <WeekdayIcon />, text: "ວັນຈັນ-ວັນສຸກ" };
// 		}
// 	};

// 	// ສ່ວນສຳລັບສະແດງໃນ Drawer ໂທລະສັບມືຖື
// 	const drawerContent = (
// 		<Box sx={{ width: 250 }} role="presentation">
// 			<Box
// 				sx={{
// 					display: "flex",
// 					justifyContent: "space-between",
// 					alignItems: "center",
// 					p: 2,
// 					bgcolor: "primary.main",
// 					color: "white",
// 				}}
// 			>
// 				<Typography variant="h6">ເມນູ</Typography>
// 				<IconButton color="inherit" onClick={() => toggleDrawer(false)}>
// 					<CloseIcon />
// 				</IconButton>
// 			</Box>

// 			<Divider />

// 			<List>
// 				{["weekday", "saturday", "sunday", "tips"].map((tabId) => {
// 					const { icon, text } = getTabInfo(tabId);
// 					return (
// 						<ListItem
// 							button
// 							key={tabId}
// 							onClick={(e) => handleTabChange(e, tabId)}
// 							selected={currentTab === tabId}
// 							sx={{
// 								bgcolor:
// 									currentTab === tabId ? "rgba(52, 152, 219, 0.1)" : "inherit",
// 								"&:hover": {
// 									bgcolor: "rgba(52, 152, 219, 0.2)",
// 								},
// 							}}
// 						>
// 							<ListItemIcon
// 								sx={{
// 									color: currentTab === tabId ? "primary.main" : "inherit",
// 								}}
// 							>
// 								{icon}
// 							</ListItemIcon>
// 							<ListItemText primary={text} />
// 						</ListItem>
// 					);
// 				})}
// 			</List>

// 			<Divider />

// 			<List>
// 				<ListItem button onClick={toggleEditMode}>
// 					<ListItemIcon>
// 						<EditIcon color={editMode ? "error" : "inherit"} />
// 					</ListItemIcon>
// 					<ListItemText primary={editMode ? "ປິດການແກ້ໄຂ" : "ເປີດການແກ້ໄຂ"} />
// 				</ListItem>

// 				<ListItem button onClick={saveChanges} disabled={!editMode}>
// 					<ListItemIcon>
// 						<SaveIcon />
// 					</ListItemIcon>
// 					<ListItemText primary="ບັນທຶກການປ່ຽນແປງ" />
// 				</ListItem>

// 				<ListItem button onClick={resetChanges} disabled={!editMode}>
// 					<ListItemIcon>
// 						<RefreshIcon />
// 					</ListItemIcon>
// 					<ListItemText primary="ຍົກເລີກການປ່ຽນແປງ" />
// 				</ListItem>

// 				<ListItem
// 					button
// 					onClick={handleAddItem}
// 					disabled={currentTab === "tips"}
// 				>
// 					<ListItemIcon>
// 						<AddIcon />
// 					</ListItemIcon>
// 					<ListItemText primary="ເພີ່ມແຖວໃໝ່" />
// 				</ListItem>

// 				<ListItem button onClick={saveToLocalStorage}>
// 					<ListItemIcon>
// 						<SaveAltIcon />
// 					</ListItemIcon>
// 					<ListItemText primary="ບັນທຶກໄວ້ໃນບຣາວເຊີນີ້" />
// 				</ListItem>

// 				<ListItem button onClick={loadFromLocalStorage}>
// 					<ListItemIcon>
// 						<BackupIcon />
// 					</ListItemIcon>
// 					<ListItemText primary="ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້" />
// 				</ListItem>

// 				<ListItem button onClick={printSchedule}>
// 					<ListItemIcon>
// 						<PrintIcon />
// 					</ListItemIcon>
// 					<ListItemText primary="ປຣິນຕາຕະລາງ" />
// 				</ListItem>
// 			</List>
// 		</Box>
// 	);

// 	return (
// 		<>
// 			<MUIAppBar position="sticky" color="primary" elevation={4}>
// 				<Toolbar>
// 					{/* ໄອຄອນເມນູສຳລັບໂທລະສັບມືຖື */}
// 					{isMobile && (
// 						<IconButton
// 							edge="start"
// 							color="inherit"
// 							aria-label="menu"
// 							onClick={() => toggleDrawer(true)}
// 							sx={{ mr: 2 }}
// 						>
// 							<MenuIcon />
// 						</IconButton>
// 					)}

// 					<Typography
// 						variant={isMobile ? "h6" : "h5"}
// 						component="div"
// 						sx={{
// 							flexGrow: 1,
// 							textAlign: isMobile ? "center" : "left",
// 							fontSize: isMobile ? "1.1rem" : "1.5rem",
// 						}}
// 					>
// 						ຕາຕະລາງປະຈຳວັນຂອງຂ້ອຍ
// 					</Typography>

// 					{/* ປຸ່ມສຳລັບໂທລະສັບມືຖື */}
// 					{isMobile && (
// 						<>
// 							<IconButton color="inherit" onClick={handleMenuOpen} edge="end">
// 								<EditIcon />
// 							</IconButton>

// 							<Menu
// 								anchorEl={menuAnchorEl}
// 								open={Boolean(menuAnchorEl)}
// 								onClose={handleMenuClose}
// 							>
// 								<MenuItem
// 									onClick={() => {
// 										toggleEditMode();
// 										handleMenuClose();
// 									}}
// 								>
// 									{editMode ? "ປິດການແກ້ໄຂ" : "ເປີດການແກ້ໄຂ"}
// 								</MenuItem>

// 								{editMode && (
// 									<MenuItem
// 										onClick={() => {
// 											saveChanges();
// 											handleMenuClose();
// 										}}
// 									>
// 										ບັນທຶກການປ່ຽນແປງ
// 									</MenuItem>
// 								)}

// 								{editMode && (
// 									<MenuItem
// 										onClick={() => {
// 											resetChanges();
// 											handleMenuClose();
// 										}}
// 									>
// 										ຍົກເລີກການປ່ຽນແປງ
// 									</MenuItem>
// 								)}

// 								{currentTab !== "tips" && (
// 									<MenuItem onClick={handleAddItem}>ເພີ່ມແຖວໃໝ່</MenuItem>
// 								)}

// 								<MenuItem
// 									onClick={() => {
// 										saveToLocalStorage();
// 										handleMenuClose();
// 									}}
// 								>
// 									ບັນທຶກໄວ້ໃນບຣາວເຊີນີ້
// 								</MenuItem>

// 								<MenuItem
// 									onClick={() => {
// 										loadFromLocalStorage();
// 										handleMenuClose();
// 									}}
// 								>
// 									ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້
// 								</MenuItem>

// 								<MenuItem
// 									onClick={() => {
// 										printSchedule();
// 										handleMenuClose();
// 									}}
// 								>
// 									ພິມຕາຕະລາງ
// 								</MenuItem>
// 							</Menu>
// 						</>
// 					)}

// 					{/* ປຸ່ມສຳລັບແທັບເລັດ */}
// 					{isTablet && (
// 						<Box sx={{ display: "flex", gap: 1 }}>
// 							<IconButton
// 								color="inherit"
// 								onClick={toggleEditMode}
// 								title={editMode ? "ປິດການແກ້ໄຂ" : "ເປີດການແກ້ໄຂ"}
// 							>
// 								<EditIcon />
// 							</IconButton>

// 							<IconButton
// 								color="inherit"
// 								onClick={handleMenuOpen}
// 								title="ເຄື່ອງມືເພີ່ມເຕີມ"
// 							>
// 								<MenuIcon />
// 							</IconButton>

// 							<Menu
// 								anchorEl={menuAnchorEl}
// 								open={Boolean(menuAnchorEl)}
// 								onClose={handleMenuClose}
// 							>
// 								<MenuItem
// 									onClick={() => {
// 										saveChanges();
// 										handleMenuClose();
// 									}}
// 									disabled={!editMode}
// 								>
// 									ບັນທຶກການປ່ຽນແປງ
// 								</MenuItem>

// 								<MenuItem
// 									onClick={() => {
// 										resetChanges();
// 										handleMenuClose();
// 									}}
// 									disabled={!editMode}
// 								>
// 									ຍົກເລີກການປ່ຽນແປງ
// 								</MenuItem>

// 								<MenuItem
// 									onClick={handleAddItem}
// 									disabled={currentTab === "tips"}
// 								>
// 									ເພີ່ມແຖວໃໝ່
// 								</MenuItem>

// 								<MenuItem
// 									onClick={() => {
// 										saveToLocalStorage();
// 										handleMenuClose();
// 									}}
// 								>
// 									ບັນທຶກໄວ້ໃນບຣາວເຊີນີ້
// 								</MenuItem>

// 								<MenuItem
// 									onClick={() => {
// 										loadFromLocalStorage();
// 										handleMenuClose();
// 									}}
// 								>
// 									ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້
// 								</MenuItem>

// 								<MenuItem
// 									onClick={() => {
// 										printSchedule();
// 										handleMenuClose();
// 									}}
// 								>
// 									ພິມຕາຕະລາງ
// 								</MenuItem>
// 							</Menu>
// 						</Box>
// 					)}

// 					{/* ປຸ່ມສຳລັບໜ້າຈໍໃຫຍ່ */}
// 					{!isMobile && !isTablet && (
// 						<Box sx={{ display: "flex", gap: 1 }}>
// 							<IconButton
// 								color="inherit"
// 								onClick={toggleEditMode}
// 								title={editMode ? "ປິດການແກ້ໄຂ" : "ເປີດການແກ້ໄຂ"}
// 							>
// 								<EditIcon />
// 							</IconButton>

// 							<IconButton
// 								color="inherit"
// 								onClick={saveChanges}
// 								disabled={!editMode}
// 								title="ບັນທຶກການປ່ຽນແປງ"
// 							>
// 								<SaveIcon />
// 							</IconButton>

// 							<IconButton
// 								color="inherit"
// 								onClick={resetChanges}
// 								disabled={!editMode}
// 								title="ຍົກເລີກການປ່ຽນແປງ"
// 							>
// 								<RefreshIcon />
// 							</IconButton>

// 							<IconButton
// 								color="inherit"
// 								onClick={handleAddItem}
// 								disabled={currentTab === "tips"}
// 								title="ເພີ່ມລາຍການໃໝ່"
// 							>
// 								<AddIcon />
// 							</IconButton>

// 							{currentTab === "tips" && editMode && (
// 								<IconButton
// 									color="inherit"
// 									onClick={addNewTip}
// 									title="ເພີ່ມຄຳແນະນຳໃໝ່"
// 								>
// 									<AddIcon />
// 								</IconButton>
// 							)}

// 							<IconButton
// 								color="inherit"
// 								onClick={saveToLocalStorage}
// 								title="ບັນທຶກໄວ້ໃນບຣາວເຊີນີ້"
// 							>
// 								<SaveAltIcon />
// 							</IconButton>

// 							<IconButton
// 								color="inherit"
// 								onClick={loadFromLocalStorage}
// 								title="ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້"
// 							>
// 								<BackupIcon />
// 							</IconButton>

// 							<IconButton
// 								color="inherit"
// 								onClick={printSchedule}
// 								title="ພິມຕາຕະລາງ"
// 							>
// 								<PrintIcon />
// 							</IconButton>
// 						</Box>
// 					)}
// 				</Toolbar>

// 				{/* Tabs ສຳລັບໜ້າຈໍແທັບເລັດແລະຄອມພິວເຕີ */}
// 				{!isMobile && (
// 					<Tabs
// 						value={currentTab}
// 						onChange={handleTabChange}
// 						textColor="inherit"
// 						indicatorColor="secondary"
// 						variant="fullWidth"
// 						sx={{
// 							backgroundColor: "primary.dark",
// 							"& .MuiTab-root": {
// 								py: 1,
// 								fontWeight: "medium",
// 							},
// 						}}
// 					>
// 						<Tab
// 							value="weekday"
// 							label="ວັນຈັນ-ວັນສຸກ"
// 							icon={getTabInfo("weekday").icon}
// 							iconPosition="start"
// 						/>
// 						<Tab
// 							value="saturday"
// 							label="ວັນເສົາ"
// 							icon={getTabInfo("saturday").icon}
// 							iconPosition="start"
// 						/>
// 						<Tab
// 							value="sunday"
// 							label="ວັນອາທິດ"
// 							icon={getTabInfo("sunday").icon}
// 							iconPosition="start"
// 						/>
// 						<Tab
// 							value="tips"
// 							label="ຄຳແນະນຳເພີ່ມເຕີມ"
// 							icon={getTabInfo("tips").icon}
// 							iconPosition="start"
// 						/>
// 					</Tabs>
// 				)}
// 			</MUIAppBar>

// 			{/* Drawer ສຳລັບໜ້າຈໍໂທລະສັບ */}
// 			<Drawer
// 				anchor="left"
// 				open={drawerOpen}
// 				onClose={() => toggleDrawer(false)}
// 			>
// 				{drawerContent}
// 			</Drawer>

// 			{/* Bottom Navigation ສຳລັບໂທລະສັບມືຖື */}
// 			{isMobile && (
// 				<Box
// 					sx={{
// 						position: "fixed",
// 						bottom: 0,
// 						left: 0,
// 						right: 0,
// 						zIndex: 1100,
// 						boxShadow: "0px -2px 4px rgba(0,0,0,0.1)",
// 						bgcolor: "background.paper",
// 						display: { sm: "none" },
// 					}}
// 				>
// 					<BottomNavigation
// 						value={currentTab}
// 						onChange={(event, newValue) => handleTabChange(event, newValue)}
// 						showLabels
// 					>
// 						<BottomNavigationAction
// 							value="weekday"
// 							label="ຈັນ-ສຸກ"
// 							icon={<WeekdayIcon />}
// 						/>
// 						<BottomNavigationAction
// 							value="saturday"
// 							label="ເສົາ"
// 							icon={<WeekendIcon />}
// 						/>
// 						<BottomNavigationAction
// 							value="sunday"
// 							label="ອາທິດ"
// 							icon={<SundayIcon />}
// 						/>
// 						<BottomNavigationAction
// 							value="tips"
// 							label="ແນະນຳ"
// 							icon={<TipsIcon />}
// 						/>
// 					</BottomNavigation>
// 				</Box>
// 			)}
// 		</>
// 	);
// };

// export default AppBar;

// src/components/AppBar.jsx (Updated with User Profile)
import React from "react";
import {
	AppBar as MUIAppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
	Tabs,
	Tab,
	Menu,
	MenuItem,
	useMediaQuery,
	useTheme,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Button,
	BottomNavigation,
	BottomNavigationAction,
	Avatar,
	Tooltip,
} from "@mui/material";

import {
	Menu as MenuIcon,
	Edit as EditIcon,
	Save as SaveIcon,
	Refresh as RefreshIcon,
	Add as AddIcon,
	Print as PrintIcon,
	SaveAlt as SaveAltIcon,
	Backup as BackupIcon,
	EventNote as WeekdayIcon,
	Weekend as WeekendIcon,
	CalendarViewWeek as SundayIcon,
	Lightbulb as TipsIcon,
	Close as CloseIcon,
	AccountCircle as AccountIcon,
	Person as PersonIcon,
} from "@mui/icons-material";

import { useState } from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import { useAuth } from "../contexts/AuthContext";
import UserProfile from "./UserProfile";

const AppBar = ({ currentTab, onTabChange }) => {
	const {
		editMode,
		toggleEditMode,
		saveChanges,
		resetChanges,
		saveToLocalStorage,
		loadFromLocalStorage,
		addNewItem,
		printSchedule,
		addNewTip,
	} = useSchedule();

	const { user } = useAuth();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

	// ສະຖານະສຳລັບເມນູໃນໂທລະສັບມືຖື
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
	const [profileOpen, setProfileOpen] = useState(false);

	const handleMenuOpen = (event) => {
		setMenuAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};

	const handleUserMenuOpen = (event) => {
		setUserMenuAnchorEl(event.currentTarget);
	};

	const handleUserMenuClose = () => {
		setUserMenuAnchorEl(null);
	};

	const toggleDrawer = (open) => {
		setDrawerOpen(open);
	};

	const handleProfileOpen = () => {
		setProfileOpen(true);
		handleUserMenuClose();
	};

	// ຟັງຊັນສຳລັບການປ່ຽນ tab
	const handleTabChange = (event, newValue) => {
		onTabChange(newValue);
		setDrawerOpen(false);
	};

	// ຟັງຊັນເພີ່ມລາຍການໃໝ່ຕາມ tab ປັດຈຸບັນ
	const handleAddItem = () => {
		if (currentTab !== "tips") {
			addNewItem(currentTab);
		}
		handleMenuClose();
	};

	// ສ້າງໄອຄອນແລະຂໍ້ຄວາມສຳລັບແຕ່ລະ tab
	const getTabInfo = (tabId) => {
		switch (tabId) {
			case "weekday":
				return { icon: <WeekdayIcon />, text: "ວັນຈັນ-ວັນສຸກ" };
			case "saturday":
				return { icon: <WeekendIcon />, text: "ວັນເສົາ" };
			case "sunday":
				return { icon: <SundayIcon />, text: "ວັນອາທິດ" };
			case "tips":
				return { icon: <TipsIcon />, text: "ຄຳແນະນຳເພີ່ມເຕີມ" };
			default:
				return { icon: <WeekdayIcon />, text: "ວັນຈັນ-ວັນສຸກ" };
		}
	};

	// ສ່ວນສຳລັບສະແດງໃນ Drawer ໂທລະສັບມືຖື
	const drawerContent = (
		<Box sx={{ width: 250 }} role="presentation">
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					p: 2,
					bgcolor: "primary.main",
					color: "white",
				}}
			>
				<Typography variant="h6">ເມນູ</Typography>
				<IconButton color="inherit" onClick={() => toggleDrawer(false)}>
					<CloseIcon />
				</IconButton>
			</Box>

			<Divider />

			{/* ຂໍ້ມູນຜູ້ໃຊ້ */}
			<Box sx={{ p: 2, bgcolor: "rgba(52, 152, 219, 0.1)" }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
						<PersonIcon fontSize="small" />
					</Avatar>
					<Box>
						<Typography variant="subtitle2" fontWeight="bold">
							{user?.fullName}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							@{user?.username}
						</Typography>
					</Box>
				</Box>
			</Box>

			<Divider />

			<List>
				{["weekday", "saturday", "sunday", "tips"].map((tabId) => {
					const { icon, text } = getTabInfo(tabId);
					return (
						<ListItem
							button
							key={tabId}
							onClick={(e) => handleTabChange(e, tabId)}
							selected={currentTab === tabId}
							sx={{
								bgcolor:
									currentTab === tabId ? "rgba(52, 152, 219, 0.1)" : "inherit",
								"&:hover": {
									bgcolor: "rgba(52, 152, 219, 0.2)",
								},
							}}
						>
							<ListItemIcon
								sx={{
									color: currentTab === tabId ? "primary.main" : "inherit",
								}}
							>
								{icon}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					);
				})}
			</List>

			<Divider />

			<List>
				<ListItem button onClick={toggleEditMode}>
					<ListItemIcon>
						<EditIcon color={editMode ? "error" : "inherit"} />
					</ListItemIcon>
					<ListItemText primary={editMode ? "ປິດການແກ້ໄຂ" : "ເປີດການແກ້ໄຂ"} />
				</ListItem>

				<ListItem button onClick={saveChanges} disabled={!editMode}>
					<ListItemIcon>
						<SaveIcon />
					</ListItemIcon>
					<ListItemText primary="ບັນທຶກການປ່ຽນແປງ" />
				</ListItem>

				<ListItem button onClick={resetChanges} disabled={!editMode}>
					<ListItemIcon>
						<RefreshIcon />
					</ListItemIcon>
					<ListItemText primary="ຍົກເລີກການປ່ຽນແປງ" />
				</ListItem>

				<ListItem
					button
					onClick={handleAddItem}
					disabled={currentTab === "tips"}
				>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary="ເພີ່ມແຖວໃໝ່" />
				</ListItem>

				<ListItem button onClick={saveToLocalStorage}>
					<ListItemIcon>
						<SaveAltIcon />
					</ListItemIcon>
					<ListItemText primary="ບັນທຶກໄວ້ໃນບຣາວເຊີນີ້" />
				</ListItem>

				<ListItem button onClick={loadFromLocalStorage}>
					<ListItemIcon>
						<BackupIcon />
					</ListItemIcon>
					<ListItemText primary="ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້" />
				</ListItem>

				<ListItem button onClick={printSchedule}>
					<ListItemIcon>
						<PrintIcon />
					</ListItemIcon>
					<ListItemText primary="ພິມຕາຕະລາງ" />
				</ListItem>

				<Divider sx={{ my: 1 }} />

				<ListItem button onClick={handleProfileOpen}>
					<ListItemIcon>
						<AccountIcon />
					</ListItemIcon>
					<ListItemText primary="ໂປຣໄຟລ໌ຜູ້ໃຊ້" />
				</ListItem>
			</List>
		</Box>
	);

	return (
		<>
			<MUIAppBar position="sticky" color="primary" elevation={4}>
				<Toolbar>
					{/* ໄອຄອນເມນູສຳລັບໂທລະສັບມືຖື */}
					{isMobile && (
						<IconButton
							edge="start"
							color="inherit"
							aria-label="menu"
							onClick={() => toggleDrawer(true)}
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
					)}

					<Typography
						variant={isMobile ? "h6" : "h5"}
						component="div"
						sx={{
							flexGrow: 1,
							textAlign: isMobile ? "center" : "left",
							fontSize: isMobile ? "1.1rem" : "1.5rem",
						}}
					>
						ຕາຕະລາງປະຈຳວັນຂອງຂ້ອຍ
					</Typography>

					{/* ສະແດງຊື່ຜູ້ໃຊ້ໃນໜ້າຈໍໃຫຍ່ */}
					{!isMobile && !isTablet && (
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
							<Typography variant="body2" color="inherit">
								ສະບາຍດີ, {user?.fullName}
							</Typography>
						</Box>
					)}

					{/* ປຸ່ມໂປຣໄຟລ໌ຜູ້ໃຊ້ */}
					{!isMobile && (
						<Tooltip title="ໂປຣໄຟລ໌ຜູ້ໃຊ້">
							<IconButton
								color="inherit"
								onClick={handleUserMenuOpen}
								sx={{ mr: 1 }}
							>
								<Avatar
									sx={{
										width: 32,
										height: 32,
										bgcolor: "rgba(255,255,255,0.2)",
									}}
								>
									<PersonIcon fontSize="small" />
								</Avatar>
							</IconButton>
						</Tooltip>
					)}

					{/* ເມນູຜູ້ໃຊ້ */}
					<Menu
						anchorEl={userMenuAnchorEl}
						open={Boolean(userMenuAnchorEl)}
						onClose={handleUserMenuClose}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					>
						<MenuItem onClick={handleProfileOpen}>
							<AccountIcon sx={{ mr: 1 }} />
							ໂປຣໄຟລ໌ຜູ້ໃຊ້
						</MenuItem>
					</Menu>

					{/* ປຸ່ມສຳລັບໂທລະສັບມືຖື */}
					{isMobile && (
						<>
							<IconButton color="inherit" onClick={handleMenuOpen} edge="end">
								<EditIcon />
							</IconButton>

							<Menu
								anchorEl={menuAnchorEl}
								open={Boolean(menuAnchorEl)}
								onClose={handleMenuClose}
							>
								<MenuItem
									onClick={() => {
										toggleEditMode();
										handleMenuClose();
									}}
								>
									{editMode ? "ປິດການແກ້ໄຂ" : "ເປີດການແກ້ໄຂ"}
								</MenuItem>

								{editMode && (
									<MenuItem
										onClick={() => {
											saveChanges();
											handleMenuClose();
										}}
									>
										ບັນທຶກການປ່ຽນແປງ
									</MenuItem>
								)}

								{editMode && (
									<MenuItem
										onClick={() => {
											resetChanges();
											handleMenuClose();
										}}
									>
										ຍົກເລີກການປ່ຽນແປງ
									</MenuItem>
								)}

								{currentTab !== "tips" && (
									<MenuItem onClick={handleAddItem}>ເພີ່ມແຖວໃໝ່</MenuItem>
								)}

								<MenuItem
									onClick={() => {
										saveToLocalStorage();
										handleMenuClose();
									}}
								>
									ບັນທຶກໄວ້ໃນບຣາວເຊີນີ້
								</MenuItem>

								<MenuItem
									onClick={() => {
										loadFromLocalStorage();
										handleMenuClose();
									}}
								>
									ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້
								</MenuItem>

								<MenuItem
									onClick={() => {
										printSchedule();
										handleMenuClose();
									}}
								>
									ພິມຕາຕະລາງ
								</MenuItem>
							</Menu>
						</>
					)}

					{/* ປຸ່ມສຳລັບແທັບເລັດ */}
					{isTablet && (
						<Box sx={{ display: "flex", gap: 1 }}>
							<IconButton
								color="inherit"
								onClick={toggleEditMode}
								title={editMode ? "ປິດການແກ້ໄຂ" : "ເປີດການແກ້ໄຂ"}
							>
								<EditIcon />
							</IconButton>

							<IconButton
								color="inherit"
								onClick={handleMenuOpen}
								title="ເຄື່ອງມືເພີ່ມເຕີມ"
							>
								<MenuIcon />
							</IconButton>

							<Menu
								anchorEl={menuAnchorEl}
								open={Boolean(menuAnchorEl)}
								onClose={handleMenuClose}
							>
								<MenuItem
									onClick={() => {
										saveChanges();
										handleMenuClose();
									}}
									disabled={!editMode}
								>
									ບັນທຶກການປ່ຽນແປງ
								</MenuItem>

								<MenuItem
									onClick={() => {
										resetChanges();
										handleMenuClose();
									}}
									disabled={!editMode}
								>
									ຍົກເລີກການປ່ຽນແປງ
								</MenuItem>

								<MenuItem
									onClick={handleAddItem}
									disabled={currentTab === "tips"}
								>
									ເພີ່ມແຖວໃໝ່
								</MenuItem>

								<MenuItem
									onClick={() => {
										saveToLocalStorage();
										handleMenuClose();
									}}
								>
									ບັນທຶກໄວ້ໃນບຣາວເຊີນີ້
								</MenuItem>

								<MenuItem
									onClick={() => {
										loadFromLocalStorage();
										handleMenuClose();
									}}
								>
									ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້
								</MenuItem>

								<MenuItem
									onClick={() => {
										printSchedule();
										handleMenuClose();
									}}
								>
									ພິມຕາຕະລາງ
								</MenuItem>
							</Menu>
						</Box>
					)}

					{/* ປຸ່ມສຳລັບໜ້າຈໍໃຫຍ່ */}
					{!isMobile && !isTablet && (
						<Box sx={{ display: "flex", gap: 1 }}>
							<IconButton
								color="inherit"
								onClick={toggleEditMode}
								title={editMode ? "ປິດການແກ້ໄຂ" : "ເປີດການແກ້ໄຂ"}
							>
								<EditIcon />
							</IconButton>

							<IconButton
								color="inherit"
								onClick={saveChanges}
								disabled={!editMode}
								title="ບັນທຶກການປ່ຽນແປງ"
							>
								<SaveIcon />
							</IconButton>

							<IconButton
								color="inherit"
								onClick={resetChanges}
								disabled={!editMode}
								title="ຍົກເລີກການປ່ຽນແປງ"
							>
								<RefreshIcon />
							</IconButton>

							<IconButton
								color="inherit"
								onClick={handleAddItem}
								disabled={currentTab === "tips"}
								title="ເພີ່ມລາຍການໃໝ່"
							>
								<AddIcon />
							</IconButton>

							{currentTab === "tips" && editMode && (
								<IconButton
									color="inherit"
									onClick={addNewTip}
									title="ເພີ່ມຄຳແນະນຳໃໝ່"
								>
									<AddIcon />
								</IconButton>
							)}

							<IconButton
								color="inherit"
								onClick={saveToLocalStorage}
								title="ບັນທຶກໄວ້ໃນບຣາວເຊີນີ້"
							>
								<SaveAltIcon />
							</IconButton>

							<IconButton
								color="inherit"
								onClick={loadFromLocalStorage}
								title="ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້"
							>
								<BackupIcon />
							</IconButton>

							<IconButton
								color="inherit"
								onClick={printSchedule}
								title="ພິມຕາຕະລາງ"
							>
								<PrintIcon />
							</IconButton>
						</Box>
					)}
				</Toolbar>

				{/* Tabs ສຳລັບໜ້າຈໍແທັບເລັດແລະຄອມພິວເຕີ */}
				{!isMobile && (
					<Tabs
						value={currentTab}
						onChange={handleTabChange}
						textColor="inherit"
						indicatorColor="secondary"
						variant="fullWidth"
						sx={{
							backgroundColor: "primary.dark",
							"& .MuiTab-root": {
								py: 1,
								fontWeight: "medium",
							},
						}}
					>
						<Tab
							value="weekday"
							label="ວັນຈັນ-ວັນສຸກ"
							icon={getTabInfo("weekday").icon}
							iconPosition="start"
						/>
						<Tab
							value="saturday"
							label="ວັນເສົາ"
							icon={getTabInfo("saturday").icon}
							iconPosition="start"
						/>
						<Tab
							value="sunday"
							label="ວັນອາທິດ"
							icon={getTabInfo("sunday").icon}
							iconPosition="start"
						/>
						<Tab
							value="tips"
							label="ຄຳແນະນຳເພີ່ມເຕີມ"
							icon={getTabInfo("tips").icon}
							iconPosition="start"
						/>
					</Tabs>
				)}
			</MUIAppBar>

			{/* Drawer ສຳລັບໜ້າຈໍໂທລະສັບ */}
			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={() => toggleDrawer(false)}
			>
				{drawerContent}
			</Drawer>

			{/* Bottom Navigation ສຳລັບໂທລະສັບມືຖື */}
			{isMobile && (
				<Box
					sx={{
						position: "fixed",
						bottom: 0,
						left: 0,
						right: 0,
						zIndex: 1100,
						boxShadow: "0px -2px 4px rgba(0,0,0,0.1)",
						bgcolor: "background.paper",
						display: { sm: "none" },
					}}
				>
					<BottomNavigation
						value={currentTab}
						onChange={(event, newValue) => handleTabChange(event, newValue)}
						showLabels
					>
						<BottomNavigationAction
							value="weekday"
							label="ຈັນ-ສຸກ"
							icon={<WeekdayIcon />}
						/>
						<BottomNavigationAction
							value="saturday"
							label="ເສົາ"
							icon={<WeekendIcon />}
						/>
						<BottomNavigationAction
							value="sunday"
							label="ອາທິດ"
							icon={<SundayIcon />}
						/>
						<BottomNavigationAction
							value="tips"
							label="ແນະນຳ"
							icon={<TipsIcon />}
						/>
					</BottomNavigation>
				</Box>
			)}

			{/* Dialog ໂປຣໄຟລ໌ຜູ້ໃຊ້ */}
			<UserProfile open={profileOpen} onClose={() => setProfileOpen(false)} />
		</>
	);
};

export default AppBar;