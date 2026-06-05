import ReactPDFViewer from "../PraticeSheetComp/ReactPDFViewer";
import Preview from "../PraticeSheetComp/Preview";
import OptionsForm from "../PraticeSheetComp/OptionsForm";
import Toggle from "../Form/Toggle";
import DownloadButton from "../Form/DownloadButton";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { useTranslation } from "react-i18next";
import { usePracticeSheet } from "../../context/PracticePageContext";
import { useCharacterData } from "../../hooks/useCharacterData";

import {changeStateIfNoWarnings, calculateDivWidth, calculateNewWidth} from "../../Aux/practiceSheetFunctions";

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
    openModal
  } = ps; 

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

  return (
      <>
        <div className="border-gray-300 z-10 flex flex-col">
          <h1 className="font-semibold mt-4 ml-auto mr-auto text-4xl font-[KaiTi]">
            {t("main.title")}
          </h1>
          <div
            id="container"
            className={`w-3/4 m-auto mt-10 mb-10 border border-gray-300 p-10 rounded-lg shadow-lg flex ${
              changeToPreviewer ? "flex-col" : "flex-row"
            } `}
          >
            <div
              className={`flex flex-col ${
                showPreviewer ? "max-w-1/3" : "max-w-full  mr-auto ml-auto"
              }`}
            >
              <div className="mb-5 flex flex-row justify-around">
                <Toggle
                  checked={showPreviewer}
                  label={t("main.switchView.showPreviewer")}
                  onChange={() => {
                    setShowPreviewer(!showPreviewer);
                    if (changeToPreviewer) {
                      setchangeToPreviewer(false);
                    }
                  }}
                  className="mr-5"
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
              <div className={`${changeToPreviewer ? "hidden" : ""}`}>
                <OptionsForm
                  className=""
                  charactersInfoResponse={charactersInfoResponse}
                ></OptionsForm>
              </div>
              {/* Download button that only appears when the previewer is shown or when we are in changeToPreviewer mode and the options form is hidden */}
              <DownloadButton
                onClick={() => {
                  changeStateIfNoWarnings(warningArr, setOpenModal);
                }}
                warningArr={warningArr}
                className={`${changeToPreviewer ? "hidden" : ""}`}
              />
            </div>
  
            <div
              className={`ml-10  w-2/3 rounded-lg shadow-lg border 
                border-gray-300 $
                 ${showPreviewer ? "" : changeToPreviewer ? "" : "hidden"} 
                ${changeToPreviewer ? "mr-auto ml-auto" : ""}`}
              id="previewer-container"
            >
              <div style={marginStylePreview} id="previewer-div">
                {/* We need to check if every warning is false to know if the previewer should be shown or not */}
                {warningArr.every((val) => val === false) ? (
                  <Preview
                    id={"previewer"}
                    charactersInfoResponse={charactersInfoResponse}
                  ></Preview>
                ) : (
                  ""
                )}
              </div>
            </div>
  
            {/* Download button that only appears when the previewer is not shown */}
            <DownloadButton
              onClick={() => {
                changeStateIfNoWarnings(warningArr, setOpenModal);
              }}
              warningArr={warningArr}
              className={`${showPreviewer || !changeToPreviewer ? "hidden" : ""}`}
            />
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