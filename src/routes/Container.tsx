import { useParams } from "react-router-dom";

const Container = () => {
  const params = useParams();

  console.log(params.containerId);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Container</h2>
    </main>
  );
};

export default Container;
