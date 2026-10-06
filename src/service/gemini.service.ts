import ai from "../config/gemini";
type ExistingSchedule = {
  start: Date;
  end: Date;
};
export const getScheduleSuggestion = async (
  start_time: string,
  end_time: string,
  schedules: ExistingSchedule[],
) => {

  const prompt = `
Kamu adalah AI untuk sistem penjadwalan event.

User ingin membuat event pada:
Mulai: ${start_time}
Selesai: ${end_time}

Berikut adalah jadwal event yang sudah ada:
${JSON.stringify(schedules, null, 2)}

Tugas:
1. Tentukan apakah waktu yang diminta bentrok dengan jadwal existing.
2. Jika bentrok, cari maksimal 3 slot waktu terdekat yang tidak bentrok.
3. Durasi event harus tetap sama.
4. Jangan mengubah durasi event.
5. Urutkan suggestion dari yang paling dekat dengan waktu yang diminta.

Berikan response HANYA dalam JSON dengan format:

{
  "conflict": true,
  "suggestions": [
    {
      "start_time": "...",
      "end_time": "..."
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};