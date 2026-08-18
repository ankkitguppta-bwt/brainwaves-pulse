import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import footerContent from "../../../Docs/Markdown files/FOOTER CONTENT.md?raw";

const markers = [
  ["Disclaimer", "# **DISCLAIMER:**"],
  ["Terms & Conditions", "# **TERMS AND CONDITIONS:**"],
  ["Privacy Policy", "**PRIVACY POLICY:**"],
  ["Refund & Return Policy", "# **REFUND AND RETURNS POLICY:**"],
  ["Shipping Policy", "# **SHIPPING POLICY:**"],
] as const;

function policySource(title: string) {
  const index = markers.findIndex(([name]) => name === title);
  if (index < 0) return "";
  const startMarker = markers[index][1];
  const start = footerContent.indexOf(startMarker) + startMarker.length;
  const nextMarker = markers[index + 1]?.[1];
  const end = nextMarker ? footerContent.indexOf(nextMarker, start) : footerContent.length;
  return footerContent.slice(start, end).trim();
}

function inline(text: string): ReactNode[] {
  const clean = text
    .replace(/<\/?u>/g, "")
    .replace(
      /Contact Support\s+\*\*\(link it to the contact us page\)\*\*/gi,
      "[[CONTACT_SUPPORT]]",
    );
  const pattern =
    /(\[\[CONTACT_SUPPORT\]\]|\*\*[^*]+\*\*|_[^_]+_|contact@brainwavestech\.com|https?:\/\/\S+|www\.brainwavestech\.com\/patents\/?)/g;
  return clean
    .split(pattern)
    .filter(Boolean)
    .map((part, index) => {
      if (part === "[[CONTACT_SUPPORT]]")
        return (
          <Link key={index} to="/contact" className="font-medium text-teal underline">
            Contact Support
          </Link>
        );
      if (part.startsWith("**") && part.endsWith("**"))
        return (
          <strong key={index} className="font-semibold text-navy">
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith("_") && part.endsWith("_"))
        return <em key={index}>{part.slice(1, -1)}</em>;
      if (part === "contact@brainwavestech.com")
        return (
          <a
            key={index}
            href="mailto:contact@brainwavestech.com"
            className="font-medium text-teal underline"
          >
            {part}
          </a>
        );
      if (/^(https?:\/\/|www\.)/.test(part)) {
        const href = part.startsWith("http") ? part : `https://${part}`;
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-teal underline"
          >
            {part}
          </a>
        );
      }
      return <Fragment key={index}>{part}</Fragment>;
    });
}

export function LegalPolicyContent({ title }: { title: string }) {
  const blocks = policySource(title)
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean);
  return (
    <div className="space-y-4 text-left text-sm leading-7 text-slate-600">
      {blocks.map((block, index) => {
        const heading = block.match(/^#{1,6}\s+(.*)$/s);
        if (heading)
          return (
            <h3 key={index} className="pt-3 font-display text-lg font-bold text-navy">
              {inline(heading[1].replace(/^\*\*|\*\*$/g, ""))}
            </h3>
          );
        if (block.startsWith("- "))
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block.split(/\r?\n/).map((line) => (
                <li key={line}>{inline(line.replace(/^-\s*/, ""))}</li>
              ))}
            </ul>
          );
        return <p key={index}>{inline(block.replace(/\r?\n/g, " "))}</p>;
      })}
    </div>
  );
}
