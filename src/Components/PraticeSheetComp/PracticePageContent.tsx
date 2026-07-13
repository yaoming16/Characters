import ReactPDFViewer, { PracticeSheetPdfDocument } from "../PraticeSheetComp/ReactPDFViewer";
import Preview from "../PraticeSheetComp/Preview";
import OptionsForm from "../PraticeSheetComp/OptionsForm";
import Toggle from "../Form/Toggle";
import DownloadButton from "../Form/DownloadButton";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { useTranslation } from "react-i18next";
import { usePracticeSheet } from "../../context/PracticePageContext";
import { useCharacterData } from "../../hooks/useCharacterData";
import { pdf } from "@react-pdf/renderer";

import {changeStateIfNoWarnings, calculateDivWidth, calculateNewWidth} from "../../Aux/practiceSheetFunctions";
import { useEffect } from "react";

function PracticePageContent({}) {
  const {t} = useTranslation("global"); 
  const ps = usePracticeSheet();

  const charactersInfoResponse = useCharacterData();
  
  const {
    numberMarginTop,
    numberMarginRight,
    numberMarginBottom,
    numberMarginLeft,
    changeToPreviewer,
    showPreviewer,
    setShowPreviewer,
    setchangeToPreviewer,
    setOpenModal,
    openModal,
    characters,
  } = ps; 

  useEffect(() => {
    localStorage.setItem("practiceSheetCharacters", characters);
  }, [characters]);

    const warningArr = [
    ps.warningNumberOfSquaresPerRow,
    ps.warningNumberOfRowsPerCharacter,
    ps.warningNumberPracticeSquares,
    ps.warningNumberMarginLeft,
    ps.warningNumberMarginRight,
    ps.warningNumberMarginTop,
    ps.warningNumberMarginBottom,
    ps.warningNumberRowSpacing,
    ps.warningNumberColumnSpacing,
    ps.warningLetterOpacity,
    ps.warningNumberOfPracticeLines,
    ps.warningTitleFontSize,
    ];

  // Style for the margins previewer
  const marginStylePreview = {
    margin: `${numberMarginTop}px ${numberMarginRight}px ${numberMarginBottom}px ${numberMarginLeft}px`,
  };

  const showOnlyPreview = !showPreviewer && changeToPreviewer;
  const showBothPanels = showPreviewer && !changeToPreviewer;

  const isMobileViewport = () =>
    window.matchMedia("(max-width: 1024px)").matches || window.innerWidth < 1024;

  const triggerPdfDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "practice-sheet.pdf";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const openPdfInNewTab = async () => {
    const tab = window.open("", "_blank");

    try {
      const blob = await pdf(
        <PracticeSheetPdfDocument
          charactersInfoResponse={charactersInfoResponse}
          widthOfTheSquaresInPx={calculateNewWidth(595, ps)}
          ps={ps}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);

      if (!tab || tab.closed) {
        triggerPdfDownload(url);
        URL.revokeObjectURL(url);
        return;
      }

      tab.location.replace(url);
      try {
        tab.opener = null;
      } catch {
        // Some browsers do not allow mutating opener on the returned window.
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (error) {
      if (tab && !tab.closed) {
        tab.close();
      }
      console.error("Failed to generate PDF for download.", error);
    }
  };

  const handleDownloadClick = () => {
    if (warningArr.some((val) => val === true)) {
      changeStateIfNoWarnings(warningArr, setOpenModal);
      return;
    }

    if (isMobileViewport()) {
      void openPdfInNewTab();
      return;
    }

    setOpenModal(true);
  };

  return (
      <>
        <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
              <div className="flex flex-col gap-5 border-b border-slate-200 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    {t("main.heroKicker")}
                  </p>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-[KaiTi]">
                    {t("main.title")}
                  </h1>
                  <p className="text-sm leading-6 text-slate-600 sm:text-base">
                    {t("main.heroDescription")}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Toggle
                    checked={showPreviewer}
                    label={t("main.switchView.showPreviewer")}
                    onChange={() => {
                      setShowPreviewer(!showPreviewer);
                      if (changeToPreviewer) {
                        setchangeToPreviewer(false);
                      }
                    }}
                  />
                  <Toggle
                    checked={changeToPreviewer}
                    label={
                      changeToPreviewer
                        ? t("main.switchView.preview")
                        : t("main.switchView.options")
                    }
                    onChange={() => {
                      setchangeToPreviewer(!changeToPreviewer);
                    }}
                    className={`${showPreviewer ? "!hidden " : ""}`}
                  />
                </div>
              </div>
            </section>

            <div
              className={`grid min-w-0 gap-6 xl:gap-8 ${
                showBothPanels
                  ? "lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] lg:items-start"
                  : "lg:grid-cols-1 lg:justify-items-center"
              }`}
            >
              <section
                className={`min-w-0 w-full rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6 ${
                  showOnlyPreview
                    ? "hidden"
                    : showBothPanels
                      ? "lg:sticky lg:top-6"
                      : "max-w-5xl lg:sticky lg:top-6"
                }`}
              >
                <div className={`${changeToPreviewer ? "hidden" : ""}`}>
                  <OptionsForm
                    className=""
                    charactersInfoResponse={charactersInfoResponse}
                  ></OptionsForm>
                </div>

                {/* Download button that only appears when the previewer is shown or when we are in changeToPreviewer mode and the options form is hidden */}
                <DownloadButton
                  onClick={handleDownloadClick}
                  warningArr={warningArr}
                  className={`${changeToPreviewer ? "hidden" : ""}`}
                />
              </section>

              <section
                className={`min-w-0 w-full rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6 ${
                  showPreviewer ? "" : showOnlyPreview ? "max-w-5xl" : "hidden"
                } ${showOnlyPreview ? "lg:sticky lg:top-6" : ""}`}
                id="previewer-container"
              >
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                      {t("main.previewTitle")}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {t("main.previewDescription")}
                    </p>
                  </div>
                </div>

                <div
                  style={marginStylePreview}
                  id="previewer-div"
                  className="min-w-0 overflow-x-auto"
                >
                  {/* We need to check if every warning is false to know if the previewer should be shown or not */}
                  {warningArr.every((val) => val === false) ? (
                    <div className="w-full max-w-full min-w-0">
                      <Preview
                        id={"previewer"}
                        charactersInfoResponse={charactersInfoResponse}
                      ></Preview>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </section>

              {/* Download button that only appears when the previewer is not shown */}
              <DownloadButton
                onClick={handleDownloadClick}
                warningArr={warningArr}
                className={`${showPreviewer || !changeToPreviewer ? "hidden" : ""}`}
              />
            </div>
          </div>
        </div>
  
        {/* Modal for preview */}
        <Modal
          show={openModal}
          size="5xl"
          position="center"
          dismissible
          onClose={() => {
            setOpenModal(false);
            // When modal opened, resizing was stoped, so we need to recalculate it in case user changed screen width
            calculateDivWidth(ps);
          }}
          className="!bg-black/70"
        >
          <ModalHeader />
          <ModalBody>
            <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg p-5">
              <ReactPDFViewer
                id={"previewer"}
                widthOfTheSquaresInPx={calculateNewWidth(595, ps)}
                charactersInfoResponse={charactersInfoResponse}
              ></ReactPDFViewer>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
}

export default PracticePageContent;