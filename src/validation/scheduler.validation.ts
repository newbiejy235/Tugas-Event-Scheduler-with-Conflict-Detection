import z, { string } from "zod";

export const scheduleValidation = z.object({
  title: string().min(1, "minimal 1 char").max(255, "maksimal 255 char"),
});
