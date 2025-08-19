"use client"

import { useState } from "react"
import Navbar from "../../components/navbar/navbar.jsx"
import Footer from "../../components/Footer/footer.jsx"
import "./article.css"

const Article = () => {
  const [activeTab, setActiveTab] = useState("DESCRIPTION")

  return (
    <div className="article-page">
      <Navbar />

      <div className="article-container">
        <div className="product-section">
          {/* Left sidebar with small images */}
          <div className="product-thumbnails">
            <img src="/ring.png" alt="Ring thumbnail 1" className="thumbnail" />
            <img src="/ring.png" alt="Ring thumbnail 2" className="thumbnail" />
            <img src="/ring.png" alt="Ring thumbnail 3" className="thumbnail" />
            <img src="/ring.png" alt="Ring thumbnail 4" className="thumbnail" />
          </div>

          {/* Main product image */}
          <div className="main-product-image">
            <img
              src="ring.png"
              alt="Golden Ring"
            />
          </div>

          {/* Product info */}
          <div className="product-info">
            <h1 className="product-title">Lorem ipsum</h1>
            <p className="product-description">
              consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi
            </p>
            <p className="product-ref">
              <span className="ref-label">Ref :</span> 645546 VT67865 668768
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
            <button className={`tab ${activeTab === "DESIGN" ? "active" : ""}`} onClick={() => setActiveTab("DESIGN")}>
              DESIGN
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "DESCRIPTION" && (
              <div className="description-content">
                <h3>PRODUIT</h3>
                <p>
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                  volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl
                  ut aliquip ex ea commodo
                </p>
                <p>
                  consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis
                  nisl ut aliquip ex ea commodo
                </p>
                <p>
                  consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis
                  nisl ut aliquip
                </p>
              </div>
            )}
            {activeTab === "INFORMATION" && (
              <div className="information-content">
                <h3>INFORMATIONS COMPLÉMENTAIRES</h3>
                <p>Informations détaillées sur le produit...</p>
              </div>
            )}
            {activeTab === "DESIGN" && (
              <div className="design-content">
                <h3>DESIGN</h3>
                <p>Informations sur le design du produit...</p>
              </div>
            )}
          </div>
        </div>

        {/* Design illustration */}
        <div className="design-illustration">
          <img src="/des_article.png" alt="Product design illustration" />
        </div>

        {/* Final product description */}
        <div className="final-description">
          <p>
            <strong>L'Onctueuse "Caramel & Noix"</strong> - Une explosion de gourmandise avec la fondante pâte de noix,
            la délicieuse sauce caramel beurre salé et le chocolat Caramélia 36% de Valrhona, un mariage parfait de
            chocolat et de caramel, sur une base croquante de pâte feuilletée
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Article
