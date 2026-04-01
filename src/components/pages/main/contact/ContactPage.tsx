"use client";

import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormTextarea } from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";
import { Link } from "@/i18n/routing";
import { ChevronDown, ChevronUp, Headphones, Mail } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [topic, setTopic] = useState("");

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const faqs = [
    {
      id: "deposit",
      question: t("contactPage.faq1Q"),
      answer: t("contactPage.faq1A"),
    },
    {
      id: "withdrawal",
      question: t("contactPage.faq2Q"),
      answer: t("contactPage.faq2A"),
    },
    {
      id: "restricted",
      question: t("contactPage.faq3Q"),
      answer: t("contactPage.faq3A"),
    },
  ];

  const topicOptions = [
    { value: "deposit", label: t("contactPage.topicDeposit") },
    { value: "withdrawal", label: t("contactPage.topicWithdrawal") },
    { value: "bet", label: t("contactPage.topicBet") },
    { value: "account", label: t("contactPage.topicAccount") },
    { value: "other", label: t("contactPage.topicOther") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Page Header */}
      <div className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-card overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
            <Headphones className="w-3 h-3" />
            {t("contactPage.badge")}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t("contactPage.title")}
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground text-sm sm:text-base md:text-lg">
            {t("contactPage.subtitle")}
          </p>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column: Contact Form */}
          <div className="bg-card border border-border h-fit p-4 sm:p-6 md:p-8 rounded-2xl">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">
              {t("contactPage.formTitle")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 md:mb-8">
              {t("contactPage.formSubtitle")}
            </p>

            <form className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <FormInput
                  id="fullname"
                  label={t("contactPage.fullName")}
                  placeholder={t("contactPage.fullNamePlaceholder")}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
                <FormInput
                  id="email"
                  type="email"
                  label={t("contactPage.emailAddress")}
                  placeholder={t("contactPage.emailPlaceholder")}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  id="userid"
                  label={`${t("contactPage.userId")} (${t("contactPage.optional")})`}
                  placeholder={t("contactPage.userIdPlaceholder")}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
                <div className="space-y-2">
                  <FormSelect
                    id="subject"
                    label={t("contactPage.selectTopic")}
                    options={topicOptions}
                    placeholder={t("contactPage.topicPlaceholder")}
                    value={topic}
                    onValueChange={setTopic}
                    triggerClassName="bg-background border-border text-foreground"
                  />
                </div>
              </div>

              <FormTextarea
                id="message"
                label={t("contactPage.message")}
                placeholder={t("contactPage.messagePlaceholder")}
                className="min-h-[150px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground"
              />

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base">
                {t("contactPage.sendMessage")}
              </Button>
            </form>
          </div>

          {/* Right Column: Info & FAQ */}
          <div className="space-y-6">
            {/* Support Channels */}
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">
                    {t("contactPage.emailSupport")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-1">
                    support@areawins.com
                  </p>
                  <div className="text-primary text-xs font-medium">
                    {t("contactPage.emailSupportHint")}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">
                    {t("contactPage.liveChat")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-1">
                    {t("contactPage.liveChatAvailability")}
                  </p>
                  <div className="text-primary text-xs font-medium">
                    {t("contactPage.liveChatHint")}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-card border border-border rounded overflow-hidden">
              <div className="p-5 border-b border-border">
                <h3 className="font-bold text-foreground text-lg">
                  {t("contactPage.commonQuestions")}
                </h3>
              </div>
              <div className="divide-y divide-border">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-card">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-muted/30"
                    >
                      <span className="text-foreground text-sm font-medium">
                        {faq.question}
                      </span>
                      {activeFaq === faq.id ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    {activeFaq === faq.id && (
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {t("contactPage.legalPrompt")}{" "}
              <Link href="/terms" className="text-primary hover:underline">
                {t("contactPage.terms")}
              </Link>{" "}
              |{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                {t("contactPage.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
