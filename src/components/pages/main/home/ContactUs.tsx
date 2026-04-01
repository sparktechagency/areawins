"use client";

import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-20 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl font-bold text-primary mb-12">
          {t("homeContact.title")}
        </h2>

        {/* Contact Form Card */}
        <div className="border border-border rounded-2xl p-8 md:p-12">
          {/* Subtitle */}
          <div className="text-left mb-8">
            <h3 className="text-xl font-semibold text-foreground">
              {t("homeContact.subtitle")}
            </h3>
            <p className="text-muted-foreground mt-1">
              {t("homeContact.description")}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                placeholder={t("homeContact.firstName")}
                className="bg-input text-foreground"
              />
              <FormInput
                type="text"
                placeholder={t("homeContact.lastName")}
                className="bg-input text-foreground"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                type="tel"
                placeholder={t("homeContact.phone")}
                required
                className="bg-input text-foreground"
              />
              <FormInput
                type="email"
                placeholder={t("homeContact.email")}
                required
                className="bg-input text-foreground"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                placeholder={t("homeContact.country")}
                className="bg-input text-foreground"
              />
              <FormInput
                type="text"
                placeholder={t("homeContact.subject")}
                required
                className="bg-input text-foreground"
              />
            </div>

            <FormTextarea
              placeholder={t("homeContact.message")}
              className="bg-input text-foreground min-h-32"
            />

            {/* Submit Button */}
            <div className="text-left pt-6 flex justify-end">
              <Button type="submit" className="cursor-pointer">
                {t("homeContact.submit")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
