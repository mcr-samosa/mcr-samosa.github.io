import { useEffect, useRef, useState } from "react";
import { getContainerContent } from "../../clients/kontent-client";
import { ContainerContent } from "../../models/container-content";
import { Link, useParams } from "react-router-dom";
import "./SnackContainer.css";
import {
  Button,
  Card,
  Columns,
  Container,
  Content,
  Heading,
} from "react-bulma-components";
import QRCodeStyling from "qr-code-styling";

import samosaLogo from "../../assets/samosa1.png";

// Pride maybe?
// gradient: {
//   type: "linear",
//   colorStops: [
//     "red",
//     "orange",
//     "yellow",
//     "green",
//     // "lime",
//     "blue",
//     "purple",
//   ].map((color, idx, arr) => ({
//     color,
//     offset: idx / (arr.length - 1),
//   })),
// },

const qrCode = new QRCodeStyling({
  width: 150,
  height: 150,
  image: samosaLogo,
  dotsOptions: {
    color: "#ff9630",
    type: "classy",
  },
});

const SnackContainer = () => {
  const { containerId } = useParams();

  const [codeVisible, setCodeVisible] = useState(false);
  const [content, setContent] = useState<ContainerContent | null>(null);

  const qrCodeRef = useRef<HTMLDivElement>(null);

  // Demo usage
  useEffect(() => {
    getContainerContent(containerId ?? "").then(setContent);

    qrCode.update({ data: window.location.href });
  }, [containerId]);

  useEffect(() => {
    if (codeVisible && qrCodeRef.current) {
      qrCode.append(qrCodeRef.current ?? undefined);
    }
  }, [codeVisible, qrCodeRef]);

  return (
    <main>
      <Columns className="is-flex">
        <Columns.Column>
          <Link to="/">
            <Button>Back to main menu</Button>
          </Link>
        </Columns.Column>
        <Columns.Column className="is-flex is-justify-content-center is-align-items-center">
          <Heading subtitle>Snack Container #{content?.containerId}</Heading>
        </Columns.Column>
        <Columns.Column className="is-hidden-mobile">
          <a
            href={content?.kontentEditUrl ?? "#"}
            rel="noreferrer"
            className="ml-3 button is-pulled-right"
          >
            Edit Snack ↗
          </a>
          <Button
            className="is-pulled-right"
            onClick={() => {
              setCodeVisible(!codeVisible);
            }}
          >
            Show QR code
          </Button>
          {codeVisible && (
            <Card className="floating-qr" onClick={() => setCodeVisible(false)}>
              <div className="is-flex" ref={qrCodeRef} />
            </Card>
          )}
        </Columns.Column>
      </Columns>
      <hr className="mt-0" />
      <Heading renderAs="h2" className="snack-heading is-vcentered">
        {content?.contentsText}
      </Heading>
      <hr className="mt-0 mb-4" />
      <Container>
        <Columns>
          <Columns.Column size={4}>
            {content?.imageUrl && (
              <img
                src={content?.imageUrl}
                alt={`Image of ${content?.contentsText}`}
                className="snack-image"
              />
            )}
          </Columns.Column>
          <Columns.Column className="is-vcentered">
            <div className="snack-description">
              <Content
                className={`${content?.productDescription ? "pb-4" : ""}`}
                dangerouslySetInnerHTML={{
                  __html: content?.productDescription ?? "",
                }}
              />
              {content?.supermarketUrl && (
                <p>
                  For more information such as the full product description,
                  allergies and dietry requirements see the supermarket listing
                  here: &nbsp;
                  <a href={content?.supermarketUrl}>
                    {content?.supermarketUrl ?? "loading..."}
                  </a>
                </p>
              )}
            </div>
          </Columns.Column>
        </Columns>
      </Container>
      <Columns className="mb-2">
        <Columns.Column>
          <div className="formatted-column has-background-primary	">
            <b>Category:</b> {content?.snackTypeName}
          </div>
        </Columns.Column>
        <Columns.Column>
          <div className="formatted-column has-background-primary">
            <b>Location:</b> {content?.containerLocation}
          </div>
        </Columns.Column>
        <Columns.Column>
          <div className="formatted-column has-background-warning">
            <b>Out of stock? </b>
            <a
              href={`mailto:Group-ManchesterSnacks@softwire.com?subject=Out of stock notification&body=${content?.contentsText} is out of stock 😭`}
            >
              Let us know
            </a>
          </div>
        </Columns.Column>
      </Columns>
    </main>
  );
};

export default SnackContainer;
