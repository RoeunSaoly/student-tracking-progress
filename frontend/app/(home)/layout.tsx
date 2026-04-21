import Header from "../../components/Header";


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