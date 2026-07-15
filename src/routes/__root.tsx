import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { ScrollToTop } from "@/components/site/ScrollToTop";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-soft px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-soft"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-soft px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-soft"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-white px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BrainWaves Tech — Neurofeedback & Brainwave Analysis Platform in India" },
      { name: "description", content: "India's advanced neurofeedback, brainwave analysis and customized sound therapy ecosystem. Hardware, software and practitioner certification." },
      { name: "author", content: "BrainWaves Tech" },
      { name: "keywords", content: "Neurofeedback in India, Brainwave Analysis, EEG Neurofeedback, Neurofeedback Training, Customized Sound Therapy, Brainwave Technology, Neurofeedback Practitioner Course, Mental Wellness Technology, Brain Mapping, Cognitive Performance Training" },
      { property: "og:title", content: "BrainWaves Tech — Neurofeedback & Brainwave Analysis Platform in India" },
      { property: "og:description", content: "India's advanced neurofeedback, brainwave analysis and customized sound therapy ecosystem. Hardware, software and practitioner certification." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BrainWaves Tech" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BrainWaves Tech — Neurofeedback & Brainwave Analysis Platform in India" },
      { name: "twitter:description", content: "India's advanced neurofeedback, brainwave analysis and customized sound therapy ecosystem. Hardware, software and practitioner certification." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/jniP1INDbGeWUnFtlV1iyCqRoJV2/social-images/social-1779957607589-1661088142199.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/jniP1INDbGeWUnFtlV1iyCqRoJV2/social-images/social-1779957607589-1661088142199.webp" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BrainWaves Tech",
          url: "https://www.brainwavestech.com",
          telephone: "+91-98930-64372",
          areaServed: "IN",
          description: "Neurofeedback, brainwave analysis and customized sound therapy platform.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col overflow-x-hidden pt-16">
        <SiteNavbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <WhatsAppFab />
      </div>
    </QueryClientProvider>
  );
}
