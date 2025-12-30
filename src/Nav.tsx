import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="pt-14 gap-8 justify-center flex text-white">
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
