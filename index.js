const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authController = require("./controller/authController");
const newOptController = require("./controller/newOptController");
const navController = require("./controller/navController");
const homeController = require("./controller/homeController");
const fullDetailsController = require("./controller/fullDetailsController");
const pagePreviewController = require("./controller/pagePreviewController");
const updateStatus = require("./controller/statusUpdate");
const admin = require("./controller/adminHome");
const markUnattentiveMiddleware = require("./middleware/setUnattentiveMiddleware");

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Apply the unattentive middleware globally
app.use(markUnattentiveMiddleware);

// Route definitions
app.post("/login", authController.login);
app.post("/new", newOptController.addingData);
app.post("/nav", navController.showId);
app.post("/home", homeController.showAll);
app.post("/fulldetails", fullDetailsController.addStatus);
app.post("/addFullDetails", fullDetailsController.addDetails);
app.post("/follow", pagePreviewController.showFollowData);
app.post("/presentation", pagePreviewController.showPresentationData);
app.post("/meeting", pagePreviewController.showMeetingData);
app.post("/appointment", pagePreviewController.showAppointmentData);
app.post("/success", pagePreviewController.showSuccessData);
app.post("/cancel", pagePreviewController.showCancelData);
app.post("/unattentive", pagePreviewController.showUnattentiveData);
app.post("/remainder", pagePreviewController.showRemainderData);
app.post("/updateStatusShow", updateStatus.showupdateStatus);
app.post("/updateStatusFrom", updateStatus.updateStatus);
app.post("/adminHome", admin.adminTodayRemainder);
app.post("/adminFollow", admin.adminFollow);
app.post("/adminAppointment", admin.adminAppointment);
app.post("/adminPresentation", admin.adminPresentation);
app.post("/adminMeeting", admin.adminMeeting);
app.post("/adminSuccess", admin.adminSuccess);
app.post("/adminCancel", admin.adminCancel);
app.post("/adminUnattentive", admin.adminUnattentive);
app.post("/AdminAddUser", admin.AdminAddUser);
app.post("/AdminUnattentiveRemove", admin.AdminUnattentiveRemove);
app.post("/AdminUnattentiveRestore", admin.AdminUnattentiveRestore);
app.post("/adminShowDetails", admin.AdminShowDetails);
app.post("/adminRestore", admin.adminRestore);
app.post("/adminReassignShow", admin.adminReassignShow);
app.post("/adminReassignAdd", admin.adminReassignAdd);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://192.168.0.129:${PORT}`);
});
