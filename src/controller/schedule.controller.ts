import { db } from "../config/db";
import { schedule } from "../config/schema";
import { Request, Response } from "express";
import { scheduleValidation } from "../validation/scheduler.validation";
import { PostScheduleValidation } from "../validation/scheduler.validation";
import { and, desc, eq } from "drizzle-orm";

export class Events {
    // Get all data
  GETeventScheduler = async (req: Request, res: Response) => {
    try {
      const query = await db
        .select()
        .from(schedule)
        .orderBy(desc(schedule.start_time));

      return res.status(200).json({
        success: true,
        message: "data berhasil diambil",
        data: query,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  POSTeventScheduler = async (req: Request, res: Response) => {
    const validation = PostScheduleValidation.parse(req.body);
    const { title, start_time, end_time, participants } = validation;

    try {
      const existingSchedule = await db
        .select({ start: schedule.start_time, end: schedule.end_time })
        .from(schedule)
        .where(
          and(
            eq(schedule.start_time, start_time),
            eq(schedule.end_time, end_time),
          ),
        ).limit(1);

      if (existingSchedule.length > 0) {
        return res.status(409).json({
          success: false,
          message: "jadwal sudah digunakan",
        });
      }

      const addQuery = await db.insert(schedule).values({
        title: title,
        start_time: start_time,
        end_time: end_time,
        participants: participants,
      });

      return res.status(200).json({
        success: true,
        message: "jadwal berhasil ditambahkan",
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export default new Events();
