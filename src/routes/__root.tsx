import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import "@/styles/globals.css";
import { Sidebar } from "@/components/layout/sidebar";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "CRM 系统 - syncMind" },
      { name: "description", content: "CRM Demo System" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="zh-CN">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Noto Serif SC', 'Playfair Display', system-ui, sans-serif" }}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 md:ml-60">
            <Outlet />
          </main>
        </div>
        <Scripts />
        <NavBridgeScript />
      </body>
    </html>
  );
}

function NavBridgeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function() {
          if (window === window.parent) return;
          var notify = function() {
            window.parent.postMessage({
              type: 'preview-navigation',
              pathname: location.pathname,
              url: location.href
            }, '*');
          };
          notify();
          var origPush = history.pushState;
          var origReplace = history.replaceState;
          history.pushState = function() {
            origPush.apply(this, arguments);
            notify();
          };
          history.replaceState = function() {
            origReplace.apply(this, arguments);
            notify();
          };
          window.addEventListener('popstate', notify);
          window.addEventListener('message', function(e) {
            if (e.data && e.data.type === 'preview-command') {
              if (e.data.command === 'back') history.back();
              if (e.data.command === 'forward') history.forward();
              if (e.data.command === 'navigate') {
                window.location.href = e.data.url;
              }
            }
          });
        })();`,
      }}
    />
  );
}
