import React, {useRef, useState} from 'react';
import NavigationBar from './Navigation/NavigationBar';
import Footer from "./Footer/Footer.js"

const Page = ({children}) => {
    return (
        <section>
            <NavigationBar/>
            {children}
            {/* <Footer /> */}
        </section>
    )
}

export default Page
