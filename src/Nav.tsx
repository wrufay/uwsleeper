import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="fixed top-12 left-0 right-0 gap-8 justify-center flex text-white animate-fade-in">
      <Link className="hover:text-white/67" to="/">
        Discover
      </Link>
      <Link className="hover:text-white/67" to="/browse">
        Browse
      </Link>
      <Link className="hover:text-white/67" to="/contribute">
        Contribute
      </Link>
    </nav>
  );
}
