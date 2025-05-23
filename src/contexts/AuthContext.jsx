// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	// ກວດສອບການເຂົ້າສູ່ລະບົບເມື່ອແອັບເລີ່ມຕົ້ນ
	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = () => {
		try {
			const storedUser = localStorage.getItem("currentUser");
			if (storedUser) {
				const userData = JSON.parse(storedUser);
				setUser(userData);
				setIsAuthenticated(true);
			}
		} catch (error) {
			console.error("Error checking auth status:", error);
		} finally {
			setLoading(false);
		}
	};

	// ຟັງຊັນລົງທະບຽນ
	const register = (userData) => {
		try {
			// ກວດສອບວ່າມີຜູ້ໃຊ້ນີ້ແລ້ວຫຼືບໍ່
			const existingUsers = JSON.parse(
				localStorage.getItem("registeredUsers") || "[]",
			);
			const userExists = existingUsers.find(
				(u) => u.username === userData.username,
			);

			if (userExists) {
				throw new Error("ຊື່ຜູ້ໃຊ້ນີ້ມີແລ້ວ! ກະລຸນາເລືອກຊື່ອື່ນ");
			}

			// ເພີ່ມຜູ້ໃຊ້ໃໝ່
			const newUser = {
				id: Date.now().toString(),
				username: userData.username,
				password: userData.password,
				fullName: userData.fullName,
				email: userData.email,
				createdAt: new Date().toISOString(),
			};

			existingUsers.push(newUser);
			localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

			// ເຂົ້າສູ່ລະບົບອັດຕະໂນມັດຫຼັງລົງທະບຽນ
			const userForSession = { ...newUser };
			// delete userForSession.password; // ບໍ່ເກັບລະຫັດຜ່ານໃນ session

			setUser(userForSession);
			setIsAuthenticated(true);
			localStorage.setItem("currentUser", JSON.stringify(userForSession));

			return { success: true, message: "ລົງທະບຽນສຳເລັດ!" };
		} catch (error) {
			return { success: false, message: error.message };
		}
	};

	// ຟັງຊັນເຂົ້າສູ່ລະບົບ
	const login = (username, password) => {
		try {
			const existingUsers = JSON.parse(
				localStorage.getItem("registeredUsers") || "[]",
			);
			const user = existingUsers.find(
				(u) => u.username === username && u.password === password,
			);

			if (!user) {
				throw new Error("ຊື່ຜູ້ໃຊ້ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ!");
			}

			const userForSession = { ...user };
			// delete userForSession.password; // ບໍ່ເກັບລະຫັດຜ່ານໃນ session

			setUser(userForSession);
			setIsAuthenticated(true);
			localStorage.setItem("currentUser", JSON.stringify(userForSession));

			return { success: true, message: "ເຂົ້າສູ່ລະບົບສຳເລັດ!" };
		} catch (error) {
			return { success: false, message: error.message };
		}
	};

	// ຟັງຊັນອອກຈາກລະບົບ
	const logout = () => {
		setUser(null);
		setIsAuthenticated(false);
		localStorage.removeItem("currentUser");
		localStorage.removeItem("dailyScheduleData"); // ລົບຂໍ້ມູນຕາຕະລາງເມື່ອອອກຈາກລະບົບ
	};

	// ຟັງຊັນປ່ຽນລະຫັດຜ່ານ
	const changePassword = (currentPassword, newPassword) => {
		try {
			const existingUsers = JSON.parse(
				localStorage.getItem("registeredUsers") || "[]",
			);
			const userIndex = existingUsers.findIndex((u) => u.id === user.id);

			if (userIndex === -1) {
				throw new Error("ບໍ່ພົບຜູ້ໃຊ້!");
			}

			if (existingUsers[userIndex].password !== currentPassword) {
				throw new Error("ລະຫັດຜ່ານປັດຈຸບັນບໍ່ຖືກຕ້ອງ!");
			}

			existingUsers[userIndex].password = newPassword;
			localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

			return { success: true, message: "ປ່ຽນລະຫັດຜ່ານສຳເລັດ!" };
		} catch (error) {
			return { success: false, message: error.message };
		}
	};

	// ຟັງຊັນອັບເດດຂໍ້ມູນໂປຣໄຟລ໌
	const updateProfile = (profileData) => {
		try {
			const existingUsers = JSON.parse(
				localStorage.getItem("registeredUsers") || "[]",
			);
			const userIndex = existingUsers.findIndex((u) => u.id === user.id);

			if (userIndex === -1) {
				throw new Error("ບໍ່ພົບຜູ້ໃຊ້!");
			}

			existingUsers[userIndex] = {
				...existingUsers[userIndex],
				...profileData,
			};
			localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

			const updatedUser = { ...existingUsers[userIndex] };
			// delete updatedUser.password;

			setUser(updatedUser);
			localStorage.setItem("currentUser", JSON.stringify(updatedUser));

			return { success: true, message: "ອັບເດດໂປຣໄຟລ໌ສຳເລັດ!" };
		} catch (error) {
			return { success: false, message: error.message };
		}
	};

	const value = {
		user,
		isAuthenticated,
		loading,
		register,
		login,
		logout,
		changePassword,
		updateProfile,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};