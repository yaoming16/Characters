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
      <div
        className="flex items-center justify-center p-8"
        style={{ height: "70vh" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading.default")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center p-8"
        style={{ height: "70vh" }}
      >
        <div className="text-center text-red-600">
          <p className="font-bold mb-2">
            {isDictionary
              ? t("loading.errorDictionary")
              : t("loading.errorPracticeSheet")}
          </p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }
  return null;
}

export default Loading;
