import { useEffect, useState } from "react";
import { getContainerContent } from "../../clients/kontent-client";
import { ContainerContent } from "../../models/container-content";
import { Link, useParams } from "react-router-dom";
import "./SnackContainer.css";
import {
  Button,
  Columns,
  Container,
  Content,
  Heading,
} from "react-bulma-components";
import QRCode from "qrcode";

const SnackContainer = () => {
  const { containerId } = useParams();

  const [code, setCode] = useState("");
  const [codeVisible, setCodeVisible] = useState(false);
  const [content, setContent] = useState<ContainerContent | null>(null);

  // Demo usage
  useEffect(() => {
    getContainerContent(containerId ?? "").then((content) =>
      setContent(content)
    );

    QRCode.toDataURL(window.location.href).then(setCode);
  }, [containerId]);

  return (
    <main>
      <Container>
        <Columns className="is-flex">
          <Columns.Column>
            <Link to="/">
              <Button>Back to main menu</Button>
            </Link>
          </Columns.Column>
          <Columns.Column>
            <Button
              className="is-hidden-mobile is-pulled-right"
              onClick={() => {
                setCodeVisible(!codeVisible);
              }}
            >
              Show QR code
            </Button>
            <div>
              {codeVisible && code && (
                <img src={code} alt="QR code" className="is-pulled-right" />
              )}
            </div>
          </Columns.Column>
        </Columns>
        <Heading className="snack-heading is-vcentered">
          #{content?.containerId} - {content?.contentsText}
        </Heading>
        <Columns className="is-flex">
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
              <p>
                For more information such as the full product description,
                allergies and dietry requirements see the supermarket listing
                here: &nbsp;
                <a href={content?.supermarketUrl}>
                  {content?.supermarketUrl ?? "loading..."}
                </a>
              </p>
            </div>
          </Columns.Column>
        </Columns>
        <Columns>
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
                href={`mailto:Group-ManchesterSnacks@softwire.com?subject=Out of stock notification&body=${content?.contentsText} is out of stock :(`}
              >
                Contact us
              </a>
            </div>
          </Columns.Column>
        </Columns>
      </Container>
    </main>
  );
};

export default SnackContainer;
