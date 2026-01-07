import Link from "next/link";

interface ContactProps {
  emailUrl: string;
  calendlyUrl?: string;
  contactLabel?: string;
  getInTouch?: string;
  contactDescription?: string;
  viaEmail?: string;
  askQuestions?: string;
  exploreCollaboration?: string;
  coffeeChat?: string;
  schedule?: string;
}

export default function Contact({
  emailUrl,
  calendlyUrl,
  contactLabel = "Contact",
  getInTouch = "Get in Touch",
  contactDescription = "Want to chat? Feel free to reach out",
  viaEmail = "via email"
}: ContactProps) {
  return (
    <div className="space-y-3">
      <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
        {contactLabel}
      </div>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        {getInTouch}
      </h2>
      <div className="mx-auto max-w-[600px] space-y-6">
        <p className="text-muted-foreground text-center text-lg leading-relaxed md:text-xl">
          {contactDescription}{" "}
          <Link
            href={emailUrl}
            className="inline-flex items-center gap-1 text-foreground underline transition-colors hover:no-underline"
          >
            {viaEmail}
          </Link>{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
    </div>
  );
}
