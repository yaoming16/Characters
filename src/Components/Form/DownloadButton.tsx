import { useTranslation } from "react-i18next";

interface DownloadButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  warningArr?: boolean[];
}

const DownloadButton = ({
  onClick,
  className = "",
  warningArr = [],
}: DownloadButtonProps) => {
  const { t } = useTranslation("global");

  return (<div className={`w-full ${className}`}>
    <button
      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
      onClick={onClick}
    >
      {t("downloadBtn.name")}
    </button>
    {warningArr.some((val) => val === true) ? (
      <p className="text-center text-sm text-rose-600">
        {t("downloadBtn.error")}
      </p>
    ) : null}
  </div>)
}


export default DownloadButton;
