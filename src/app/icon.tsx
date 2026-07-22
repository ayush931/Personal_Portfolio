import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 14,
          background: "#09090B",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5EEAD4",
          borderRadius: "6px",
          border: "1px solid #24242C",
          fontFamily: "monospace",
          fontWeight: "bold",
          position: "relative",
        }}
      >
        &gt;_
        <div
          style={{
            position: "absolute",
            top: 3,
            right: 3,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#00FF9C",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
