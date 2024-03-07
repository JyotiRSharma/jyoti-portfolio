import ModeToggle from "@/components/ModeToggle";
import Image from "next/image";

export default function Home() {
    return (
        <main className="">
            <div className="mx-auto my-0 flex max-w-[75rem] flex-col gap-12 px-10 py-20 lg:flex-row">
                <ModeToggle></ModeToggle>
                <div className="flex flex-col gap-3">
                    <h1 className="text-5xl font-bold">Jyoti Ranjan Sharma</h1>
                    <h3 className="text-xl font-semibold text-slate-500">
                        Software Engineer
                    </h3>
                    <p>
                        Jyotiranjan is a Software Engineer specializing in
                        Next.js development and Machine Learning. With Next.js
                        he builds fast and intuitive web applications, while
                        delving into Machine Learning to drive innovation and
                        solve complex challenges. He previously worked at Wipro,
                        TechMahindra and on Fortune 500 sites. You can find him
                        on LinkedIn or Twitter.
                    </p>
                </div>

                <Image
                    src={"/images/profile.jpeg"}
                    alt="Jyoti Ranjan"
                    height={768}
                    width={1023}
                    className="rounded-md shadow-inner"
                ></Image>
            </div>
        </main>
    );
}
