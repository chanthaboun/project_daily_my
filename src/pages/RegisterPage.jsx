// src/pages/RegisterPage.jsx
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
	FormHelperText,
} from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	Person as PersonIcon,
	Lock as LockIcon,
	Email as EmailIcon,
	AccountCircle as AccountIcon,
	Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = ({ onSwitchToLogin }) => {
	const { register } = useAuth();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [formData, setFormData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		fullName: "",
		email: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		// ລົບຂໍ້ຜິດພາດເມື່ອຜູ້ໃຊ້ພິມ
		if (errors[e.target.name]) {
			setErrors({
				...errors,
				[e.target.name]: "",
			});
		}
	};

	const validateForm = () => {
		const newErrors = {};

		// ກວດສອບຊື່ຜູ້ໃຊ້
		if (!formData.username.trim()) {
			newErrors.username = "ກະລຸນາໃສ່ຊື່ຜູ້ໃຊ້";
		} else if (formData.username.length < 3) {
			newErrors.username = "ຊື່ຜູ້ໃຊ້ຕ້ອງມີຢ່າງນ້ອຍ 3 ຕົວອັກສອນ";
		}

		// ກວດສອບຊື່ເຕັມ
		if (!formData.fullName.trim()) {
			newErrors.fullName = "ກະລຸນາໃສ່ຊື່ເຕັມ";
		}

		// ກວດສອບອີເມວ
		if (!formData.email.trim()) {
			newErrors.email = "ກະລຸນາໃສ່ອີເມວ";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ";
		}

		// ກວດສອບລະຫັດຜ່ານ
		if (!formData.password) {
			newErrors.password = "ກະລຸນາໃສ່ລະຫັດຜ່ານ";
		} else if (formData.password.length < 6) {
			newErrors.password = "ລະຫັດຜ່ານຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວອັກສອນ";
		}

		// ກວດສອບການຢືນຢັນລະຫັດຜ່ານ
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "ກະລຸນາຢືນຢັນລະຫັດຜ່ານ";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "ລະຫັດຜ່ານບໍ່ຕົງກັນ";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);

		const result = register({
			username: formData.username.trim(),
			password: formData.password,
			fullName: formData.fullName.trim(),
			email: formData.email.trim(),
		});

		if (!result.success) {
			setErrors({ general: result.message });
		}

		setLoading(false);
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
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
						ລົງທະບຽນ
					</Typography>
					<Typography variant="body2" color="text.secondary">
						ສ້າງບັນຊີເພື່ອໃຊ້ຕາຕະລາງປະຈຳວັນ
					</Typography>
				</Box>

				{/* ຟອມລົງທະບຽນ */}
				<Box component="form" onSubmit={handleSubmit}>
					{errors.general && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{errors.general}
						</Alert>
					)}

					<TextField
						fullWidth
						name="fullName"
						label="ຊື່ເຕັມ"
						value={formData.fullName}
						onChange={handleChange}
						margin="normal"
						required
						autoFocus
						error={!!errors.fullName}
						helperText={errors.fullName}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountIcon color="action" />
								</InputAdornment>
							),
						}}
						sx={{ mb: 1 }}
					/>

					<TextField
						fullWidth
						name="username"
						label="ຊື່ຜູ້ໃຊ້"
						value={formData.username}
						onChange={handleChange}
						margin="normal"
						required
						error={!!errors.username}
						helperText={errors.username}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PersonIcon color="action" />
								</InputAdornment>
							),
						}}
						sx={{ mb: 1 }}
					/>

					<TextField
						fullWidth
						name="email"
						label="ອີເມວ"
						type="email"
						value={formData.email}
						onChange={handleChange}
						margin="normal"
						required
						error={!!errors.email}
						helperText={errors.email}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailIcon color="action" />
								</InputAdornment>
							),
						}}
						sx={{ mb: 1 }}
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
						error={!!errors.password}
						helperText={errors.password}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon color="action" />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={toggleShowPassword} edge="end">
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{ mb: 1 }}
					/>

					<TextField
						fullWidth
						name="confirmPassword"
						label="ຢືນຢັນລະຫັດຜ່ານ"
						type={showConfirmPassword ? "text" : "password"}
						value={formData.confirmPassword}
						onChange={handleChange}
						margin="normal"
						required
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon color="action" />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={toggleShowConfirmPassword} edge="end">
										{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
						{loading ? "ກຳລັງລົງທະບຽນ..." : "ລົງທະບຽນ"}
					</Button>

					<Divider sx={{ my: 2 }}>
						<Typography variant="body2" color="text.secondary">
							ຫຼື
						</Typography>
					</Divider>

					<Box sx={{ textAlign: "center" }}>
						<Typography variant="body2" color="text.secondary">
							ມີບັນຊີແລ້ວ?{" "}
							<Link
								component="button"
								type="button"
								onClick={onSwitchToLogin}
								sx={{
									color: "primary.main",
									fontWeight: 600,
									textDecoration: "none",
									"&:hover": {
										textDecoration: "underline",
									},
								}}
							>
								ເຂົ້າສູ່ລະບົບທີ່ນີ້
							</Link>
						</Typography>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default RegisterPage;