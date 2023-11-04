import "bulma/css/bulma.min.css";
import '@/styles/globals.css'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const App = ({ Component, pageProps }) => {
  
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default App;