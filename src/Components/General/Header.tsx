import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation("global");
  function handleChangeLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between p-4 border-b border-gray-300">
        <button
          type="button"
          onClick={() =>
            handleChangeLanguage(i18n.language === "es" ? "en" : "es")
          }
          className="rounded px-2 py-1 text-mygreen transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-mygreen focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          aria-label={t("aria.navBar.switchLanguage")}
        >
          {i18n.language === "es" ? "EN" : "ES"}
        </button>
        <ul className="flex flex-wrap items-center justify-between gap-4">
          <li className="text-lg font-semibold ">
            <Link to="/">{t("header.practice")}</Link>
          </li>
          <li className="text-lg font-semibold ">
            <Link to="/dictionary">{t("header.dictionary")}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
