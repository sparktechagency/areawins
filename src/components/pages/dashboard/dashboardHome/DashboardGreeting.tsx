"use client";
import { useAppSelector } from "@/redux/hooks";
import { useTranslation } from "@/i18n/LanguageContext";

export default function DashboardGreeting() {
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  // Get time of day
  const hour = new Date().getHours();
  let greeting = t("dashboardHome.greetingEvening");
  if (hour < 12) greeting = t("dashboardHome.greetingMorning");
  else if (hour < 18) greeting = t("dashboardHome.greetingAfternoon");

  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl  text-foreground flex items-center gap-3 tracking-tighter leading-none">
          {greeting}, {user?.fullName || t("dashboardHome.bettor")}{" "}
          <span className="animate-wave">👋</span>
        </h1>
        <p className="text-muted-foreground mt-4 text-base font-medium max-w-xl leading-relaxed">
          {t("dashboardHome.greetingDescriptionPrefix")}{" "}
          <span className="text-primary font-bold">
            {t("dashboardHome.greetingLiveEvents")}
          </span>{" "}
          {t("dashboardHome.greetingDescriptionSuffix")}
        </p>
      </div>
    </div>
  );
}
