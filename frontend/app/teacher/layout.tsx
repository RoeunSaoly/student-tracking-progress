import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";


export default function ({ children,}: Readonly<{ children: React.ReactNode;}>) {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
        </div>
    )
}