// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
	Container,
	Paper,
	TextField,
	Button,
	Typography,
	Box,
	Alert,
	InputAdornment,
	IconButton,
	Divider,
	Link,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	Person as PersonIcon,
	Lock as LockIcon,
	Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = ({ onSwitchToRegister }) => {
	const { login } = useAuth();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		if (error) setError(""); // ລົບຂໍ້ຜິດພາດເມື່ອຜູ້ໃຊ້ພິມ
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		// ກວດສອບຂໍ້ມູນ
		if (!formData.username.trim() || !formData.password.trim()) {
			setError("ກະລຸນາໃສ່ຊື່ຜູ້ໃຊ້ແລະລະຫັດຜ່ານ");
			setLoading(false);
			return;
		}

		const result = login(formData.username.trim(), formData.password);

		if (!result.success) {
			setError(result.message);
		}

		setLoading(false);
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
			<Paper
				elevation={3}
				sx={{
					p: isMobile ? 3 : 4,
					borderRadius: 2,
					background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
				}}
			>
				{/* ຫົວຂໍ້ແລະໄອຄອນ */}
				<Box sx={{ textAlign: "center", mb: 3 }}>
					<ScheduleIcon
						sx={{
							fontSize: 60,
							color: "primary.main",
							mb: 1,
						}}
					/>
					<Typography variant="h4" component="h1" gutterBottom>
						ເຂົ້າສູ່ລະບົບ
					</Typography>
					<Typography variant="body2" color="text.secondary">
						ຕາຕະລາງປະຈຳວັນຂອງຂ້ອຍ
					</Typography>
				</Box>

				{/* ຟອມເຂົ້າສູ່ລະບົບ */}
				<Box component="form" onSubmit={handleSubmit}>
					{error && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					<TextField
						fullWidth
						name="username"
						label="ຊື່ຜູ້ໃຊ້"
						value={formData.username}
						onChange={handleChange}
						margin="normal"
						required
						autoComplete="username"
						autoFocus
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PersonIcon color="action" />
								</InputAdornment>
							),
						}}
						sx={{ mb: 2 }}
					/>

					<TextField
						fullWidth
						name="password"
						label="ລະຫັດຜ່ານ"
						type={showPassword ? "text" : "password"}
						value={formData.password}
						onChange={handleChange}
						margin="normal"
						required
						autoComplete="current-password"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon color="action" />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={toggleShowPassword}
										edge="end"
										aria-label="toggle password visibility"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{ mb: 3 }}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						disabled={loading}
						sx={{
							py: 1.5,
							mb: 2,
							fontSize: "1.1rem",
							fontWeight: 600,
						}}
					>
						{loading ? "ກຳລັງເຂົ້າສູ່ລະບົບ..." : "ເຂົ້າສູ່ລະບົບ"}
					</Button>

					<Divider sx={{ my: 2 }}>
						<Typography variant="body2" color="text.secondary">
							ຫຼື
						</Typography>
					</Divider>

					<Box sx={{ textAlign: "center" }}>
						<Typography variant="body2" color="text.secondary">
							ຍັງບໍ່ມີບັນຊີ?{" "}
							<Link
								component="button"
								type="button"
								onClick={onSwitchToRegister}
								sx={{
									color: "primary.main",
									fontWeight: 600,
									textDecoration: "none",
									"&:hover": {
										textDecoration: "underline",
									},
								}}
							>
								ລົງທະບຽນທີ່ນີ້
							</Link>
						</Typography>
					</Box>
				</Box>

				{/* ຂໍ້ມູນການທົດລອງ */}
				<Box
					sx={{
						mt: 3,
						p: 2,
						bgcolor: "rgba(52, 152, 219, 0.1)",
						borderRadius: 1,
					}}
				>
					<Typography variant="body2" color="text.secondary" align="center">
						<strong>ສຳລັບການທົດລອງ:</strong>
						<br />
						ທ່ານສາມາດລົງທະບຽນບັນຊີໃໝ່ ຫຼື ໃຊ້ຂໍ້ມູນທົດລອງ
						<br />
						ຊື່ຜູ້ໃຊ້: demo | ລະຫັດ: 123456
					</Typography>
				</Box>
			</Paper>
		</Container>
	);
};

export default LoginPage;