import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import sendResponse from "./app/utils/sendResponse";
import httpStatus from "http-status";
import appointmentServices from "./app/modules/appointment/appointment.services";
import cron from "node-cron";

const app: Application = express();

// parsers (middlewares)
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use("/api/v1", router);

// middlewares
app.use(globalErrorHandler);
app.use(notFound);

cron.schedule("* * * * *", async () => {
    appointmentServices.cancelUnpaidAppointments();
});

app.get("/", (_req: Request, res: Response) => {
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Welcome to The PH HealthCare!",
        data: null
    });
});

export default app;
