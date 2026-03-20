import AppCardAnimated from "@/components/app-card-animated";

export default function ProductMockup() {
  return (
    <div style={{
      width: "min(480px, 100%)",
      borderRadius: "14px",
      overflow: "hidden",
      boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)",
    }}>
      {/* Browser chrome */}
      <div style={{
        background: "#060F1A",
        padding: "9px 14px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {(["#555","#555","#555"] as const).map((c, i) => (
          <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
        ))}
        <div style={{
          flex: 1, marginLeft: 10,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 4, height: 20,
          display: "flex", alignItems: "center", paddingLeft: 10,
        }}>
          <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
            baindly.com/en/dashboard
          </span>
        </div>
      </div>

      {/* Dashboard UI */}
      <div style={{ background: "#0F2337", padding: "16px 18px 18px" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 14, paddingBottom: 12,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{ fontSize: "0.85rem", color: "white", fontFamily: "var(--font-dm-serif)" }}>
            My Documents
          </span>
          <span style={{
            fontSize: "0.6rem", background: "#E67E22",
            color: "white", padding: "5px 11px",
            borderRadius: 5, fontWeight: 600,
          }}>+ Upload</span>
        </div>

        {/* 2 mini document cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {/* Urgent card */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(231,76,60,0.3)",
            borderRadius: 8, padding: "10px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <span style={{ fontSize: "0.55rem", color: "#F5A623", fontFamily: "monospace", textTransform: "uppercase" }}>Legal</span>
              <span style={{ fontSize: "0.48rem", background: "rgba(231,76,60,0.15)", color: "#E74C3C", padding: "1px 5px", borderRadius: 10 }}>urgent</span>
            </div>
            <p style={{ fontSize: "0.66rem", color: "white", fontWeight: 500, lineHeight: 1.3, marginBottom: 7 }}>
              Rental Agreement<br />2024.pdf
            </p>
            <div style={{ fontSize: "0.56rem", color: "#E74C3C", fontFamily: "monospace" }}>⚠ Due in 12 days</div>
          </div>

          {/* Ready card */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8, padding: "10px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <span style={{ fontSize: "0.55rem", color: "#4A8AAA", fontFamily: "monospace", textTransform: "uppercase" }}>Insurance</span>
              <span style={{ fontSize: "0.48rem", background: "rgba(39,174,96,0.15)", color: "#4ADE80", padding: "1px 5px", borderRadius: 10 }}>ready</span>
            </div>
            <p style={{ fontSize: "0.66rem", color: "white", fontWeight: 500, lineHeight: 1.3, marginBottom: 7 }}>
              Health Insurance<br />Policy.pdf
            </p>
            <div style={{ fontSize: "0.56rem", color: "#6A90AA", fontFamily: "monospace" }}>Renewal: Jan 2026</div>
          </div>
        </div>

        {/* Animated AI card */}
        <AppCardAnimated />
      </div>
    </div>
  );
}
