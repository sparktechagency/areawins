"use client";
export default function DashboardGreeting() {
  const user = { firstName: "Rakib", fullName: "Rakib Hassan" };
  // Get time of day
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-black text-foreground flex items-center gap-3 tracking-tighter leading-none">
          {greeting}, {user?.fullName || "Bettor"}{" "}
          <span className="animate-wave">👋</span>
        </h1>
        <p className="text-muted-foreground mt-4 text-base font-medium max-w-xl leading-relaxed">
          The arena is set.{" "}
          <span className="text-primary font-bold">142 events</span> are live
          across your favorite markets. Ready to make your move?
        </p>
      </div>
    </div>
  );
}
