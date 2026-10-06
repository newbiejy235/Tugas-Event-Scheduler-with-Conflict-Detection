import { Router } from "express";
import Events from "../controller/schedule.controller";

const router = Router();

router.get("/", Events.GETeventScheduler);

export default router
