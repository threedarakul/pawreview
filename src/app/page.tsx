export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-background px-6 text-center">
      <span className="text-4xl">🐾</span>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        PawReview
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        เว็บพร้อมใช้งานแล้ว กำลังรอสร้างหน้าตาจริงในขั้นตอนถัดไป
      </p>
    </div>
  );
}
