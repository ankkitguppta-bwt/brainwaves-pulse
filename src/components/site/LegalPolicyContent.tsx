import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

const policyContent: Record<string, string> = {
  Disclaimer: `Please note that products sold by BRAIN WAVES TECH PVT LTD are intended for research applications and personal use only. They are not intended to be used as medical devices, as defined by Indian law. Our products are not designed or intended for use in the diagnosis or treatment of any disease.`,
  "Terms & Conditions": `The Brain Waves Tech Pvt Ltd applications, software development kit and other software (collectively, the “Software”) enable use of the Brain Waves Tech Pvt Ltd Cloud Service (the “Service”). The Software and Service are intended for use in connection with the BWT 2508 neuroheadset and Insight. Your use of the Software, Service and Website is subject to these Terms of Use.

BY INSTALLING OR USING THE SOFTWARE, SERVICE OR WEBSITE, YOU ACCEPT THESE TERMS OF USE AND AGREE THAT THEY CREATE A LEGALLY BINDING CONTRACT BETWEEN YOU AND BRAIN WAVES TECH PVT LTD. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT INSTALL OR USE THE SOFTWARE, SERVICE OR WEBSITE.

# Privacy Policy
Protecting your privacy is important to BRAIN WAVES TECH PVT LTD. The Privacy Policy describes our collection, use and disclosure of data and information in connection with your use of the Software, Service and Website.

# License and ownership
Subject to compliance with these Terms, BRAIN WAVES TECH PVT LTD grants a limited, nonexclusive, non-transferable, revocable licence to use the Software to access the Service. BRAIN WAVES TECH PVT LTD retains all intellectual-property and proprietary rights in the Software, Service and Website. Reverse engineering, decompiling, modifying, copying, transmitting, publishing or unauthorised use is prohibited. Patents are listed at www.brainwavestech.com/patents/.

# Scan data
You retain ownership of EEG scan data collected by the BWT 2508 device. You grant BRAIN WAVES TECH PVT LTD a non-exclusive, royalty-free licence to use that data to provide the Service, share it with third parties you authorise, create aggregated non-identifiable metrics, and use it for scientific purposes.

# Prohibited uses and termination
You may not use the Service for unlawful or fraudulent purposes, impair the Service, attempt to obtain information not intentionally made available, or access another user’s account or scan data without authorisation. Use by persons under 16 is prohibited. BRAIN WAVES TECH PVT LTD may terminate access at any time.`,
  "Privacy Policy": `# Who we are
Our website address is https://brainwavestech.com. Brain Waves Tech Pvt Ltd manages information responsibly and uses administrative, technical and physical safeguards designed to protect your data.

# Types of information we collect
We may collect contact information, financial account information, EEG data, user-account information, user content, partner information, log data and experiment data. EEG data can include electrical biosignals, monitoring-device outputs, event timing, sensory stimuli, reaction times, self-assessment and cognitive-performance information.

# How we use information
We use Personal Information to provide, secure and improve the Services; process transactions; communicate with users; meet legal obligations; conduct scientific and historical research; and support authorised research programmes. We do not sell Personal Information.

# Your rights
You may request access, correction, erasure, portability, withdrawal of consent, objection or restriction of processing, subject to applicable law and our scientific or historical research retention requirements. Contact us at contact@brainwavestech.com.

# Children and changes
The Services are not intended for people under 16, and we do not knowingly collect their Personal Information. We may update this Privacy Policy from time to time; continued use after an update indicates agreement with the revised policy.

# Contact
Email: contact@brainwavestech.com

Telephone: +91 9893064372

Address: BRAIN WAVES TECH PVT LTD, A-268, New Minal Residency, Near Gate No. 4, Infront of D-mart, Ayodhya By Pass Road, Bhopal, M.P., 462023.`,
  "Refund & Return Policy": `This Warranty and Return Policy outlines the terms for purchases of a BRAIN WAVES TECH neuroheadset and software.

# Software and subscriptions
BRAIN WAVES TECH does not allow returns or refunds for digital download applications. Subscription payments are non-refundable. Annual subscribers may cancel, but no amount is refunded for the remaining subscription period.

# Hardware returns
Hardware purchases have a 7-day return policy from receipt. Returns apply to hardware only, not software or digital downloads. Shipping and handling charges are non-refundable, and a restocking fee of up to 25% may apply. For a defective or Dead on Arrival product, contact [[CONTACT_SUPPORT]] immediately for return authorisation and an RMA number.

# Limited warranty
BRAIN WAVES TECH warrants that the Product will be free from defects in material or workmanship under normal use for 180 calendar days from the shipping date of the original purchase. The warranty excludes damage from accident, abuse, misuse, external causes, leaking batteries, liquid damage, unauthorised servicing or modification, non-conforming accessories, shipment damage, and modified serial numbers.

# Return requirements
- Returns must be sent within 7 days of delivery for a Dead on Arrival product.
- Products must be returned in original condition and packaging with all included parts.
- Include the order number, headset serial number, and clear photos or video of the defective product and shipping packaging.
- An RMA number is required before BRAIN WAVES TECH will accept a return.

# Governing law
This Warranty and Return Policy is governed by the laws of Bhopal, M.P., India.`,
  "Shipping Policy": `# Software
Once payment is received, software is electronically delivered to your BRAIN WAVES TECH account. Access downloads through “My Account” and “Downloads”.

# Delivery information
Payment must be made in full before shipment or delivery. BWT 2508 deliveries are facilitated through HRL Logistics in Bhopal, Madhya Pradesh. Once the headset is shipped, tracking information is sent by email.

# Duties, taxes and tracking
Recipients may be responsible for taxes, duties and fees charged once a shipment reaches its destination. Clearance procedures, courier identification requirements and local regulations may affect delivery timing. Track the shipment with the delivery confirmation number provided after dispatch.

# Cancellations
To cancel an order, contact us within 24 hours of placing it. Cancellations can be processed only before an order has been prepared for dispatch.`,
};

function policySource(title: string) {
  return policyContent[title] ?? "";
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
