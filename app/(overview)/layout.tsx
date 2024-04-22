import Header from "@/app/ui/home/Header";
import SectionContainer from "@/app/ui/SectionContainer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SectionContainer>
            <div className="padding-5">
                <Header />
                <main className="mb-auto">{children}</main>
            </div>
        </SectionContainer>
    );
}