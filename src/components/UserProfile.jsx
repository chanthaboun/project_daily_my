// src/components/UserProfile.jsx
import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Box,
	Typography,
	Avatar,
	Divider,
	Alert,
	Tabs,
	Tab,
	InputAdornment,
	IconButton,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import {
	Person as PersonIcon,
	Email as EmailIcon,
	Lock as LockIcon,
	Visibility,
	VisibilityOff,
	AccountCircle as AccountIcon,
	ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = ({ open, onClose }) => {
	const { user, updateProfile, changePassword, logout } = useAuth();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [activeTab, setActiveTab] = useState(0);
	const [profileData, setProfileData] = useState({
		fullName: user?.fullName || "",
		email: user?.email || "",
	});
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
		setErrors({});
		setSuccess("");
	};

	const handleProfileChange = (e) => {
		setProfileData({
			...profileData,
			[e.target.name]: e.target.value,
		});
		if (errors[e.target.name]) {
			setErrors({
				...errors,
				[e.target.name]: "",
			});
		}
	};

	const handlePasswordChange = (e) => {
		setPasswordData({
			...passwordData,
			[e.target.name]: e.target.value,
		});
		if (errors[e.target.name]) {
			setErrors({
				...errors,
				[e.target.name]: "",
			});
		}
	};

	const toggleShowPassword = (field) => {
		setShowPasswords({
			...showPasswords,
			[field]: !showPasswords[field],
		});
	};

	const validateProfile = () => {
		const newErrors = {};

		if (!profileData.fullName.trim()) {
			newErrors.fullName = "ກະລຸນາໃສ່ຊື່ເຕັມ";
		}

		if (!profileData.email.trim()) {
			newErrors.email = "ກະລຸນາໃສ່ອີເມວ";
		} else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
			newErrors.email = "ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validatePassword = () => {
		const newErrors = {};

		if (!passwordData.currentPassword) {
			newErrors.currentPassword = "ກະລຸນາໃສ່ລະຫັດຜ່ານປັດຈຸບັນ";
		}

		if (!passwordData.newPassword) {
			newErrors.newPassword = "ກະລຸນາໃສ່ລະຫັດຜ່ານໃໝ່";
		} else if (passwordData.newPassword.length < 6) {
			newErrors.newPassword = "ລະຫັດຜ່ານໃໝ່ຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວອັກສອນ";
		}

		if (!passwordData.confirmPassword) {
			newErrors.confirmPassword = "ກະລຸນາຢືນຢັນລະຫັດຜ່ານໃໝ່";
		} else if (passwordData.newPassword !== passwordData.confirmPassword) {
			newErrors.confirmPassword = "ລະຫັດຜ່ານໃໝ່ບໍ່ຕົງກັນ";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleUpdateProfile = async () => {
		if (!validateProfile()) return;

		setLoading(true);
		const result = updateProfile(profileData);

		if (result.success) {
			setSuccess(result.message);
			setErrors({});
		} else {
			setErrors({ general: result.message });
		}

		setLoading(false);
	};

	const handleChangePassword = async () => {
		if (!validatePassword()) return;

		setLoading(true);
		const result = changePassword(
			passwordData.currentPassword,
			passwordData.newPassword,
		);

		if (result.success) {
			setSuccess(result.message);
			setPasswordData({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
			setErrors({});
		} else {
			setErrors({ general: result.message });
		}

		setLoading(false);
	};

	const handleLogout = () => {
		logout();
		onClose();
	};

	const handleClose = () => {
		setActiveTab(0);
		setErrors({});
		setSuccess("");
		setPasswordData({
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
			fullScreen={isMobile}
		>
			<DialogTitle>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Avatar sx={{ bgcolor: "primary.main" }}>
						<AccountIcon />
					</Avatar>
					<Box>
						<Typography variant="h6">ໂປຣໄຟລ໌ຜູ້ໃຊ້</Typography>
						<Typography variant="body2" color="text.secondary">
							{user?.username}
						</Typography>
					</Box>
				</Box>
			</DialogTitle>

			<DialogContent sx={{ p: 0 }}>
				<Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
					<Tab label="ຂໍ້ມູນສ່ວນຕົວ" />
					<Tab label="ປ່ຽນລະຫັດຜ່ານ" />
				</Tabs>

				<Box sx={{ p: 3 }}>
					{(errors.general || success) && (
						<Alert severity={success ? "success" : "error"} sx={{ mb: 2 }}>
							{success || errors.general}
						</Alert>
					)}

					{/* ແທັບຂໍ້ມູນສ່ວນຕົວ */}
					{activeTab === 0 && (
						<Box>
							<TextField
								fullWidth
								name="fullName"
								label="ຊື່ເຕັມ"
								value={profileData.fullName}
								onChange={handleProfileChange}
								margin="normal"
								error={!!errors.fullName}
								helperText={errors.fullName}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PersonIcon color="action" />
										</InputAdornment>
									),
								}}
							/>

							<TextField
								fullWidth
								name="email"
								label="ອີເມວ"
								type="email"
								value={profileData.email}
								onChange={handleProfileChange}
								margin="normal"
								error={!!errors.email}
								helperText={errors.email}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<EmailIcon color="action" />
										</InputAdornment>
									),
								}}
							/>

							<TextField
								fullWidth
								label="ຊື່ຜູ້ໃຊ້"
								value={user?.username || ""}
								margin="normal"
								disabled
								helperText="ບໍ່ສາມາດປ່ຽນຊື່ຜູ້ໃຊ້ໄດ້"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<AccountIcon color="action" />
										</InputAdornment>
									),
								}}
							/>
						</Box>
					)}

					{/* ແທັບປ່ຽນລະຫັດຜ່ານ */}
					{activeTab === 1 && (
						<Box>
							<TextField
								fullWidth
								name="currentPassword"
								label="ລະຫັດຜ່ານປັດຈຸບັນ"
								type={showPasswords.current ? "text" : "password"}
								value={passwordData.currentPassword}
								onChange={handlePasswordChange}
								margin="normal"
								error={!!errors.currentPassword}
								helperText={errors.currentPassword}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockIcon color="action" />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => toggleShowPassword("current")}
												edge="end"
											>
												{showPasswords.current ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							<TextField
								fullWidth
								name="newPassword"
								label="ລະຫັດຜ່ານໃໝ່"
								type={showPasswords.new ? "text" : "password"}
								value={passwordData.newPassword}
								onChange={handlePasswordChange}
								margin="normal"
								error={!!errors.newPassword}
								helperText={errors.newPassword}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockIcon color="action" />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => toggleShowPassword("new")}
												edge="end"
											>
												{showPasswords.new ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							<TextField
								fullWidth
								name="confirmPassword"
								label="ຢືນຢັນລະຫັດຜ່ານໃໝ່"
								type={showPasswords.confirm ? "text" : "password"}
								value={passwordData.confirmPassword}
								onChange={handlePasswordChange}
								margin="normal"
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
											<IconButton
												onClick={() => toggleShowPassword("confirm")}
												edge="end"
											>
												{showPasswords.confirm ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Box>
					)}
				</Box>
			</DialogContent>

			<DialogActions sx={{ p: 3, pt: 0 }}>
				<Box sx={{ display: "flex", gap: 1, width: "100%" }}>
					<Button
						onClick={handleLogout}
						startIcon={<LogoutIcon />}
						color="error"
						variant="outlined"
					>
						ອອກຈາກລະບົບ
					</Button>

					<Box sx={{ flexGrow: 1 }} />

					<Button onClick={handleClose}>ຍົກເລີກ</Button>

					<Button
						onClick={
							activeTab === 0 ? handleUpdateProfile : handleChangePassword
						}
						variant="contained"
						disabled={loading}
					>
						{loading ? "ກຳລັງບັນທຶກ..." : "ບັນທຶກ"}
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
};

export default UserProfile;