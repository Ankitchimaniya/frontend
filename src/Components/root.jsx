import { Outlet } from "react-router-dom";
import Header from "./Header";
import Category from "./Category";
import TopRest from "./TopRest";
import OnlineDelivery from "./OnlineDelivery";

function RootLayout() {
    return (
        <div className="min-h-screen bg-gray-50">           
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Category />
                <TopRest />
                <OnlineDelivery />
                <main className="py-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default RootLayout;