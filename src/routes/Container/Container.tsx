import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContainerContent } from "../../clients/kontent-client";
import { ContainerContent } from "../../models/container-content";

const Container = () => {
  const { containerId } = useParams();

  const [content, setContent] = useState<ContainerContent | null>(null);

  // Demo usage
  useEffect(() => {
    getContainerContent(containerId ?? "").then((content) =>
      setContent(content)
    );
  }, []);

  return (
    <main>
      <h2>
        {`Container ${containerId}`} - Jordans Crunchy Oat Granola, Simply
        Granola{" "}
      </h2>
      <p>Toasted Wholegrain Oat and Honey Clusters.</p>
      <img
        src="https://assets.sainsburys-groceries.co.uk/gol/7713798/1/640x640.jpg"
        alt="Snack image"
      />

      <a href={content?.supermarketUrl}>
        {content?.supermarketUrl ?? "loading..."}
      </a>
    </main>
  );
};

export default Container;
