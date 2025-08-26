import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import "./artifacts.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/footer";

// Container principal pour chaque carte - Format carré parfait
const ArtifactContainer = styled(Box)({
  width: "200px",
  height: "280px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
});

const ImageContainer = styled(Box)({
  width: "200px",
  height: "200px",
  backgroundColor: "#f5f5f5",
  overflow: "hidden",
  position: "relative",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
});

const TextContainer = styled(Box)({
  width: "200px",
  height: "80px",
  padding: "12px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const ArtifactTitle = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#000",
  lineHeight: "16px",
  marginBottom: "4px",
  height: "16px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textTransform: "none",
});

const ArtifactSubtitle = styled(Typography)({
  fontSize: "12px",
  fontWeight: 300,
  color: "#999",
  lineHeight: "14px",
  height: "14px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textTransform: "none",
});

const SectionTitle = styled(Typography)({
  fontSize: "32px",
  fontWeight: 700,
  color: "#1976d2",
  textAlign: "center",
  marginBottom: "90px",
});

const CarouselContainer = styled(Box)({
  position: "relative",
  maxWidth: "900px",
  margin: "0 auto",
  padding: "0 80px",
  "& .slick-track": {
    display: "flex !important",
    alignItems: "flex-start",
    gap: "24px", // Add gap between slides
  },
  "& .slick-slide": {
    display: "flex !important",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "auto !important",
    width: "auto !important",
  },
  "& .slick-slide > div": {
    width: "200px", // Ensure wrapper maintains card width
  },
});

function ArtifactCard({ artifact }) {
  const serverUrl = "http://localhost:3000";

  const getImageUrl = () => {
    if (artifact.pictures && artifact.pictures.length > 0) {
      const firstPicture = artifact.pictures[0];
      return firstPicture.startsWith("http")
        ? firstPicture
        : `${serverUrl}/${firstPicture}`;
    }

    if (artifact.banner) {
      return artifact.banner.startsWith("http")
        ? artifact.banner
        : `${serverUrl}/${artifact.banner}`;
    }

    return "/default-image.png";
  };

  const formatTitle = (title) => {
    if (!title) return "sit amet";
    return title.toLowerCase();
  };

  const formatDescription = (description) => {
    if (!description) return "consectetur sit";
    return description.toLowerCase();
  };

  return (
    <ArtifactContainer>
      <ImageContainer>
        <StyledImage
          src={getImageUrl()}
          alt={artifact.title || "Artifact"}
          onError={(e) => {
            e.target.src = "/default-image.png";
          }}
        />
      </ImageContainer>
      <TextContainer>
        <ArtifactTitle>{formatTitle(artifact.title)}</ArtifactTitle>
        <ArtifactSubtitle>
          {formatDescription(artifact.subDescription || artifact.description)}
        </ArtifactSubtitle>
      </TextContainer>
    </ArtifactContainer>
  );
}

const MainContainer = styled(Container)({
  marginTop: "120px",
  marginBottom: "60px",
  minHeight: "70vh",
  maxWidth: "1200px",
});

const ArtifactsGrid = styled(Grid)({
  justifyContent: "flex-start",
  gap: "24px",
});

function Arrow(props) {
  const { onClick, direction } = props;
  return (
    <button
      className={`custom-swiper-arrow ${direction}`}
      onClick={onClick}
      aria-label={direction === "next" ? "Suivant" : "Précédent"}
    >
      {direction === "next" ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6L15 12L9 18"
            stroke="#B0B0B0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 6L9 12L15 18"
            stroke="#B0B0B0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default function Artifacts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/artifacts/getall")
      .then((res) => {
        setArtifacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des artifacts:", err);
        setError("Erreur lors du chargement des artifacts");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <CssBaseline />
        <MainContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Chargement des artifacts...
            </Typography>
          </Box>
        </MainContainer>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <CssBaseline />
        <MainContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        </MainContainer>
        <Footer />
      </div>
    );
  }

  // carousel settings: variableWidth so each slide keeps width (200px) and track is flex
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
    variableWidth: true, // important: lets each slide keep its own width
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          variableWidth: true,
          infinite: true,

        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: true,

          variableWidth: true,
        },
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <CssBaseline />
      <MainContainer>
        <Box sx={{ py: 4 }}>
          <Box sx={{ mb: 6 }}>
            <SectionTitle
              sx={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#1976d2",
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              Our Products
            </SectionTitle>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 200px)",
                  sm: "repeat(2, 200px)",
                  md: "repeat(3, 200px)",
                },
                gap: "120px",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              {artifacts.map((artifact, index) => (
                <Link
                  key={artifact._id || artifact.id || index}
                  to={`/details/${artifact._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ArtifactCard artifact={artifact} />
                </Link>
              ))}
            </Box>

            {/* Carrousel - Nos derniers produits */}
            <Box sx={{ mt: 10 }}>
              <SectionTitle
                sx={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#1976d2",
                  textAlign: "center",
                  marginBottom: "40px",
                }}
              >
                Nos derniers produits
              </SectionTitle>
              <CarouselContainer>
                <Slider {...sliderSettings}>
                  {(() => {
                    const getTimestamp = (item) => {
                      if (!item) return 0;
                      if (item.createdAt) {
                        const t = new Date(item.createdAt).getTime();
                        if (!Number.isNaN(t)) return t;
                      }
                      if (
                        item._id &&
                        typeof item._id === "string" &&
                        item._id.length >= 8
                      ) {
                        return parseInt(item._id.substring(0, 8), 16) * 1000;
                      }
                      return 0;
                    };

                    const latestSix = Array.isArray(artifacts)
                      ? artifacts
                          .slice()
                          .sort((a, b) => getTimestamp(b) - getTimestamp(a))
                          .slice(0, 6)
                      : [];

                    return latestSix.map((artifact, index) => (
                      // --- IMPORTANT: give the slide wrapper a fixed width that matches the card (200px).
                      //     This works with variableWidth: true to create a horizontal row.
                      <div
                        key={artifact._id || artifact.id || index}
                        style={{
                          width: 200, // match ArtifactContainer width
                          display: "flex",
                          flexShrink: 0, // Prevent shrinking
                        }}
                      >
                        <Link
                          to={`/details/${artifact._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <ArtifactCard artifact={artifact} />
                        </Link>
                      </div>
                    ));
                  })()}
                </Slider>
              </CarouselContainer>
            </Box>
          </Box>

          {artifacts.length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "40vh",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Aucun artifact disponible pour le moment
              </Typography>
            </Box>
          )}
        </Box>
      </MainContainer>
      <Footer />
    </div>
  );
}