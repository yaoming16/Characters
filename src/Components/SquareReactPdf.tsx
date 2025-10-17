import { Text, View, Image } from "@react-pdf/renderer";

interface SquareReactPdfType {
  character: string;
  firstCharacter: boolean;
  font: string;
  columnSpacing: number;
  gridName: string;
  widthInPx: number;
  letterOpacity: number;
}

function SquareReactPdf({
  character = "",
  firstCharacter = false,
  font,
  columnSpacing,
  gridName,
  widthInPx,
  letterOpacity,
}: SquareReactPdfType) {
  return (
    <div
      style={{
        marginRight: columnSpacing + "px",
        width: widthInPx + "px",
        height: widthInPx + "px",
      }}
    >
      <Image
        /* className={`absolute opacity-50`} */
        src={gridName}
        style={{
          width: widthInPx + "px",
          height: widthInPx + "px",
        }}
      ></Image>
      <View
        /* className="flex relative " */
        style={{
          /* fontFamily: font, */
          width: widthInPx + "px",
          height: widthInPx + "px",
        }}
      >
        <Text
          style={{
            fontSize: Math.floor(widthInPx * 0.7) + "px",
            /* fontFamily: font, */
            fontWeight: firstCharacter ? "400" : "",
            color: firstCharacter
              ? "#000000"
              : `rgba(200, 200, 200, ${letterOpacity / 100})`,
          }}
          /* className={"leading-none ml-auto mr-auto mt-0 mb-0"} */
        >
          {character}
        </Text>
      </View>
    </div>
  );
}

export default SquareReactPdf;
