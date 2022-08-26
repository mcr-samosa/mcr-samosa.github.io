import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LandingPageContent } from "../../models/landing-page-content";
import {
  getContainerList,
  getLandingPageContent,
  getWeeklyProductsContent,
} from "../../clients/kontent-client";
import { ContainerListItem } from "../../models/container-list-item";
import { Card, Container, Content } from "react-bulma-components";
import "./Home.css";
import { logos } from "../../utils/logos";
import { WeeklyProductsContent } from "../../models/weekly-products-content";

const randomLogoIdx = (previous?: number): number => {
  const newIdx = Math.floor(Math.random() * logos.length);

  return newIdx === previous ? randomLogoIdx(previous) : newIdx;
};

const Home = () => {
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [weeklyProducts, setWeeklyProducts] =
    useState<WeeklyProductsContent | null>(null);
  const [containerList, setContainerList] = useState<ContainerListItem[]>([]);
  const [samosaLogoIdx, setSamosaLogoIdx] = useState(randomLogoIdx());

  useEffect(() => {
    getLandingPageContent().then((content) => setContent(content));
    getWeeklyProductsContent().then((content) => setWeeklyProducts(content));
    getContainerList().then((containerList) => setContainerList(containerList));
  }, []);

  return (
    <main>
      <section className="hero pt-3 pb-5 mb-4 is-flex is-align-items-center">
        <img
          alt="SAMOSA"
          src={logos[samosaLogoIdx]}
          onClick={() => setSamosaLogoIdx(randomLogoIdx)}
          className="logo"
        />
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
        <hr />
        <div id="weekly-products">
          <Content>
            <h2>{weeklyProducts?.blockTitle ?? ""}</h2>
          </Content>
          <Content
            dangerouslySetInnerHTML={{
              __html: weeklyProducts?.blockContents ?? "",
            }}
          />
        </div>
        <hr />
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
