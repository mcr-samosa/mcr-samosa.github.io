import { useParams } from "react-router-dom";

const Container = () => {
  const { containerId } = useParams();

  return (
    <main>
      <h2>{`Container ${containerId}`}</h2>
    </main>
  );
};

export default Container;
