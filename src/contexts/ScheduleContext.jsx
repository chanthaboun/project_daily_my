
// // src/contexts/ScheduleContext.jsx
// import React from "react";
// import { createContext, useState, useEffect, useContext } from "react";
// import {
// 	weekdaySchedule,
// 	saturdaySchedule,
// 	sundaySchedule,
// 	tipsData,
// } from "../data/scheduleData";

// // ສ້າງ Context
// export const ScheduleContext = createContext();

// // ສ້າງ Provider
// export const ScheduleProvider = ({ children }) => {
// 	// ຂໍ້ມູນຕາຕະລາງ
// 	const [schedules, setSchedules] = useState({
// 		weekday: JSON.parse(JSON.stringify(weekdaySchedule)),
// 		saturday: JSON.parse(JSON.stringify(saturdaySchedule)),
// 		sunday: JSON.parse(JSON.stringify(sundaySchedule)),
// 		tips: JSON.parse(JSON.stringify(tipsData)),
// 	});

// 	// ຂໍ້ມູນດັ້ງເດີມສຳລັບຍົກເລີກການປ່ຽນແປງ
// 	const [originalData, setOriginalData] = useState({
// 		weekday: JSON.parse(JSON.stringify(weekdaySchedule)),
// 		saturday: JSON.parse(JSON.stringify(saturdaySchedule)),
// 		sunday: JSON.parse(JSON.stringify(sundaySchedule)),
// 		tips: JSON.parse(JSON.stringify(tipsData)),
// 	});

// 	// ສະຖານະການແກ້ໄຂ
// 	const [editMode, setEditMode] = useState(false);

// 	// ສະຖານະຂໍ້ຄວາມ
// 	const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });

// 	// ໂຫຼດຂໍ້ມູນຈາກ localStorage ເມື່ອເລີ່ມຕົ້ນແອັບ
// 	useEffect(() => {
// 		tryLoadFromLocalStorage();
// 	}, []);

// 	// ຟັງຊັນສຳລັບເປີດ/ປິດໂໝດແກ້ໄຂ
// 	const toggleEditMode = () => {
// 		setEditMode(!editMode);
// 		if (!editMode) {
// 			showStatusMessage("ເປີດໂໝດການແກ້ໄຂແລ້ວ. ຄລິກທີ່ຊ່ອງຕ່າງໆເພື່ອແກ້ໄຂ.", "success");
// 		} else {
// 			showStatusMessage("ປິດໂໝດການແກ້ໄຂແລ້ວ.", "success");
// 		}
// 	};

// 	// ຟັງຊັນສຳລັບບັນທຶກການປ່ຽນແປງ
// 	const saveChanges = () => {
// 		setOriginalData(JSON.parse(JSON.stringify(schedules)));
// 		showStatusMessage("ບັນທຶກການປ່ຽນແປງສຳເລັດ!", "success");
// 		saveToLocalStorage();
// 	};

// 	// ຟັງຊັນສຳລັບຍົກເລີກການປ່ຽນແປງ
// 	const resetChanges = () => {
// 		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການຍົກເລີກການປ່ຽນແປງທັງໝົດ?")) {
// 			setSchedules(JSON.parse(JSON.stringify(originalData)));
// 			showStatusMessage("ຍົກເລີກການປ່ຽນແປງແລ້ວ", "success");
// 		}
// 	};

// 	// ຟັງຊັນສຳລັບບັນທຶກໃນ localStorage
// 	const saveToLocalStorage = () => {
// 		try {
// 			const data = {
// 				...schedules,
// 				savedDate: new Date().toString(),
// 			};

// 			localStorage.setItem("dailyScheduleData", JSON.stringify(data));
// 			showStatusMessage("ບັນທຶກຂໍ້ມູນໄວ້ໃນບຣາວເຊີນີ້ແລ້ວ!", "success");
// 			return true;
// 		} catch (error) {
// 			console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
// 			showStatusMessage("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ", "error");
// 			return false;
// 		}
// 	};

// 	// ຟັງຊັນສຳລັບໂຫຼດຈາກ localStorage
// 	const loadFromLocalStorage = () => {
// 		tryLoadFromLocalStorage(true);
// 	};

// 	// ຟັງຊັນໂຫຼດຂໍ້ມູນຈາກ localStorage
// 	const tryLoadFromLocalStorage = (showAlert = false) => {
// 		try {
// 			const savedData = localStorage.getItem("dailyScheduleData");

// 			if (savedData) {
// 				const data = JSON.parse(savedData);

// 				// ກວດສອບໂຄງສ້າງຂໍ້ມູນ
// 				if (data.weekday && data.saturday && data.sunday && data.tips) {
// 					setSchedules({
// 						weekday: data.weekday,
// 						saturday: data.saturday,
// 						sunday: data.sunday,
// 						tips: data.tips,
// 					});

// 					setOriginalData({
// 						weekday: data.weekday,
// 						saturday: data.saturday,
// 						sunday: data.sunday,
// 						tips: data.tips,
// 					});

// 					if (showAlert) {
// 						showStatusMessage(
// 							`ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້ສຳເລັດ! (ບັນທຶກເມື່ອ: ${new Date(data.savedDate).toLocaleString("lo-LA")})`,
// 							"success",
// 						);
// 					}

// 					return true;
// 				}
// 			}

// 			if (showAlert) {
// 				showStatusMessage("ບໍ່ພົບຂໍ້ມູນທີ່ບັນທຶກໄວ້!", "error");
// 			}

// 			return false;
// 		} catch (error) {
// 			console.error("ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ", error);
// 			if (showAlert) {
// 				showStatusMessage("ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ", "error");
// 			}
// 			return false;
// 		}
// 	};

// 	// ຟັງຊັນສຳລັບແກ້ໄຂຂໍ້ມູນໃນຕາຕະລາງ
// 	const updateScheduleItem = (scheduleType, itemId, field, value) => {
// 		setSchedules((prevSchedules) => {
// 			const updatedSchedule = [...prevSchedules[scheduleType]];
// 			const itemIndex = updatedSchedule.findIndex((item) => item.id === itemId);

// 			if (itemIndex !== -1) {
// 				updatedSchedule[itemIndex] = {
// 					...updatedSchedule[itemIndex],
// 					[field]: value,
// 				};
// 			}

// 			return {
// 				...prevSchedules,
// 				[scheduleType]: updatedSchedule,
// 			};
// 		});

// 		// ສະແດງຂໍ້ຄວາມບອກວ່າມີການປ່ຽນແປງ
// 		showStatusMessage("ມີການປ່ຽນແປງທີ່ຍັງບໍ່ໄດ້ບັນທຶກ", "warning");
// 	};

// 	// ຟັງຊັນສຳລັບປ່ຽນການຈັດລຽງບູລິມະສິດ
// 	const togglePriority = (scheduleType, itemId) => {
// 		setSchedules((prevSchedules) => {
// 			const updatedSchedule = [...prevSchedules[scheduleType]];
// 			const itemIndex = updatedSchedule.findIndex((item) => item.id === itemId);

// 			if (itemIndex !== -1) {
// 				updatedSchedule[itemIndex] = {
// 					...updatedSchedule[itemIndex],
// 					priority: !updatedSchedule[itemIndex].priority,
// 				};
// 			}

// 			const newSchedules = {
// 				...prevSchedules,
// 				[scheduleType]: updatedSchedule,
// 			};

// 			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
// 			try {
// 				localStorage.setItem(
// 					"dailyScheduleData",
// 					JSON.stringify({
// 						...newSchedules,
// 						savedDate: new Date().toString(),
// 					}),
// 				);
// 			} catch (error) {
// 				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
// 			}

// 			return newSchedules;
// 		});

// 		showStatusMessage("ປັບປ່ຽນບູລິມະສິດແລ້ວ", "success");
// 	};

// 	// ຟັງຊັນສຳລັບລົບລາຍການຈາກຕາຕະລາງ
// 	const deleteScheduleItem = (scheduleType, itemId) => {
// 		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບລາຍການນີ້?")) {
// 			setSchedules((prevSchedules) => {
// 				const updatedSchedule = prevSchedules[scheduleType].filter(
// 					(item) => item.id !== itemId,
// 				);

// 				const newSchedules = {
// 					...prevSchedules,
// 					[scheduleType]: updatedSchedule,
// 				};

// 				// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
// 				try {
// 					localStorage.setItem(
// 						"dailyScheduleData",
// 						JSON.stringify({
// 							...newSchedules,
// 							savedDate: new Date().toString(),
// 						}),
// 					);
// 				} catch (error) {
// 					console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
// 				}

// 				return newSchedules;
// 			});

// 			showStatusMessage("ລົບລາຍການສຳເລັດ", "success");
// 		}
// 	};

// 	// ຟັງຊັນສຳລັບເພີ່ມຄຳແນະນຳໃໝ່
// 	const addNewTip = () => {
// 		setSchedules((prevSchedules) => {
// 			const updatedTips = [...prevSchedules.tips];
// 			const newId = Math.max(...updatedTips.map((tip) => tip.id), 0) + 1;

// 			const newTip = {
// 				id: newId,
// 				title: "ຄຳແນະນຳໃໝ່",
// 				items: ["ຂໍ້ຄວາມຄຳແນະນຳໃໝ່"],
// 			};

// 			const newSchedules = {
// 				...prevSchedules,
// 				tips: [...updatedTips, newTip],
// 			};

// 			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
// 			try {
// 				localStorage.setItem(
// 					"dailyScheduleData",
// 					JSON.stringify({
// 						...newSchedules,
// 						savedDate: new Date().toString(),
// 					}),
// 				);
// 			} catch (error) {
// 				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
// 			}

// 			return newSchedules;
// 		});

// 		showStatusMessage("ເພີ່ມຄຳແນະນຳໃໝ່ສຳເລັດ", "success");
// 	};

// 	// ຟັງຊັນສຳລັບລົບຄຳແນະນຳ
// 	const deleteTip = (tipId) => {
// 		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບຄຳແນະນຳນີ້?")) {
// 			setSchedules((prevSchedules) => {
// 				const updatedTips = prevSchedules.tips.filter(
// 					(tip) => tip.id !== tipId,
// 				);

// 				const newSchedules = {
// 					...prevSchedules,
// 					tips: updatedTips,
// 				};

// 				// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
// 				try {
// 					localStorage.setItem(
// 						"dailyScheduleData",
// 						JSON.stringify({
// 							...newSchedules,
// 							savedDate: new Date().toString(),
// 						}),
// 					);
// 				} catch (error) {
// 					console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
// 				}

// 				return newSchedules;
// 			});

// 			showStatusMessage("ລົບຄຳແນະນຳສຳເລັດ", "success");
// 		}
// 	};

// 	// ຟັງຊັນສຳລັບແກ້ໄຂຫົວຂໍ້ຄຳແນະນຳ
// 	const updateTipTitle = (tipId, newTitle) => {
// 		setSchedules((prevSchedules) => {
// 			const updatedTips = [...prevSchedules.tips];
// 			const tipIndex = updatedTips.findIndex((tip) => tip.id === tipId);

// 			if (tipIndex !== -1) {
// 				updatedTips[tipIndex] = {
// 					...updatedTips[tipIndex],
// 					title: newTitle,
// 				};
// 			}

// 			const newSchedules = {
// 				...prevSchedules,
// 				tips: updatedTips,
// 			};

// 			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
// 			try {
// 				localStorage.setItem(
// 					"dailyScheduleData",
// 					JSON.stringify({
// 						...newSchedules,
// 						savedDate: new Date().toString(),
// 					}),
// 				);
// 			} catch (error) {
// 				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
// 			}

// 			return newSchedules;
// 		});

// 		showStatusMessage("ອັບເດດຫົວຂໍ້ຄຳແນະນຳແລ້ວ", "success");
// 	};

// 	// ຟັງຊັນສຳລັບເພີ່ມລາຍການຄຳແນະນຳ
// 	const addTipItem = (tipId) => {
// 		setSchedules((prevSchedules) => {
// 			const updatedTips = [...prevSchedules.tips];
// 			const tipIndex = updatedTips.findIndex((tip) => tip.id === tipId);

// 			if (tipIndex !== -1) {
// 				const updatedItems = [...updatedTips[tipIndex].items, "ຂໍ້ຄວາມຄຳແນະນຳໃໝ່"];

// 				updatedTips[tipIndex] = {
// 					...updatedTips[tipIndex],
// 					items: updatedItems,
// 				};
// 			}

// 			const newSchedules = {
// 				...prevSchedules,
// 				tips: updatedTips,
// 			};

// 			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
// 			try {
// 				localStorage.setItem(
// 					"dailyScheduleData",
// 					JSON.stringify({
// 						...newSchedules,
// 						savedDate: new Date().toString(),
// 					}),
// 				);
// 			} catch (error) {
// 				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
// 			}

// 			return newSchedules;
// 		});

// 		showStatusMessage("ເພີ່ມລາຍການຄຳແນະນຳແລ້ວ", "success");
// 	};

// 	// ຟັງຊັນສຳລັບລົບລາຍການຄຳແນະນຳ
// 	const deleteTipItem = (tipId, itemIndex) => {
// 		setSchedules((prevSchedules) => {
// 			const updatedTips = [...prevSchedules.tips];
// 			const tipIndex = updatedTips.findIndex((tip) => tip.id === tipId);

// 			if (tipIndex !== -1) {
// 				const updatedItems = [...updatedTips[tipIndex].items];
// 				updatedItems.splice(itemIndex, 1);

// 				updatedTips[tipIndex] = {
// 					...updatedTips[tipIndex],
// 					items: updatedItems,
// 				};
// 			}

// 			const newSchedules = {
// 				...prevSchedules,
// 				tips: updatedTips,
// 			};

// 			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
// 			try {
// 				localStorage.setItem(
// 					"dailyScheduleData",
// 					JSON.stringify({
// 						...newSchedules,
// 						savedDate: new Date().toString(),
// 					}),
// 				);
// 			} catch (error) {
// 				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
// 			}

// 			return newSchedules;
// 		});

// 		showStatusMessage("ລົບລາຍການຄຳແນະນຳແລ້ວ", "warning");
// 	};

// 	// ຟັງຊັນສຳລັບແກ້ໄຂລາຍການຄຳແນະນຳ
// 	const updateTipItem = (tipId, itemIndex, newText) => {
// 		setSchedules((prevSchedules) => {
// 			const updatedTips = [...prevSchedules.tips];
// 			const tipIndex = updatedTips.findIndex((tip) => tip.id === tipId);

// 			if (tipIndex !== -1) {
// 				const updatedItems = [...updatedTips[tipIndex].items];
// 				updatedItems[itemIndex] = newText;

// 				updatedTips[tipIndex] = {
// 					...updatedTips[tipIndex],
// 					items: updatedItems,
// 				};
// 			}

// 			const newSchedules = {
// 				...prevSchedules,
// 				tips: updatedTips,
// 			};

// 			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
// 			try {
// 				localStorage.setItem(
// 					"dailyScheduleData",
// 					JSON.stringify({
// 						...newSchedules,
// 						savedDate: new Date().toString(),
// 					}),
// 				);
// 			} catch (error) {
// 				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
// 			}

// 			return newSchedules;
// 		});

// 		showStatusMessage("ອັບເດດລາຍການຄຳແນະນຳແລ້ວ", "success");
// 	};

// 	// ຟັງຊັນສຳລັບສະແດງຂໍ້ຄວາມສະຖານະ
// 	const showStatusMessage = (message, type) => {
// 		setStatusMessage({ message, type });

// 		// ຊ່ອນຂໍ້ຄວາມຫຼັງຈາກ 3 ວິນາທີ
// 		setTimeout(() => {
// 			setStatusMessage({ message: "", type: "" });
// 		}, 3000);
// 	};

// 	// ເຕັກນິກສຳລັບການພິມຕາຕະລາງ
// 	const printSchedule = () => {
// 		window.print();
// 	};

// 	// ຟັງຊັນສຳລັບເພີ່ມລາຍການໃໝ່
// 	const addNewItem = (scheduleType) => {
// 		setSchedules((prevSchedules) => {
// 			const updatedSchedule = [...prevSchedules[scheduleType]];
// 			const newId = Math.max(...updatedSchedule.map((item) => item.id), 0) + 1;

// 			const newItem = {
// 				id: newId,
// 				time: "[ເວລາໃໝ່]",
// 				activity: "[ກິດຈະກຳໃໝ່]",
// 				notes: "[ໝາຍເຫດ]",
// 				priority: false,
// 			};

// 			return {
// 				...prevSchedules,
// 				[scheduleType]: [...updatedSchedule, newItem],
// 			};
// 		});

// 		showStatusMessage("ເພີ່ມລາຍການໃໝ່ສຳເລັດ", "success");
// 	};

// 	return (
// 		<ScheduleContext.Provider
// 			value={{
// 				schedules,
// 				editMode,
// 				statusMessage,
// 				toggleEditMode,
// 				saveChanges,
// 				resetChanges,
// 				saveToLocalStorage,
// 				loadFromLocalStorage,
// 				updateScheduleItem,
// 				addNewItem,
// 				deleteScheduleItem,
// 				showStatusMessage,
// 				printSchedule,
// 				togglePriority,
// 				addNewTip,
// 				deleteTip,
// 				updateTipTitle,
// 				addTipItem,
// 				deleteTipItem,
// 				updateTipItem,
// 			}}
// 		>
// 			{children}
// 		</ScheduleContext.Provider>
// 	);
// };

// // Hook ເພື່ອໃຊ້ Context ງ່າຍຂຶ້ນ
// export const useSchedule = () => useContext(ScheduleContext);

// export default ScheduleProvider;

// src/contexts/ScheduleContext.jsx (Updated for per-user data)
import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import {
	weekdaySchedule,
	saturdaySchedule,
	sundaySchedule,
	tipsData,
} from "../data/scheduleData";
import { useAuth } from "./AuthContext";

// ສ້າງ Context
export const ScheduleContext = createContext();

// ສ້າງ Provider
export const ScheduleProvider = ({ children }) => {
	const { user } = useAuth();

	// ຂໍ້ມູນຕາຕະລາງ
	const [schedules, setSchedules] = useState({
		weekday: JSON.parse(JSON.stringify(weekdaySchedule)),
		saturday: JSON.parse(JSON.stringify(saturdaySchedule)),
		sunday: JSON.parse(JSON.stringify(sundaySchedule)),
		tips: JSON.parse(JSON.stringify(tipsData)),
	});

	// ຂໍ້ມູນດັ້ງເດີມສຳລັບຍົກເລີກການປ່ຽນແປງ
	const [originalData, setOriginalData] = useState({
		weekday: JSON.parse(JSON.stringify(weekdaySchedule)),
		saturday: JSON.parse(JSON.stringify(saturdaySchedule)),
		sunday: JSON.parse(JSON.stringify(sundaySchedule)),
		tips: JSON.parse(JSON.stringify(tipsData)),
	});

	// ສະຖານະການແກ້ໄຂ
	const [editMode, setEditMode] = useState(false);

	// ສະຖານະຂໍ້ຄວາມ
	const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });

	// ໂຫຼດຂໍ້ມູນຈາກ localStorage ເມື່ອຜູ້ໃຊ້ປ່ຽນ
	useEffect(() => {
		if (user) {
			tryLoadFromLocalStorage();
		}
	}, [user]);

	// ສ້າງຄີສຳລັບແຕ່ລະຜູ້ໃຊ້
	const getUserDataKey = () => {
		return user ? `dailyScheduleData_${user.id}` : "dailyScheduleData";
	};

	// ຟັງຊັນສຳລັບເປີດ/ປິດໂໝດແກ້ໄຂ
	const toggleEditMode = () => {
		setEditMode(!editMode);
		if (!editMode) {
			showStatusMessage("ເປີດໂໝດການແກ້ໄຂແລ້ວ. ຄລິກທີ່ຊ່ອງຕ່າງໆເພື່ອແກ້ໄຂ.", "success");
		} else {
			showStatusMessage("ປິດໂໝດການແກ້ໄຂແລ້ວ.", "success");
		}
	};

	// ຟັງຊັນສຳລັບບັນທຶກການປ່ຽນແປງ
	const saveChanges = () => {
		setOriginalData(JSON.parse(JSON.stringify(schedules)));
		showStatusMessage("ບັນທຶກການປ່ຽນແປງສຳເລັດ!", "success");
		saveToLocalStorage();
	};

	// ຟັງຊັນສຳລັບຍົກເລີກການປ່ຽນແປງ
	const resetChanges = () => {
		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການຍົກເລີກການປ່ຽນແປງທັງໝົດ?")) {
			setSchedules(JSON.parse(JSON.stringify(originalData)));
			showStatusMessage("ຍົກເລີກການປ່ຽນແປງແລ້ວ", "success");
		}
	};

	// ຟັງຊັນສຳລັບບັນທຶກໃນ localStorage
	const saveToLocalStorage = () => {
		try {
			const data = {
				...schedules,
				savedDate: new Date().toString(),
				userId: user?.id,
			};

			const userDataKey = getUserDataKey();
			localStorage.setItem(userDataKey, JSON.stringify(data));
			showStatusMessage("ບັນທຶກຂໍ້ມູນໄວ້ໃນບຣາວເຊີນີ້ແລ້ວ!", "success");
			return true;
		} catch (error) {
			console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
			showStatusMessage("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ", "error");
			return false;
		}
	};

	// ຟັງຊັນສຳລັບໂຫຼດຈາກ localStorage
	const loadFromLocalStorage = () => {
		tryLoadFromLocalStorage(true);
	};

	// ຟັງຊັນໂຫຼດຂໍ້ມູນຈາກ localStorage
	const tryLoadFromLocalStorage = (showAlert = false) => {
		try {
			const userDataKey = getUserDataKey();
			const savedData = localStorage.getItem(userDataKey);

			if (savedData) {
				const data = JSON.parse(savedData);

				// ກວດສອບໂຄງສ້າງຂໍ້ມູນແລະວ່າເປັນຂອງຜູ້ໃຊ້ປັດຈຸບັນຫຼືບໍ່
				if (
					data.weekday &&
					data.saturday &&
					data.sunday &&
					data.tips &&
					(!data.userId || data.userId === user?.id)
				) {
					setSchedules({
						weekday: data.weekday,
						saturday: data.saturday,
						sunday: data.sunday,
						tips: data.tips,
					});

					setOriginalData({
						weekday: data.weekday,
						saturday: data.saturday,
						sunday: data.sunday,
						tips: data.tips,
					});

					if (showAlert) {
						showStatusMessage(
							`ໂຫຼດຂໍ້ມູນທີ່ບັນທຶກໄວ້ສຳເລັດ! (ບັນທຶກເມື່ອ: ${new Date(data.savedDate).toLocaleString("lo-LA")})`,
							"success",
						);
					}

					return true;
				}
			}

			if (showAlert) {
				showStatusMessage("ບໍ່ພົບຂໍ້ມູນທີ່ບັນທຶກໄວ້!", "error");
			}

			return false;
		} catch (error) {
			console.error("ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ", error);
			if (showAlert) {
				showStatusMessage("ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ", "error");
			}
			return false;
		}
	};

	// ຟັງຊັນສຳລັບແກ້ໄຂຂໍ້ມູນໃນຕາຕະລາງ
	const updateScheduleItem = (scheduleType, itemId, field, value) => {
		setSchedules((prevSchedules) => {
			const updatedSchedule = [...prevSchedules[scheduleType]];
			const itemIndex = updatedSchedule.findIndex((item) => item.id === itemId);

			if (itemIndex !== -1) {
				updatedSchedule[itemIndex] = {
					...updatedSchedule[itemIndex],
					[field]: value,
				};
			}

			return {
				...prevSchedules,
				[scheduleType]: updatedSchedule,
			};
		});

		// ສະແດງຂໍ້ຄວາມບອກວ່າມີການປ່ຽນແປງ
		showStatusMessage("ມີການປ່ຽນແປງທີ່ຍັງບໍ່ໄດ້ບັນທຶກ", "warning");
	};

	// ຟັງຊັນສຳລັບປ່ຽນການຈັດລຽງບູລິມະສິດ
	const togglePriority = (scheduleType, itemId) => {
		setSchedules((prevSchedules) => {
			const updatedSchedule = [...prevSchedules[scheduleType]];
			const itemIndex = updatedSchedule.findIndex((item) => item.id === itemId);

			if (itemIndex !== -1) {
				updatedSchedule[itemIndex] = {
					...updatedSchedule[itemIndex],
					priority: !updatedSchedule[itemIndex].priority,
				};
			}

			const newSchedules = {
				...prevSchedules,
				[scheduleType]: updatedSchedule,
			};

			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
			try {
				const userDataKey = getUserDataKey();
				localStorage.setItem(
					userDataKey,
					JSON.stringify({
						...newSchedules,
						savedDate: new Date().toString(),
						userId: user?.id,
					}),
				);
			} catch (error) {
				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
			}

			return newSchedules;
		});

		showStatusMessage("ປັບປ່ຽນບູລິມະສິດແລ້ວ", "success");
	};

	// ຟັງຊັນສຳລັບລົບລາຍການຈາກຕາຕະລາງ
	const deleteScheduleItem = (scheduleType, itemId) => {
		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບລາຍການນີ້?")) {
			setSchedules((prevSchedules) => {
				const updatedSchedule = prevSchedules[scheduleType].filter(
					(item) => item.id !== itemId,
				);

				const newSchedules = {
					...prevSchedules,
					[scheduleType]: updatedSchedule,
				};

				// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
				try {
					const userDataKey = getUserDataKey();
					localStorage.setItem(
						userDataKey,
						JSON.stringify({
							...newSchedules,
							savedDate: new Date().toString(),
							userId: user?.id,
						}),
					);
				} catch (error) {
					console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
				}

				return newSchedules;
			});

			showStatusMessage("ລົບລາຍການສຳເລັດ", "success");
		}
	};

	// ຟັງຊັນສຳລັບເພີ່ມຄຳແນະນຳໃໝ່
	const addNewTip = () => {
		setSchedules((prevSchedules) => {
			const updatedTips = [...prevSchedules.tips];
			const newId = Math.max(...updatedTips.map((tip) => tip.id), 0) + 1;

			const newTip = {
				id: newId,
				title: "ຄຳແນະນຳໃໝ່",
				items: ["ຂໍ້ຄວາມຄຳແນະນຳໃໝ່"],
			};

			const newSchedules = {
				...prevSchedules,
				tips: [...updatedTips, newTip],
			};

			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
			try {
				const userDataKey = getUserDataKey();
				localStorage.setItem(
					userDataKey,
					JSON.stringify({
						...newSchedules,
						savedDate: new Date().toString(),
						userId: user?.id,
					}),
				);
			} catch (error) {
				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
			}

			return newSchedules;
		});

		showStatusMessage("ເພີ່ມຄຳແນະນຳໃໝ່ສຳເລັດ", "success");
	};

	// ຟັງຊັນສຳລັບລົບຄຳແນະນຳ
	const deleteTip = (tipId) => {
		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບຄຳແນະນຳນີ້?")) {
			setSchedules((prevSchedules) => {
				const updatedTips = prevSchedules.tips.filter(
					(tip) => tip.id !== tipId,
				);

				const newSchedules = {
					...prevSchedules,
					tips: updatedTips,
				};

				// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
				try {
					const userDataKey = getUserDataKey();
					localStorage.setItem(
						userDataKey,
						JSON.stringify({
							...newSchedules,
							savedDate: new Date().toString(),
							userId: user?.id,
						}),
					);
				} catch (error) {
					console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
				}

				return newSchedules;
			});

			showStatusMessage("ລົບຄຳແນະນຳສຳເລັດ", "success");
		}
	};

	// ຟັງຊັນສຳລັບແກ້ໄຂຫົວຂໍ້ຄຳແນະນຳ
	const updateTipTitle = (tipId, newTitle) => {
		setSchedules((prevSchedules) => {
			const updatedTips = [...prevSchedules.tips];
			const tipIndex = updatedTips.findIndex((tip) => tip.id === tipId);

			if (tipIndex !== -1) {
				updatedTips[tipIndex] = {
					...updatedTips[tipIndex],
					title: newTitle,
				};
			}

			const newSchedules = {
				...prevSchedules,
				tips: updatedTips,
			};

			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
			try {
				const userDataKey = getUserDataKey();
				localStorage.setItem(
					userDataKey,
					JSON.stringify({
						...newSchedules,
						savedDate: new Date().toString(),
						userId: user?.id,
					}),
				);
			} catch (error) {
				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
			}

			return newSchedules;
		});

		showStatusMessage("ອັບເດດຫົວຂໍ້ຄຳແນະນຳແລ້ວ", "success");
	};

	// ຟັງຊັນສຳລັບເພີ່ມລາຍການຄຳແນະນຳ
	const addTipItem = (tipId) => {
		setSchedules((prevSchedules) => {
			const updatedTips = [...prevSchedules.tips];
			const tipIndex = updatedTips.findIndex((tip) => tip.id === tipId);

			if (tipIndex !== -1) {
				const updatedItems = [...updatedTips[tipIndex].items, "ຂໍ້ຄວາມຄຳແນະນຳໃໝ່"];

				updatedTips[tipIndex] = {
					...updatedTips[tipIndex],
					items: updatedItems,
				};
			}

			const newSchedules = {
				...prevSchedules,
				tips: updatedTips,
			};

			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
			try {
				const userDataKey = getUserDataKey();
				localStorage.setItem(
					userDataKey,
					JSON.stringify({
						...newSchedules,
						savedDate: new Date().toString(),
						userId: user?.id,
					}),
				);
			} catch (error) {
				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
			}

			return newSchedules;
		});

		showStatusMessage("ເພີ່ມລາຍການຄຳແນະນຳແລ້ວ", "success");
	};

	// ຟັງຊັນສຳລັບລົບລາຍການຄຳແນະນຳ
	const deleteTipItem = (tipId, itemIndex) => {
		setSchedules((prevSchedules) => {
			const updatedTips = [...prevSchedules.tips];
			const tipIndex = updatedTips.findIndex((tip) => tip.id === tipId);

			if (tipIndex !== -1) {
				const updatedItems = [...updatedTips[tipIndex].items];
				updatedItems.splice(itemIndex, 1);

				updatedTips[tipIndex] = {
					...updatedTips[tipIndex],
					items: updatedItems,
				};
			}

			const newSchedules = {
				...prevSchedules,
				tips: updatedTips,
			};

			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
			try {
				const userDataKey = getUserDataKey();
				localStorage.setItem(
					userDataKey,
					JSON.stringify({
						...newSchedules,
						savedDate: new Date().toString(),
						userId: user?.id,
					}),
				);
			} catch (error) {
				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
			}

			return newSchedules;
		});

		showStatusMessage("ລົບລາຍການຄຳແນະນຳແລ້ວ", "warning");
	};

	// ຟັງຊັນສຳລັບແກ້ໄຂລາຍການຄຳແນະນຳ
	const updateTipItem = (tipId, itemIndex, newText) => {
		setSchedules((prevSchedules) => {
			const updatedTips = [...prevSchedules.tips];
			const tipIndex = updatedTips.findIndex((tip) => tip.id === tipId);

			if (tipIndex !== -1) {
				const updatedItems = [...updatedTips[tipIndex].items];
				updatedItems[itemIndex] = newText;

				updatedTips[tipIndex] = {
					...updatedTips[tipIndex],
					items: updatedItems,
				};
			}

			const newSchedules = {
				...prevSchedules,
				tips: updatedTips,
			};

			// ບັນທຶກຂໍ້ມູນໃໝ່ໄປຍັງ localStorage ທັນທີ
			try {
				const userDataKey = getUserDataKey();
				localStorage.setItem(
					userDataKey,
					JSON.stringify({
						...newSchedules,
						savedDate: new Date().toString(),
						userId: user?.id,
					}),
				);
			} catch (error) {
				console.error("ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:", error);
			}

			return newSchedules;
		});

		showStatusMessage("ອັບເດດລາຍການຄຳແນະນຳແລ້ວ", "success");
	};

	// ຟັງຊັນສຳລັບສະແດງຂໍ້ຄວາມສະຖານະ
	const showStatusMessage = (message, type) => {
		setStatusMessage({ message, type });

		// ຊ່ອນຂໍ້ຄວາມຫຼັງຈາກ 3 ວິນາທີ
		setTimeout(() => {
			setStatusMessage({ message: "", type: "" });
		}, 3000);
	};

	// ເຕັກນິກສຳລັບການພິມຕາຕະລາງ
	const printSchedule = () => {
		window.print();
	};

	// ຟັງຊັນສຳລັບເພີ່ມລາຍການໃໝ່
	const addNewItem = (scheduleType) => {
		setSchedules((prevSchedules) => {
			const updatedSchedule = [...prevSchedules[scheduleType]];
			const newId = Math.max(...updatedSchedule.map((item) => item.id), 0) + 1;

			const newItem = {
				id: newId,
				time: "[ເວລາໃໝ່]",
				activity: "[ກິດຈະກຳໃໝ່]",
				notes: "[ໝາຍເຫດ]",
				priority: false,
			};

			return {
				...prevSchedules,
				[scheduleType]: [...updatedSchedule, newItem],
			};
		});

		showStatusMessage("ເພີ່ມລາຍການໃໝ່ສຳເລັດ", "success");
	};

	return (
		<ScheduleContext.Provider
			value={{
				schedules,
				editMode,
				statusMessage,
				toggleEditMode,
				saveChanges,
				resetChanges,
				saveToLocalStorage,
				loadFromLocalStorage,
				updateScheduleItem,
				addNewItem,
				deleteScheduleItem,
				showStatusMessage,
				printSchedule,
				togglePriority,
				addNewTip,
				deleteTip,
				updateTipTitle,
				addTipItem,
				deleteTipItem,
				updateTipItem,
			}}
		>
			{children}
		</ScheduleContext.Provider>
	);
};

// Hook ເພື່ອໃຊ້ Context ງ່າຍຂຶ້ນ
export const useSchedule = () => useContext(ScheduleContext);

export default ScheduleProvider;