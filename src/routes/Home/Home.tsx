import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LandingPageContent } from "../../models/landing-page-content";
import {
  getContainerList,
  getLandingPageContent,
  getSnackTypes,
  getWeeklyProductsContent,
} from "../../clients/kontent-client";
import { ContainerListItem } from "../../models/container-list-item";
import { Container, Content } from "react-bulma-components";
import "./Home.css";
import { logos } from "../../utils/logos";
import { WeeklyProductsContent } from "../../models/weekly-products-content";
import { SnackTypeListItem } from "../../models/snack-type-list-item";
import SnackCategoryList from "../../components/SnackCategoryList/SnackCategoryList";
import SearchBar, { SearchItem } from "../../components/SearchBar/SearchBar";

const randomLogoIdx = (previous?: number): number => {
  const newIdx = Math.floor(Math.random() * logos.length);

  return newIdx === previous ? randomLogoIdx(previous) : newIdx;
};

const Home = () => {
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [weeklyProducts, setWeeklyProducts] =
    useState<WeeklyProductsContent | null>(null);
  const [containerList, setContainerList] = useState<ContainerListItem[]>([]);
  const [snackTypeList, setSnackTypeList] = useState<SnackTypeListItem[]>([]);
  const [samosaLogoIdx, setSamosaLogoIdx] = useState(randomLogoIdx());

  useEffect(() => {
    getLandingPageContent().then((content) => setContent(content));
    getWeeklyProductsContent().then((content) => setWeeklyProducts(content));
    getContainerList().then((containerList) => setContainerList(containerList));
    getSnackTypes().then((snackTypesList) => setSnackTypeList(snackTypesList));
  }, []);

  const navigate = useNavigate();

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
        <SearchBar
          data={containerList
            .filter((item) => item.snackTypeName != "Empty")
            .map((item) => ({
              key: item.containerId.toString(),
              value: `${
                item.contentsText
              } (#${item.containerId.toString()}) — ${item.snackTypeName}`,
            }))}
          placeholder={"Search for snacks..."}
          onSelect={({ item }: { item: SearchItem }) =>
            navigate(`/container/${item.key}`)
          }
        />
        <hr />
        {snackTypeList
          .filter((snackType) => snackType.codename != "empty")
          .map((snackType) => (
            <SnackCategoryList
              key={snackType.codename}
              snackTypeName={snackType.name}
              containerList={containerList}
            />
          ))}
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
