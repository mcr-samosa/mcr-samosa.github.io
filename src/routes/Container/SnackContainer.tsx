import { useEffect, useState } from "react";
import { getContainerContent } from "../../clients/kontent-client";
import { ContainerContent } from "../../models/container-content";
import { Link, useParams } from "react-router-dom";
import "./SnackContainer.css";
import { Button, Columns, Container, Heading } from "react-bulma-components";

const SnackContainer = () => {
  const { containerId } = useParams();

  const [content, setContent] = useState<ContainerContent | null>(null);

  // Demo usage
  useEffect(() => {
    getContainerContent(containerId ?? "").then((content) =>
      setContent(content)
    );
  }, [containerId]);

  return (
    <main>
      <Container>
        <Link to="/">
          <Button>Back to main menu</Button>
        </Link>
        <Heading className="snackHeading">
          #{content?.containerId} - {content?.fullProductName}
        </Heading>
        <a href={content?.supermarketUrl ?? ""}>
          <Button>Supermarket Link</Button>
        </a>
        <Columns>
          <Columns.Column size={4}>
            {content?.imageUrl && (
              <img
                src={content?.imageUrl}
                alt={`Image of ${content?.fullProductName}`}
                className="snackImage"
              />
            )}
          </Columns.Column>
          <Columns.Column>
            <p
              dangerouslySetInnerHTML={{
                __html: content?.productDescription ?? "",
              }}
              className="snack_description"
            />
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
                href={`mailto:Group-ManchesterSnacks@softwire.com?subject=Out of stock notification&body=${content?.fullProductName} is out of stock`}
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
