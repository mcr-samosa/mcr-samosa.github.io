import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LandingPageContent } from "../../models/landing-page-content";
import {
  getContainerList,
  getLandingPageContent,
} from "../../clients/kontent-client";
import { ContainerListItem } from "../../models/container-list-item";
import { Card, Container, Content, Heading } from "react-bulma-components";

const Home = () => {
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [containerList, setContainerList] = useState<ContainerListItem[]>([]);

  // Demo usage
  useEffect(() => {
    getLandingPageContent().then((content) => setContent(content));
    getContainerList().then((containerList) => setContainerList(containerList));
  }, []);

  return (
    <main>
      <section className="hero pt-3 pb-5 mb-4">
        <Heading className="mb-0">{content?.titleText ?? "Loading..."}</Heading>
        <p>{content?.subtitleText}</p>
      </section>
      <Container>
        <Content
          dangerouslySetInnerHTML={{
            __html: content?.bodyContent ?? "",
          }}
        />
        <nav className="container-list p-4 mb-5">
          {containerList.map((containerListItem) => (
            <Link
              key={containerListItem.containerId}
              to={`/container/${containerListItem.containerId}`}
            >
              <Card className="mb-2">
                <Card.Content>
                  #{containerListItem.containerId} &mdash;{" "}
                  {containerListItem.contentsText}
                </Card.Content>
              </Card>
            </Link>
          ))}
        </nav>
        <Content
          dangerouslySetInnerHTML={{
            __html: content?.footerContent ?? "",
          }}
        />
      </Container>
    </main>
  );
};

export default Home;
