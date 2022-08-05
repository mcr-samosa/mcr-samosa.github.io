import {
  createDeliveryClient,
  Elements,
  IContentItem,
} from "@kontent-ai/delivery-sdk";
import { ContainerListItem } from "../models/container-list-item";
import { ContainerContent } from "../models/container-content";
import { LandingPageContent } from "../models/landing-page-content";

const deliveryClient = createDeliveryClient({
  projectId: "c01af303-5219-00c8-cc36-485448ab0fa5",
});

type LandingPage = IContentItem<{
  title: Elements.TextElement;
  subtitle: Elements.TextElement;
  body: Elements.RichTextElement;
  footer: Elements.RichTextElement;
}>;

type Container = IContentItem<{
  container_contents: Elements.TextElement;
  full_product_name: Elements.TextElement;
  supermarket_url: Elements.TextElement;
  image_url: Elements.TextElement;
  production_description: Elements.RichTextElement;
}>;

let cachedContent: IContentItem[];

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

export const getContainerList = async (): Promise<ContainerListItem[]> => {
  const items = (await fetchAllContent()) as Container[];

  const containerItems: Container[] = items.filter(
    (item: IContentItem) => item.system.type == "snack_container"
  );

  return containerItems.map((container) => ({
    containerId: parseInt(container.system.codename.substring(10)),
    codename: container.system.codename,
    contentsText: container.elements.container_contents.value,
  }));
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

  return {
    containerId: parseInt(containerId),
    codename: containerItem.system.codename,
    contentsText: containerItem.elements.container_contents.value,
    fullProductName: containerItem.elements.full_product_name.value,
    supermarketUrl: containerItem.elements.supermarket_url.value,
    imageUrl: containerItem.elements.image_url?.value,
    productDescription: containerItem.elements.production_description.value,
  };
};