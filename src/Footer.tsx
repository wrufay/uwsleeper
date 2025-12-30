export default function Footer() {
  return (
    <footer className="w-full mt-10 py-8 mb-2 border-t border-white/20">
      <div className="flex justify-center items-center">
        <p className="text-white/80 text-xs">
          github{" "}
          <a
            href="https://github.com/wrufay/uwsleeper"
            target="_blank"
            className="bg-gradient-to-r from-[var(--goose-yellow)] to-[var(--bright-orange)] bg-clip-text text-transparent font-semibold"
          >
            repo
          </a>
        </p>
      </div>
    </footer>
  );
}
