function FontTester({ font }) {
  const testCharacter = "欢";

  // Function to check if a font is loaded
  const checkFontLoaded = (fontFamily) => {
    if (document.fonts && document.fonts.check) {
      return document.fonts.check(`16px ${fontFamily}`);
    }
    return "Unknown";
  };

  const fontList = font.split(",").map((f) => f.trim().replace(/"/g, ""));

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded">
      <h3 className="font-bold mb-2">Font Debug Info:</h3>
      <p>
        <strong>Current font-family:</strong> {font}
      </p>

      <div className="mt-2">
        <strong>Individual fonts status:</strong>
        <ul className="list-disc ml-4">
          {fontList.map((singleFont, index) => (
            <li key={index}>
              {singleFont}:{" "}
              {checkFontLoaded(singleFont)
                ? "✅ Available"
                : "❌ Not available"}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <strong>
          Font comparison with test character &apos;{testCharacter}&apos;:
        </strong>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {[
            "serif",
            '"Noto Serif SC"',
            '"FangSong"',
            '"KaiTi"',
            '"SimSun"',
          ].map((testFont, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="w-32 text-sm">{testFont}:</span>
              <span
                style={{
                  fontFamily: testFont,
                  fontSize: "24px",
                  fontWeight: "normal",
                }}
                className="border border-gray-200 px-2"
              >
                {testCharacter}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <strong>Current selected font rendering:</strong>
        <div className="text-4xl mt-2" style={{ fontFamily: font }}>
          {testCharacter}迎字体测试
        </div>
      </div>
    </div>
  );
}

export default FontTester;
