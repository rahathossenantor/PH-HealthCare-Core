import { Router } from "express";
import auth from "../../middlewares/auth";
import doctorControllers from "./doctor.controllers";

const router = Router();

router.get(
    "/",
    // auth("SUPER_ADMIN", "ADMIN"),
    doctorControllers.getAllDoctors
);

router.get(
    "/:id",
    doctorControllers.getSingleDoctor
);

router.patch(
    "/:id",
    auth("SUPER_ADMIN", "ADMIN", "DOCTOR"),
    doctorControllers.updateDoctor
);

router.delete(
    "/:id",
    auth("SUPER_ADMIN", "ADMIN"),
    doctorControllers.deleteDoctor
);

const doctorRoutes = router;

export default doctorRoutes;
