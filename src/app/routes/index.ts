import { Router } from "express";
import userRoutes from "../modules/user/user.routes";
import adminRoutes from "../modules/admin/admin.routes";
import authRoutes from "../modules/auth/auth.routes";
import specialtyRoutes from "../modules/specialty/specialty.routes";
import doctorRoutes from "../modules/doctor/doctor.routes";
import patientRoutes from "../modules/patient/patient.routes";
import scheduleRoutes from "../modules/schedule/schedule.routes";
import doctorScheduleRoutes from "../modules/doctorSchedule/doctorSchedule.routes";
import appointmentRoutes from "../modules/appointment/appointment.routes";
import paymentRoutes from "../modules/payment/payment.routes";
import prescriptionRoutes from "../modules/prescription/prescription.routes";
import reviewRoutes from "../modules/review/review.routes";
import metaRoutes from "../modules/meta/meta.routes";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: userRoutes
    },
    {
        path: "/admins",
        route: adminRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/specialties",
        route: specialtyRoutes
    },
    {
        path: "/doctors",
        route: doctorRoutes
    },
    {
        path: "/patients",
        route: patientRoutes
    },
    {
        path: "/schedules",
        route: scheduleRoutes
    },
    {
        path: "/doctor-schedules",
        route: doctorScheduleRoutes
    },
    {
        path: "/appointments",
        route: appointmentRoutes
    },
    {
        path: "/payments",
        route: paymentRoutes
    },
    {
        path: "/prescriptions",
        route: prescriptionRoutes
    },
    {
        path: "/reviews",
        route: reviewRoutes
    },
    {
        path: "/metadata",
        route: metaRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
