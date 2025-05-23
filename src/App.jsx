// // src/App.jsx
// import React from "react";
// import { useState, useEffect } from "react";
// import {
// 	CssBaseline,
// 	Container,
// 	ThemeProvider,
// 	Box,
// 	useMediaQuery,
// } from "@mui/material";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

// import theme from "./theme/theme";
// import ScheduleProvider from "./contexts/ScheduleContext";
// import AppBar from "./components/AppBar";
// import StatusMessage from "./components/StatusMessage";
// import WeekdaySchedule from "./pages/WeekdaySchedule";
// import SaturdaySchedule from "./pages/SaturdaySchedule";
// import SundaySchedule from "./pages/SundaySchedule";
// import TipsPage from "./pages/TipsPage";

// function App() {
// 	// ສະຖານະສຳລັບແທັບປັດຈຸບັນ
// 	const [currentTab, setCurrentTab] = useState("weekday");

// 	// ກວດສອບຄວາມກວ້າງໜ້າຈໍ
// 	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// 	// ກຳນົດການຈັດການເມື່ອກົດ esc ເພື່ອຍົກເລີກການແກ້ໄຂ
// 	useEffect(() => {
// 		const handleKeyDown = (e) => {
// 			// TODO: ເພີ່ມຟັງຊັນຄີບອດຊ໊ອດຄັດ
// 		};

// 		window.addEventListener("keydown", handleKeyDown);
// 		return () => {
// 			window.removeEventListener("keydown", handleKeyDown);
// 		};
// 	}, []);

// 	// ສະແດງໜ້າຕາມແທັບທີ່ເລືອກ
// 	const renderContent = () => {
// 		switch (currentTab) {
// 			case "weekday":
// 				return <WeekdaySchedule />;
// 			case "saturday":
// 				return <SaturdaySchedule />;
// 			case "sunday":
// 				return <SundaySchedule />;
// 			case "tips":
// 				return <TipsPage />;
// 			default:
// 				return <WeekdaySchedule />;
// 		}
// 	};

// 	return (
// 		<ThemeProvider theme={theme}>
// 			<ScheduleProvider>
// 				<CssBaseline />
// 				<div className="App">
// 					<AppBar currentTab={currentTab} onTabChange={setCurrentTab} />
// 					<Container
// 						component="main"
// 						sx={{
// 							py: 3,
// 							px: { xs: 1, sm: 2, md: 3 }, // Responsive padding
// 							mb: isMobile ? 8 : 3, // Additional bottom margin for mobile (for bottom navigation)
// 							maxWidth: { lg: "lg", xl: "xl" }, // Responsive container width
// 						}}
// 					>
// 						{renderContent()}
// 					</Container>
// 					<StatusMessage />
// 				</div>
// 			</ScheduleProvider>
// 		</ThemeProvider>
// 	);
// }

// export default App;

// src/App.jsx (Updated with Authentication)
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import theme from "./theme/theme";

// Import Contexts
import { AuthProvider } from "./contexts/AuthContext";
import { ScheduleProvider } from "./contexts/ScheduleContext";

// Import Components
import AuthWrapper from "./components/AuthWrapper";
import AppBar from "./components/AppBar";
import StatusMessage from "./components/StatusMessage";

// Import Pages
import WeekdaySchedule from "./pages/WeekdaySchedule";
import SaturdaySchedule from "./pages/SaturdaySchedule";
import SundaySchedule from "./pages/SundaySchedule";
import TipsPage from "./pages/TipsPage";

function App() {
	const [currentTab, setCurrentTab] = useState("weekday");

	// ສ້າງບັນຊີ demo ເມື່ອແອັບເລີ່ມຕົ້ນ (ຖ້າຍັງບໍ່ມີ)
	useEffect(() => {
		const existingUsers = JSON.parse(
			localStorage.getItem("registeredUsers") || "[]",
		);
		const demoUser = existingUsers.find((u) => u.username === "demo");

		if (!demoUser) {
			const demoUserData = {
				id: "demo-user-123",
				username: "demo",
				password: "123456",
				fullName: "ຜູ້ໃຊ້ທົດລອງ",
				email: "demo@example.com",
				createdAt: new Date().toISOString(),
			};

			existingUsers.push(demoUserData);
			localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
		}
	}, []);

	const handleTabChange = (newTab) => {
		setCurrentTab(newTab);
	};

	const renderContent = () => {
		switch (currentTab) {
			case "weekday":
				return <WeekdaySchedule />;
			case "saturday":
				return <SaturdaySchedule />;
			case "sunday":
				return <SundaySchedule />;
			case "tips":
				return <TipsPage />;
			default:
				return <WeekdaySchedule />;
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AuthProvider>
				<AuthWrapper>
					<ScheduleProvider>
						<Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
							<AppBar currentTab={currentTab} onTabChange={handleTabChange} />

							<Box
								sx={{
									pb: { xs: 7, sm: 3 }, // ເພີ່ມພື້ນທີ່ດ້ານລຸ່ມສຳລັບ bottom navigation
									pt: 2,
								}}
							>
								{renderContent()}
							</Box>

							<StatusMessage />
						</Box>
					</ScheduleProvider>
				</AuthWrapper>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
