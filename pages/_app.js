import '@/styles/globals.css'
import Navbar from '@/components/NavBar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
