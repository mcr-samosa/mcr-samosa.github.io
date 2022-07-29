import { useParams } from "react-router-dom";

const Container = () => {
  const { containerId } = useParams();

  return (
    <main>
      <h2>
        {`Container ${containerId}`} - Jordans Crunchy Oat Granola, Simply
        Granola{" "}
      </h2>
      <p>Toasted Wholegrain Oat and Honey Clusters.</p>
      <img src="https://assets.sainsburys-groceries.co.uk/gol/7713798/1/640x640.jpg" />
    </main>
  );
};

export default Container;
