import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <div className="mx-auto my-0 flex max-w-desktop flex-col gap-12 px-10 py-10 lg:flex-row">
                <div className="flex flex-col gap-3">
                    <h1 className="text-5xl font-bold">Jyoti Ranjan Sharma</h1>
                    <h3 className="text-xl font-semibold text-slate-500">
                        Software Engineer
                    </h3>
                    <p key={"intro"}>
                        Jyotiranjan is a Software Engineer specializing in
                        Next.js development and Machine Learning. With Next.js
                        he builds fast and intuitive web applications, while
                        delving into Machine Learning to drive innovation and
                        solve complex challenges. He previously worked at Wipro,
                        TechMahindra and on Fortune 500 sites. You can find him
                        on
                        <Link
                            href="https://www.linkedin.com/in/jrsharma11/"
                            target="_blank"
                        >
                            <span className="text-blue-400"> LinkedIn </span>
                        </Link>
                        or
                        <Link
                            href="https://twitter.com/JyotiRanjanSha9"
                            target="_blank"
                        >
                            <span className="text-blue-400"> Twitter</span>
                        </Link>
                        .
                    </p>
                </div>

                <Image
                    src={"/images/profile.jpeg"}
                    alt="Jyoti Ranjan"
                    height={768}
                    width={1023}
                    className="aspect-square rounded-md shadow-inner"
                ></Image>
            </div>
        </main>
    );
}
