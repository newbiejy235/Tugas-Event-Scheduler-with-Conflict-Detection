import { z } from "zod";

// Skema dasar untuk validasi jadwal
export const scheduleValidation = z.object({
  title: z.string().min(1, "minimal 1 char").max(255, "maksimal 255 char"),
});

// Skema untuk pembuatan jadwal baru (termasuk start_time)
export const PostScheduleValidation = z.object({
  title: z.string().min(1, "minimal 1 char").max(255, "maksimal 255 char"),

  // Mengubah string dari frontend menjadi objek Date, dan mengizinkan nilai kosong
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  participants: z.array(z.string()),
});
