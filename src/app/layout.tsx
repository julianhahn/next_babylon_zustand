import { Metadata } from "next";

export const metadata: Metadata = {
    title: "NeBaZu",
    description: "Next Babylon Zustand starter",
};

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <>
                    {children}
                </>
            </body>
        </html>
    );
}

