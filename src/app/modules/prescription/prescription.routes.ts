import { Router } from "express";
import auth from "../../middlewares/auth";
import prescriptionControllers from "./prescription.controllers";

const router = Router();

router.get(
    "/create-prescription",
    auth("DOCTOR"),
    prescriptionControllers.createPrescription
);

const prescriptionRoutes = router;

export default prescriptionRoutes;