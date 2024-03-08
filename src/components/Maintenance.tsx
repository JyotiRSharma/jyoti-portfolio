import Link from "next/link";

const Maintainance = () => {
    return (
        <div className="mx-auto my-0 max-w-desktop px-10 py-10">
            <h1 className="text-4xl font-bold md:text-5xl">
                Still working on it yo!
            </h1>
            <p className="text-sm text-slate-500 md:text-base">
                Find out the progress at
                <Link
                    href="https://github.com/users/JyotiRSharma/projects/3/views/3"
                    target="_blank"
                >
                    <span className="text-blue-400">&nbsp;my project...</span>
                </Link>
            </p>
        </div>
    );
};

export default Maintainance;
