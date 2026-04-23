import Header from "../../components/Header";
import StudentSidebar from "../../components/StudentSidebar";


export default function ({ children,}: Readonly<{ children: React.ReactNode;}>) {
    return (
        <div>
            <Header />
            <div className="flex">
                <StudentSidebar />
                <div className="flex-1">
                    {children}
                </div> 
            </div>
        </div>
    )
}