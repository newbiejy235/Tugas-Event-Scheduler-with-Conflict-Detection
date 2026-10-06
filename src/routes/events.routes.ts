import { Router } from "express";
import Events from "../controller/schedule.controller";

const router = Router();

router.get("/Events", Events.GETeventScheduler);
router.post("/", Events.POSTeventScheduler);

export default router
