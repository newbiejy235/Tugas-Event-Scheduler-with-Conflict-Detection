import { db } from "../config/db";
import { schedule } from "../config/schema";
import { Request, Response } from "express";
import { scheduleValidation } from "../validation/scheduler.validation";
import { desc } from "drizzle-orm";

export class Events {
  GETeventScheduler = async (req: Request, res: Response) => {
    try {
      const query = await db
        .select()
        .from(schedule)
        .orderBy(desc(schedule.start_time));

        return res.status(200).json({
            success : true,
            message : "data berhasil diambil",
            data : query
        })
    } catch (error : any) {
        return res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        })
    }
  };
}

export default new Events();
