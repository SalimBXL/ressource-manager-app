import ActiveResource from "@/components/ActiveResource";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Layout = ({children}) => {
    return (
        <>
            <Navbar />
            <ActiveResource />
            { children }
            <Footer />
        </>
    )
}

export default Layout;