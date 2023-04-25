import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { RiBook2Line } from "react-icons/ri";
import { RiServiceLine } from "react-icons/ri";
import { BsPersonWorkspace } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";

type NavbarProps = {
    activeNav: string;
    setActiveNav: (value: string) => void;
};

const Navbar = ({ activeNav, setActiveNav }: NavbarProps) => {
    return (
        <nav className="align-center container fixed bottom-5 left-0 right-0 z-[9999] flex w-max gap-[3px] rounded-full bg-black bg-opacity-[0.25] p-3 px-[1.2] py-[0.2] backdrop-blur-lg">
            <a
                href="#"
                onClick={() => {
                    setActiveNav("#");
                }}
                className={activeNav === "#" ? "active" : ""}
            >
                <HiOutlineHome />
            </a>
            <a
                href="#about"
                onClick={() => {
                    setActiveNav("#about");
                }}
                className={activeNav === "#about" ? "active" : ""}
            >
                <AiOutlineUser />
            </a>
            <a
                href="#experience"
                onClick={() => {
                    setActiveNav("#experience");
                }}
                className={
                    activeNav === "#experience"
                        ? "active max-[300px]:hidden"
                        : "max-[300px]:hidden"
                }
            >
                <RiBook2Line />
            </a>
            <a
                href="#services"
                onClick={() => {
                    setActiveNav("#services");
                }}
                className={activeNav === "#services" ? "active" : ""}
            >
                <RiServiceLine />
            </a>
            <a
                href="#portfolio"
                onClick={() => {
                    setActiveNav("#portfolio");
                }}
                className={activeNav === "#portfolio" ? "active" : ""}
            >
                <BsPersonWorkspace />
            </a>
            <a
                href="#contact"
                onClick={() => {
                    setActiveNav("#contact");
                }}
                className={
                    activeNav === "#contact"
                        ? "active max-[300px]:hidden"
                        : "max-[300px]:hidden"
                }
            >
                <AiOutlineMessage />
            </a>
        </nav>
    );
};

export default Navbar;
