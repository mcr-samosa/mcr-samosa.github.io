import {
  createDeliveryClient,
  Elements,
  IContentItem,
  ITaxonomyGroup,
} from "@kontent-ai/delivery-sdk";
import { ContainerListItem } from "../models/container-list-item";
import { ContainerContent } from "../models/container-content";
import { LandingPageContent } from "../models/landing-page-content";
import { WeeklyProductsContent } from "../models/weekly-products-content";
import { SnackTypeListItem } from "../models/snack-type-list-item";

const PROJECT_ID = "c01af303-5219-00c8-cc36-485448ab0fa5";

type LandingPage = IContentItem<{
  title: Elements.TextElement;
  subtitle: Elements.TextElement;
  body: Elements.RichTextElement;
  footer: Elements.RichTextElement;
}>;

type WeeklyProducts = IContentItem<{
  block_title: Elements.TextElement;
  block_contents: Elements.RichTextElement;
}>;

type Container = IContentItem<{
  container_location: Elements.TextElement;
  container_contents: Elements.TextElement;
  snack_type: Elements.TaxonomyElement;
  image_url: Elements.TextElement;
  production_description: Elements.RichTextElement;
  supermarket_url: Elements.TextElement;
}>;

const deliveryClient = createDeliveryClient({
  projectId: PROJECT_ID,
});

let cachedTaxonomies: ITaxonomyGroup[];
let cachedContent: IContentItem[];

const fetchAllTaxonomies = async (): Promise<ITaxonomyGroup[]> => {
  if (!cachedTaxonomies) {
    const response = await deliveryClient.taxonomies().toPromise();
    cachedTaxonomies = response.data.items;
  }
  return cachedTaxonomies;
};

export const getSnackTypes = async (): Promise<SnackTypeListItem[]> => {
  const items = await fetchAllTaxonomies();

  const snackTypeGroup = items.find(
    (item) => item.system.codename == "snack_type"
  );

  return (
    snackTypeGroup?.terms.map((term) => ({
      name: term.name,
      codename: term.codename,
    })) ?? []
  );
};

const fetchAllContent = async (): Promise<IContentItem[]> => {
  if (!cachedContent) {
    const response = await deliveryClient.items().toPromise();
    cachedContent = response.data.items;
  }
  return cachedContent;
};

export const getLandingPageContent =
  async (): Promise<LandingPageContent | null> => {
    const items = (await fetchAllContent()) as LandingPage[];

    const landingPageItem: LandingPage | undefined = items.find(
      (item: IContentItem) => item.system.type == "landing_page"
    );

    if (!landingPageItem) {
      return null;
    }

    return {
      titleText: landingPageItem.elements.title.value,
      subtitleText: landingPageItem.elements.subtitle?.value,
      bodyContent: landingPageItem.elements.body?.value,
      footerContent: landingPageItem.elements.footer?.value,
    };
  };

export const getWeeklyProductsContent =
  async (): Promise<WeeklyProductsContent | null> => {
    const items = (await fetchAllContent()) as WeeklyProducts[];

    const weeklyProductsBlock: WeeklyProducts | undefined = items.find(
      (item: IContentItem) => item.system.codename == "weekly_products_block"
    );

    if (!weeklyProductsBlock) {
      return null;
    }

    return {
      blockTitle: weeklyProductsBlock.elements.block_title.value,
      blockContents: weeklyProductsBlock.elements.block_contents.value,
    };
  };

export const getContainerList = async (): Promise<ContainerListItem[]> => {
  const items = (await fetchAllContent()) as Container[];

  const containerItems: Container[] = items.filter(
    (item: IContentItem) => item.system.type == "snack_container"
  );

  return containerItems
    .map((container) => ({
      containerId: parseInt(container.system.codename.substring(10)),
      codename: container.system.codename,
      contentsText: container.elements.container_contents.value,
      snackTypeName: container.elements.snack_type?.value[0]?.name,
    }))
    .sort((containerA, containerB) =>
      Math.sign(containerA.containerId - containerB.containerId)
    );
};

export const getContainerContent = async (
  containerId: string
): Promise<ContainerContent | null> => {
  const items = (await fetchAllContent()) as Container[];

  const containerItem: Container | undefined = items.find(
    (item: IContentItem) =>
      item.system.type == "snack_container" &&
      item.system.codename == `container_${containerId}`
  );

  if (!containerItem) {
    return null;
  }

  const kontentEditUrl = `https://app.kontent.ai/${PROJECT_ID}/content-inventory/00000000-0000-0000-0000-000000000000/content/${containerItem.system.id}`;

  return {
    containerId: parseInt(containerId),
    codename: containerItem.system.codename,
    containerLocation: containerItem.elements.container_location.value,
    contentsText: containerItem.elements.container_contents.value,
    snackTypeName: containerItem.elements.snack_type?.value[0]?.name,
    snackTypeCodename: containerItem.elements.snack_type?.value[0]?.codename,
    imageUrl: containerItem.elements.image_url?.value,
    productDescription: containerItem.elements.production_description.value,
    supermarketUrl: containerItem.elements.supermarket_url?.value,
    kontentEditUrl,
  };
};
