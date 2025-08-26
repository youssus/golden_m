import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/Footer/footer.jsx";
import "./article.css";
import axios from "axios";

export default function details() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("DESCRIPTION");
  const [artifact, setArtifact] = useState(null);
  const serverUrl = "http://localhost:3000";
  const getImageUrl = (p) => {
    if (!p) return;
    return p.startsWith("http") ? p : `${serverUrl}/${p}`;
  };

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${serverUrl}/api/artifacts/get/${id}`)
      .then((res) => {
        setArtifact(res.data);
      })
      .catch((err) => {
        console.error("Erreur fetching artifact:", err);
        setArtifact(null);
      });
  }, [id, serverUrl]);

  return (
    <div className="article-page">
      <Navbar />

      <div className="article-container">
        <div className="product-section">
          {/* Left sidebar with small images */}
          <div className="product-thumbnails">
            {Array.isArray(artifact?.pictures) && artifact.pictures.length > 0
              ? artifact.pictures.map((p, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(p)}
                    alt={`Artifact thumbnail ${idx}`}
                    className="thumbnail"
                    name={`ARTIFACT IMAGE [${idx}]`}
                  />
                ))
              : null}
          </div>

          {/* Main product image */}
          <div className="main-product-image" name="ARTIFACT IMAGE [0]">
            <img
              src={
                artifact
                  ? Array.isArray(artifact.pictures) && artifact.pictures.length > 0
                    ? getImageUrl(artifact.pictures[0])
                    : artifact.banner
                    ? getImageUrl(artifact.banner)
                    : undefined
                  : undefined
              }
              alt={artifact?.title || "Golden Ring"}
            />
          </div>

          {/* Product info */}
          <div className="product-info">
            <h1 className="product-title">
              {artifact?.title || "ARTIFACT TITLE"}
            </h1>
            <p className="product-description">
              {artifact?.subDescription || "ARTIFACT SUBDESCRIPTION"}
            </p>
            <p className="product-ref">
              <span className="ref-label">Ref :</span>{" "}
              {artifact?._id || "ARTIFACT_ID"}
            </p>
          </div>
        </div>

        {/* Tabs section */}
        <div className="tabs-section">
          <div className="tabs-header">
            <button
              className={`tab ${activeTab === "DESCRIPTION" ? "active" : ""}`}
              onClick={() => setActiveTab("DESCRIPTION")}
            >
              DESCRIPTION
            </button>
            <button
              className={`tab ${activeTab === "INFORMATION" ? "active" : ""}`}
              onClick={() => setActiveTab("INFORMATION")}
            >
              INFORMATION COMPLÉMENTAIRES
            </button>
            <button
              className={`tab ${activeTab === "DESIGN" ? "active" : ""}`}
              onClick={() => setActiveTab("DESIGN")}
            >
              DESIGN
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "DESCRIPTION" && (
              <div className="description-content">
                <p>{artifact?.description || "ARTIFACT DESCRIPTION"}</p>
              </div>
            )}
            {activeTab === "INFORMATION" && (
              <div className="information-content">
                <h3>ARTIFACT INFORMATIONS</h3>
                <p>{artifact?.information || ""}</p>
              </div>
            )}
            {activeTab === "DESIGN" && (
              <div className="design-content">
                <h3>ARTIFACT DESIGN</h3>
                <p>{artifact?.design || ""}</p> {/* data bind */}
              </div>
            )}
          </div>
        </div>

        {/* Design illustration */}
        <div className="design-illustration">
          <img
            src={artifact?.banner ? getImageUrl(artifact.banner) : undefined}
            alt="Product design illustration"
          />
        </div>
        <div className="final-description">
          <h2>
            <strong>{artifact?.title} </strong> {artifact?.avis}
          </h2>
        </div>
      </div>

      <Footer />
    </div>
  );
}
