import Header from "../../components/Header";
import TeacherSidebar from "../../components/TeacherSidebar";


export default function ({ children,}: Readonly<{ children: React.ReactNode;}>) {
    return (
        <div>
            <Header />
            <div className="flex">
                <TeacherSidebar />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}