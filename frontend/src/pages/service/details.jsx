// Details.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/Footer/footer.jsx";
import "./details.css";
import axios from "axios";

export default function Details() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("DESCRIPTION");
  const [artifact, setArtifact] = useState(null);
  const [mainIndex, setMainIndex] = useState(0);
  const serverUrl = "http://localhost:3000";

  const getImageUrl = (p) => {
    if (!p) return undefined;
    return typeof p === "string" && p.startsWith("http") ? p : `${serverUrl}/${p}`;
  };

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    axios
      .get(`${serverUrl}/api/artifacts/get/${id}`)
      .then((res) => {
        if (cancelled) return;
        setArtifact(res.data);
        setMainIndex(0);
      })
      .catch((err) => {
        console.error("Erreur fetching artifact:", err);
        setArtifact(null);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const thumbnails = Array.isArray(artifact?.pictures) ? artifact.pictures : [];

  const mainImageSrc = artifact
    ? thumbnails.length > 0
      ? getImageUrl(thumbnails[mainIndex] ?? thumbnails[0])
      : artifact.banner
      ? getImageUrl(artifact.banner)
      : undefined
    : undefined;

  return (
    <div className="article-page">
      <Navbar />

      <main className="article-container">
        <section className="card product-section">
          <aside className="product-thumbnails" aria-label="Product thumbnails">
            {thumbnails.length > 0 ? (
              thumbnails.map((p, idx) => (
                <button
                  key={idx}
                  className={`thumbnail-btn ${idx === mainIndex ? "selected" : ""}`}
                  onClick={() => setMainIndex(idx)}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img src={getImageUrl(p)} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))
            ) : (
              <div className="thumbnail-placeholder">No images</div>
            )}
          </aside>

          <figure className="main-product-image" aria-label="Main product image">
            {mainImageSrc ? (
              <img src={mainImageSrc} alt={artifact?.title ?? "Artifact"} />
            ) : (
              <div className="image-fallback">No image available</div>
            )}
          </figure>

          <aside className="product-info">
            <h1 className="product-title">{artifact?.title || "ARTIFACT TITLE"}</h1>
            <p className="product-sub">{artifact?.subDescription || "ARTIFACT SUBDESCRIPTION"}</p>

            <div className="meta">
              <p className="product-ref">
                <span className="ref-label">Ref :</span> {artifact?._id || "ARTIFACT_ID"}
              </p>
            </div>
          </aside>
        </section>

        <section className="card tabs-section">
          <div className="tabs-header">
            {["DESCRIPTION", "INFORMATION", "DESIGN"].map((t) => (
              <button
                key={t}
                className={`tab ${activeTab === t ? "active" : ""}`}
                onClick={() => setActiveTab(t)}
                aria-pressed={activeTab === t}
                type="button"
              >
                {t === "INFORMATION" ? "INFORMATION COMPLÉMENTAIRES" : t}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === "DESCRIPTION" && (
              <div className="description-content">
                <p>{artifact?.description || "ARTIFACT DESCRIPTION"}</p>
              </div>
            )}

            {activeTab === "INFORMATION" && (
              <div className="information-content">
                <p>{artifact?.information || "-"}</p>
              </div>
            )}

            {activeTab === "DESIGN" && (
              <div className="design-content">
                <p>{artifact?.design || "-"}</p>
              </div>
            )}
          </div>
        </section>

        <section className="design-illustration card">
          {artifact?.banner ? (
            <img src={getImageUrl(artifact.banner)} alt="Product design illustration" />
          ) : (
            <div className="image-fallback">No banner</div>
          )}
        </section>

        <section className="final-description card">
          <h2>
            <strong>{artifact?.title ?? "Title"}</strong> {artifact?.avis}
          </h2>
        </section>
      </main>

      <Footer />
    </div>
  );
}

