import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Climate Carbon Alliance India";
    const desc = searchParams.get("desc") || "High-Integrity Carbon Markets & Durable Removals";
    const source = searchParams.get("source") || "CCAI Secretariat";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#1e2230",
            padding: "80px",
            fontFamily: "sans-serif",
            backgroundImage: "radial-gradient(circle at 80% 20%, #0f7b5c 0%, #1e2230 70%)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Tagline */}
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#18a87a",
                textTransform: "uppercase",
                letterSpacing: "4px",
                marginBottom: "30px",
              }}
            >
              {source}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                color: "#eaeef5",
                lineHeight: 1.25,
                maxWidth: "900px",
                marginBottom: "20px",
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "24px",
                color: "#94a3b8",
                lineHeight: 1.5,
                maxWidth: "800px",
              }}
            >
              {desc}
            </div>
          </div>

          {/* Logo bottom mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#0f7b5c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              C
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "18px", color: "#eaeef5", fontWeight: "bold" }}>
                CCAI
              </span>
              <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                Climate Carbon Alliance India
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
