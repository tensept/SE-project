'use client';
import Link from "next/link";
import { usePathname , useRouter } from "next/navigation";
import { Home, BookOpen, MessagesSquare, ScrollText, Plus } from "lucide-react";
import Image from "next/image";


const SidebarDC = () => {
  const pathname = usePathname();
  const router = useRouter();

const navigateToTodayDiary = () => {
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
  router.push(`/diary/${today}`);
};

  return (
    <aside className="w-[17%] bg-white h-screen p-4 flex flex-col items-center">
      {/* Logo */}
      <Image
          src="/logo.jpg"
          alt="Next.js logo"
          width={180}
          height={38}
          className="w-[100%] h-auto"
          priority
        />
      

      {/* Navigation Items */}
      <nav className="w-full">
        <ul className="space-y-4">
          <NavItem href="/doctor" icon={ScrollText} label="List" active={pathname === "/doctor"} />
          <NavItem href="/consult" icon={MessagesSquare} label="Consult" active={pathname === "/consult"} />
        </ul>
      </nav>

    </aside>
  );
};

const NavItem = ({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) => (
  <li>
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-all ${
        active ? "bg-pink-300 text-white font-bold" : "text-gray-700 hover:bg-pink-200"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  </li>
);

export default SidebarDC;
