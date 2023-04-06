import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@emotion/react";

import "./Card.component.scss";
import { Product } from "../../types";

const theme = createTheme({
  components: {
    MuiCardMedia: {
      styleOverrides: {
        img: {
          maxWidth: "220px",
          objectFit: "scale-down",
          margin: "auto",
          padding: "20px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "16px 16px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          paddingLeft: "8px",
        },
        button: {
          paddingLeft: "16px",
        },
      },
    },
  },
});

export default function MediaCard({
  images,
  title,
  price,
  description,
  rating,
}: Product) {
  const pricFormated = price.toFixed(2);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            height: 500,
            display: "flex",
            width: { sm: "80%", md: "40%", lg: 400 },
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <CardMedia
              component="img"
              height="140"
              image={`${images[0]}`}
              alt={`${title}`}
              sx={{ height: 150 }}
            />

            <CardContent
              sx={{
                display: "flex",
                justifyItems: "end",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ justifySelf: "flex-end", fontSize: "20px" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {title}
              </Typography>
              <Typography
                sx={{ justifySelf: "flex-end" }}
                gutterBottom
                variant="subtitle2"
                component="div"
              >
                {description}
              </Typography>
              <Typography
                sx={{ justifySelf: "flex-end" }}
                gutterBottom
                variant="subtitle2"
                component="div"
              >
                {Math.floor(rating)}
              </Typography>
            </CardContent>
          </div>
          <div>
            <Typography variant="body2">
              <Button variant="text" color="error">
                {pricFormated} $
              </Button>
            </Typography>
          </div>
        </Card>
      </ThemeProvider>
    </>
  );
}
