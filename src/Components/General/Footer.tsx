import {useTranslation} from "react-i18next";

function Footer() {
  const { t } = useTranslation("global");

  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm mt-2">
        {t("footer.createdBy")} <a href="https://www.pabloperezweb.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-all duration-300 underline">Pablo Pérez</a>.
      </p>
      <p className="text-sm mt-2">
        {t("footer.sourcedFrom")} <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-all duration-300 underline">placeHolder</a>.
      </p>
    </footer>
  )
}

export default Footer;