import { useEffect, useState } from "react";
import { getContainerContent } from "../../clients/kontent-client";
import { ContainerContent } from "../../models/container-content";
import { Link, useParams } from "react-router-dom";
import "./SnackContainer.css";
import { Button, Columns, Container, Heading } from "react-bulma-components";
import QRCode from "qrcode";

const SnackContainer = () => {
  const { containerId } = useParams();

  const [code, setCode] = useState("");
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
        <Link to="/">
          <Button>Back to main menu</Button>
        </Link>
        <Heading className="snack-heading">
          #{content?.containerId} - {content?.contentsText}
        </Heading>
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
          <Columns.Column>
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: content?.productDescription ?? "",
                }}
              />
              <p>
                {" "}
                For more information such as the full product description,
                allergies and dietry requirements see the supermarket listing
                here:{" "}
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
              <b>Category:</b> Cereal
            </div>
          </Columns.Column>
          <Columns.Column>
            <div className="formatted-column has-background-primary">
              <b>Location:</b> Kitchen counter top
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
        {code && <img src={code} />}
      </Container>
    </main>
  );
};

export default SnackContainer;
