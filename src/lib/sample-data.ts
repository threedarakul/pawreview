export type Employee = {
  id: string;
  name: string;
  startDate: string; // ISO date (YYYY-MM-DD)
  reviewDueDate: string; // ISO date (YYYY-MM-DD)
};

function isoDaysFromToday(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "ณัฏฐ์ ริมทะเล",
    startDate: isoDaysFromToday(-115),
    reviewDueDate: isoDaysFromToday(-3),
  },
  {
    id: "2",
    name: "ธัญวัฒน์ สุขสำราญ",
    startDate: isoDaysFromToday(-88),
    reviewDueDate: isoDaysFromToday(4),
  },
  {
    id: "3",
    name: "เมธาวี เงินตรา",
    startDate: isoDaysFromToday(-60),
    reviewDueDate: isoDaysFromToday(7),
  },
  {
    id: "4",
    name: "วรัญญา ทรัพย์มาก",
    startDate: isoDaysFromToday(-30),
    reviewDueDate: isoDaysFromToday(45),
  },
  {
    id: "5",
    name: "ปริญ รัตนะ",
    startDate: isoDaysFromToday(-10),
    reviewDueDate: isoDaysFromToday(90),
  },
];
