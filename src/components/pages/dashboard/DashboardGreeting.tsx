"use client";

export default function DashboardGreeting() {
  // const { user } = useAuth();
  const user = { firstName: "Rakib" }; // Mock user

  // Get time of day
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-black text-foreground flex items-center gap-3 uppercase tracking-tighter leading-none">
          {greeting}, {user?.firstName || "Bettor"}{" "}
          <span className="animate-wave">👋</span>
        </h1>
        <p className="text-muted-foreground mt-4 text-base font-medium max-w-xl leading-relaxed">
          The arena is set.{" "}
          <span className="text-primary font-bold">142 events</span> are live
          across your favorite markets. Ready to make your move?
        </p>
      </div>

      <div className="flex gap-4">
        <div className="bg-card border border-border px-6 py-3 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
            Win Rate
          </p>
          <p className="text-xl font-black text-emerald-500">68%</p>
        </div>
        <div className="bg-primary px-6 py-3 rounded-lg flex flex-col items-center justify-center min-w-[120px] shadow-lg shadow-primary/20">
          <p className="text-[10px] font-black text-primary-foreground/70 uppercase tracking-widest mb-1">
            XP Level
          </p>
          <p className="text-xl font-black text-white">PRO</p>
        </div>
      </div>
    </div>
  );
}
