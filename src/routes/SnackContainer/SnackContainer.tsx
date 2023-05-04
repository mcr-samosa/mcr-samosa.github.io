import React, { useEffect, useRef, useState } from "react";
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
import { richTextHasContent } from "../../utils/helpers";

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

interface MetadataItemProps {
  background: string;
  children: React.ReactNode;
}

const MetadataItem: React.FC<MetadataItemProps> = ({
  background,
  children,
}) => (
  <div className={`formatted-column has-background-${background}`}>
    <div>{children}</div>
  </div>
);

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

  const hasProductDescription = richTextHasContent(
    content?.productDescription ?? ""
  );

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
            className="qr-button is-pulled-right"
            onClick={() => {
              setCodeVisible(!codeVisible);
            }}
          >
            {codeVisible ? "Hide" : "Show"} QR code
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
        {content &&
        !content.imageUrl?.length &&
        !hasProductDescription &&
        !content.supermarketUrl?.length ? (
          <p className="has-text-centered mb-4">
            We don&apos;t have a description for this item! Check it out
            in-person at snack container #{content.containerId}
          </p>
        ) : (
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
                {hasProductDescription && (
                  <Content
                    dangerouslySetInnerHTML={{
                      __html: content?.productDescription ?? "",
                    }}
                  />
                )}
                {content?.supermarketUrl && (
                  <div>
                    <p>
                      For more information such as the full product description,
                      allergies and dietary requirements see the full supplier
                      listing here:
                    </p>
                    <div className="supermarket-link">
                      <a
                        href={content?.supermarketUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content?.supermarketUrl ?? "loading..."}
                      </a>
                    </div>
                  </div>
                )}
                {!content?.supermarketUrl && !hasProductDescription && (
                  <div>
                    {content ? (
                      <p>
                        We don&apos;t have a description for this item! Check it
                        out in-person at snack container #{content.containerId}
                      </p>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                )}
              </div>
            </Columns.Column>
          </Columns>
        )}
      </Container>
      <hr className="mt-0" />
      <Columns className="mb-2">
        <Columns.Column>
          <MetadataItem background={"primary"}>
            <b>Category:</b> {content?.snackTypeName}
          </MetadataItem>
        </Columns.Column>
        <Columns.Column>
          <MetadataItem background={"primary"}>
            <b>Location:</b> {content?.containerLocation}
          </MetadataItem>
        </Columns.Column>
        <Columns.Column>
          <MetadataItem background={"warning"}>
            <b>Out of stock? </b>
            {content?.outOfStockAlert ? (
              <p>
                {" "}
                First check the cupboards under the kitchen island to see if
                there&lsquo;s backup stock. If you can&lsquo;t find any,
                <a
                  href={`mailto:Group-ManchesterSnacks@softwire.com?subject=Out of stock notification&body=${content?.contentsText} is out of stock 😭`}
                >
                  <b>&nbsp;let us know.</b>
                </a>{" "}
              </p>
            ) : (
              <p>
                First check the cupboards under the kitchen island to see if
                there&lsquo;s backup stock. If not, we get this product on a
                recurring basis (usually near the start of a month) and
                don&lsquo;t order replacements in the meantime, so no need to
                let us know.
              </p>
            )}
          </MetadataItem>
        </Columns.Column>
      </Columns>
    </main>
  );
};

export default SnackContainer;
