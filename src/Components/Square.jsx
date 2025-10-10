import PropTypes from "prop-types";

function Square({
  character = "",
  firstCharacter = false,
  font,
  columnSpacing,
  gridName,
  widthInPx,
  letterOpacity,
}) {
  return (
    <div
      className=""
      style={{
        marginRight: columnSpacing + "px",
        width: widthInPx + "px",
        height: widthInPx + "px",
      }}
    >
      <img
        className={`absolute opacity-50`}
        src={gridName}
        alt="grid"
        style={{
          width: widthInPx + "px",
          height: widthInPx + "px",
        }}
      ></img>
      <div className="flex relative " style={{
            fontFamily: font,
            width: widthInPx + "px",
            height: widthInPx + "px",
          }}>
        <p
          style={{
            fontSize: Math.floor(widthInPx * 0.7) + "px",
            fontFamily: font,
            fontWeight: firstCharacter ? "400" : "",
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            color: firstCharacter ? "#000000" : `rgba(200, 200, 200, ${letterOpacity / 100})`,
          }}
          className={
            "leading-none ml-auto mr-auto mt-0 mb-0"
          }
        >
          {character}
        </p>
      </div>
    </div>
  );
}

Square.propTypes = {
  character: PropTypes.string.isRequired,
  firstCharacter: PropTypes.bool,
  font: PropTypes.string.isRequired,
  columnSpacing: PropTypes.string.isRequired,
  gridName: PropTypes.string.isRequired,
  widthInPx: PropTypes.number.isRequired,
  letterOpacity: PropTypes.number.isRequired,
};
export default Square;
