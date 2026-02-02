import {
  createFileRoute,
  Outlet,
  redirect,
  useMatches,
} from "@tanstack/react-router";
import TypesafeI18n, { useI18nContext } from "@/i18n/i18n-react";
import { baseLocale, isLocale } from "@/i18n/i18n-util";
import { loadLocale } from "@/i18n/i18n-util.sync";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const locale = params.locale || baseLocale;
    const isValidLocale = isLocale(locale);

    if (!isValidLocale) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: baseLocale },
      });
    }

    loadLocale(locale);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const matches = useMatches();

  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? baseLocale;
  const isValidLocale = isLocale(locale);

  if (!isValidLocale) return null;

  return (
    <TypesafeI18n locale={locale}>
      <App />
    </TypesafeI18n>
  );
}

function App() {
  const { LL } = useI18nContext();

  return (
    <div>
      {LL.routes.root.layout()}
      <Outlet />
    </div>
  );
}
