import Head from "next/head";
import Script from "next/script";

import "../globals.css";
import '../components/Content/Content.scss'
import '../components/TestQR/TestQR.scss'
import '../components/QRCode/QRCode.scss'


function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href={"./favicon.ico"} />
                <Script
                    src={"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"}
                />
                <title>NOMO APP TESTS</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;
