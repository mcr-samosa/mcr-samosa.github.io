import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LandingPageContent } from "../../models/landing-page-content";
import {
  getContainerList,
  getLandingPageContent,
} from "../../clients/kontent-client";
import { ContainerListItem } from "../../models/container-list-item";
import { Container, Heading } from "react-bulma-components";

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
      <Container>
        <Heading>{content?.titleText ?? "Loading..."}</Heading>
        <h2>{content?.subtitleText}</h2>
        <div>{content?.bodyContent}</div>
        <nav>
          {containerList.map((containerListItem) => (
            <div key={containerListItem.containerId}>
              <Link to={`/container/${containerListItem.containerId}`}>
                Container {containerListItem.containerId} &mdash;{" "}
                {containerListItem.contentsText}
              </Link>
              <br />
            </div>
          ))}
        </nav>
        <div>{content?.footerContent}</div>
      </Container>
    </main>
  );
};

export default Home;
