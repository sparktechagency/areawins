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
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        {greeting}, {user?.firstName || "Bettor"} <span className="animate-wave text-4xl">👋</span>
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Ready to win big on tonight's Champions League?
      </p>
    </div>
  );
}
