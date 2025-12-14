import { useEffect, useState } from "react";

function App() {
  const [sweets, setSweets] = useState([]);
  const [order, setOrder] = useState([]);

  const fetchSweets = async () => {
    const res = await fetch("http://localhost:4000/api/sweets");
    const data = await res.json();
    setSweets(data);
  };

  const addToOrder = async (sweet) => {
    await fetch(`http://localhost:4000/api/sweets/${sweet.id}/purchase`, {
      method: "POST",
    });

    setOrder((prev) => [...prev, sweet]);
    fetchSweets();
  };

  const totalAmount = order.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px", padding: "48px" }}>
        {/* HEADER */}
        <header style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "2.4rem", marginBottom: "6px" }}>
            🍬 Sweet Shop
          </h1>
          <p style={{ color: "#fbbf24", fontWeight: "600" }}>
            crafted by <span style={{ color: "#ffffff" }}>Jiya Bhagwani</span>
          </p>
        </header>

        {/* INCUBYTE NOTE */}
        <section
          style={{
            backgroundColor: "#171717",
            border: "1px solid #262626",
            borderRadius: "14px",
            padding: "18px 22px",
            marginBottom: "36px",
            opacity: 0.9,
          }}
        >
          <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
            Built for the <strong>Incubyte Hiring Team</strong> to demonstrate
            clean API design, inventory handling, and thoughtful frontend
            experience — keeping scope minimal and intentional.
          </p>
        </section>

        {/* MAIN CONTENT */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1.4fr", gap: "32px" }}>
          {/* SWEETS GRID */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {sweets.map((sweet) => (
              <div
                key={sweet.id}
                style={{
                  backgroundColor: "#171717",
                  borderRadius: "16px",
                  padding: "22px",
                  border: "1px solid #262626",
                }}
              >
                <h3 style={{ marginBottom: "12px" }}>🍩 {sweet.name}</h3>
                <p style={{ opacity: 0.85 }}>📂 {sweet.category}</p>
                <p style={{ opacity: 0.85 }}>💰 ₹{sweet.price}</p>
                <p style={{ opacity: 0.85 }}>📦 Stock: {sweet.quantity}</p>

                <button
                  onClick={() => addToOrder(sweet)}
                  disabled={sweet.quantity === 0}
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor:
                      sweet.quantity === 0 ? "#3f3f3f" : "#fbbf24",
                    color: "#000",
                    fontWeight: "700",
                    cursor:
                      sweet.quantity === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {sweet.quantity === 0 ? "Out of Stock" : "➕ Add to Order"}
                </button>
              </div>
            ))}
          </section>

          {/* ORDER SUMMARY */}
          <aside
            style={{
              backgroundColor: "#171717",
              border: "1px solid #262626",
              borderRadius: "16px",
              padding: "22px",
              height: "fit-content",
            }}
          >
            <h3 style={{ marginBottom: "14px" }}>🧾 Order Summary</h3>

            {order.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                No items added yet.
              </p>
            ) : (
              <>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {order.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        fontSize: "0.95rem",
                      }}
                    >
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>

                <hr style={{ borderColor: "#262626", margin: "14px 0" }} />

                <p style={{ fontWeight: "700" }}>
                  Total: ₹{totalAmount}
                </p>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;

