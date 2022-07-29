import { Link, useParams } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <nav>
        <Link to="/container/1">Container 1</Link>
        <br />
        <Link to="/container/2">Container 2</Link>
        <br />
        <Link to="/container/3">Container 3</Link>
        <br />
        <Link to="/container/4">Container 4</Link>
      </nav>
    </main>
  );
};

export default Home;
