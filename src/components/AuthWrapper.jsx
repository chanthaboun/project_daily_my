// src/components/AuthWrapper.jsx
import React, { useState } from "react";
import {
	Box,
	CircularProgress,
	Typography,
	Fade,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const AuthWrapper = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();
	const [showRegister, setShowRegister] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// ສະແດງໜ້າ loading ໃນຂະນະກວດສອບສະຖານະການເຂົ້າໃຊ້ງານ
	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					bgcolor: "background.default",
				}}
			>
				<CircularProgress size={60} sx={{ mb: 2 }} />
				<Typography variant="h6" color="text.secondary">
					ກຳລັງໂຫຼດ...
				</Typography>
			</Box>
		);
	}

	// ຖ້າຍັງບໍ່ໄດ້ເຂົ້າສູ່ລະບົບ ສະແດງໜ້າ Login ຫຼື Register
	if (!isAuthenticated) {
		return (
			<Box
				sx={{
					minHeight: "100vh",
					bgcolor: "background.default",
					py: isMobile ? 2 : 4,
				}}
			>
				<Fade in={true} timeout={500}>
					<div>
						{showRegister ? (
							<RegisterPage onSwitchToLogin={() => setShowRegister(false)} />
						) : (
							<LoginPage onSwitchToRegister={() => setShowRegister(true)} />
						)}
					</div>
				</Fade>
			</Box>
		);
	}

	// ຖ້າເຂົ້າສູ່ລະບົບແລ້ວ ສະແດງແອັບຫຼັກ
	return children;
};

export default AuthWrapper;