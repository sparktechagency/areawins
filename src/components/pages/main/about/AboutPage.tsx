"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";
import { Link } from "@/i18n/routing";
import { Lock, Shield, Trophy, Users, Wallet, Zap } from "lucide-react";

const AboutPage = () => {
  const { t } = useTranslation();

  const highlights = [
    t("aboutPage.feature1"),
    t("aboutPage.feature2"),
    t("aboutPage.feature3"),
    t("aboutPage.feature4"),
    t("aboutPage.feature5"),
    t("aboutPage.feature6"),
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 sm:mb-6 border border-primary/20 uppercase tracking-wider">
            {t("aboutPage.platformOverview")}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {t("aboutPage.heroTitleLine1")} <br />
            {t("aboutPage.heroTitleLine2")}{" "}
            <span className="text-primary">{t("aboutPage.heroLocation")}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
            {t("aboutPage.heroDescription")}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12  border-y border-border bg-card/50">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 px-4 sm:px-6 lg:px-8 gap-4 md:gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              50k+
            </div>
            <div className="text-xs uppercase tracking-wider text-primary font-bold">
              {t("aboutPage.statsUsers")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              1,000+
            </div>
            <div className="text-xs uppercase tracking-wider text-primary font-bold">
              {t("aboutPage.statsMatches")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              24/7
            </div>
            <div className="text-xs uppercase tracking-wider text-primary font-bold">
              {t("aboutPage.statsSupport")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              99.9%
            </div>
            <div className="text-xs uppercase tracking-wider text-primary font-bold">
              {t("aboutPage.statsUptime")}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
            <div className="order-2 md:order-1 relative rounded-2xl overflow-hidden aspect-video bg-card border border-border">
              {/* Placeholder for "Built for Fans" image */}
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {t("aboutPage.builtForFans")}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {t("aboutPage.builtForFansDesc")}
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="text-primary text-xs font-bold uppercase tracking-wider mb-2">
                {t("aboutPage.missionTag")}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
                {t("aboutPage.missionTitle")}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 md:mb-6">
                {t("aboutPage.missionDesc")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <div className="text-primary text-xs font-bold uppercase tracking-wider mb-2">
                {t("aboutPage.visionTag")}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
                {t("aboutPage.visionTitle")}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 md:mb-6">
                {t("aboutPage.visionDesc")}
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-card border border-border">
              {/* Placeholder for Vision image */}
              <div className="absolute inset-0 bg-linear-to-bl from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            {t("aboutPage.whyTitle")}
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            {t("aboutPage.whySubtitle")}
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-background/50 border border-border hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {highlights[0]}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("aboutPage.feature1Desc")}
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-background/50 border border-border hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {highlights[1]}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("aboutPage.feature2Desc")}
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-background/50 border border-border hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {highlights[2]}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("aboutPage.feature3Desc")}
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-2xl bg-background/50 border border-border hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {highlights[3]}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("aboutPage.feature4Desc")}
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-8 rounded-2xl bg-background/50 border border-border hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {highlights[4]}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("aboutPage.feature5Desc")}
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-8 rounded-2xl bg-background/50 border border-border hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {highlights[5]}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("aboutPage.feature6Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-3xl p-12 text-center border border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {t("aboutPage.ctaTitle")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
              {t("aboutPage.ctaDesc")}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold min-w-[200px] h-14 text-lg"
                >
                  {t("aboutPage.ctaPrimary")}
                </Button>
              </Link>
              <Link href="/support">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-muted bg-transparent min-w-[200px] h-14 text-lg"
                >
                  {t("aboutPage.ctaSecondary")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
