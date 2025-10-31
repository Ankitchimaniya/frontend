import { Outlet } from "react-router-dom";
import styles from "../CSS/Root.module.css";
import Header from "./Header";
import Category from "./Category";
import TopRest from "./TopRest";
import OnlineDelivery from "./OnlineDelivery";

function RootLayout() {
    return (
        <>           
            <Header />
            <Category />
            <TopRest />
            <OnlineDelivery />
            <main className={styles.content}>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;