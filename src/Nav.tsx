import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="fixed top-12 left-0 right-0 gap-8 justify-center flex text-white">
      <Link className="hover:underline" to="/">
        Discover
      </Link>
      <Link className="hover:underline" to="/browse">
        Browse
      </Link>
      <Link className="hover:underline" to="/contribute">
        Contribute
      </Link>
    </nav>
  );
}
