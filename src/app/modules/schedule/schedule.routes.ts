import { Router } from "express";
import auth from "../../middlewares/auth";
import scheduleControllers from "./schedule.controllers";

const router = Router();

router.post(
    "/create-schedule",
    auth("SUPER_ADMIN", "ADMIN"),
    scheduleControllers.createSchedule
);

const scheduleRoutes = router;

export default scheduleRoutes;
