import { useTranslation } from "react-i18next";

interface loadingError {
  loading: boolean;
  error: Error | null;
  isDictionary?: boolean;
}

function Loading({ loading, error, isDictionary = false }: loadingError) {
  const { t } = useTranslation("global");

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-8">
        <div className="max-w-sm rounded-3xl border border-slate-200 bg-white/90 px-8 py-10 text-center shadow-sm">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-slate-900"></div>
          <p className="text-sm font-medium text-slate-600">{t("loading.default")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-8">
        <div className="max-w-sm rounded-3xl border border-rose-200 bg-white/90 px-8 py-10 text-center shadow-sm">
          <p className="mb-2 font-bold text-rose-600">
            {isDictionary
              ? t("loading.errorDictionary")
              : t("loading.errorPracticeSheet")}
          </p>
          <p className="text-sm text-slate-600">{error.message}</p>
        </div>
      </div>
    );
  }
  return null;
}

export default Loading;
