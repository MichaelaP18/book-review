"use client";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Image from "next/image";
import { useUserAuth } from "../_utils/auth-context";
import ElevatedButton from "../components/ElevatedButton";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Page() {
  const backgroundImageUrl = "/Background.png";
  const { user, gitHubSignIn, firebaseSignOut, googleSignIn } = useUserAuth();

  const router = useRouter();

  const signOut = async () => {
    await firebaseSignOut();
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-[#e4c7ff] text-white p-8 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center">
            <Image
              src="/BeeLogo.png"
              width={40}
              height={40}
              alt="Bee Logo"
              className="m-5"
            />
            <p className="text-3xl font-bold  text-black font-sans">Bookish</p>

            <p className="text-3xl text-black font-sans">Buzz</p>
          </div>

          <ul className="flex space-x-4">
            <button
              onClick={() => {
                router.push("/home");
              }}
              className="font-sans text-black hover:underline"
            >
              Home
            </button>
            <button
              onClick={() => {
                router.push("/browse");
              }}
              className="font-sans text-black hover:underline"
            >
              Browse
            </button>
            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="font-sans text-black hover:underline"
            >
              Sign Out
            </button>
          </ul>
        </div>
      </header>

      <main
        className="h-screen bg-cover bg-center bg-[#fafbfd]"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="flex flex-col items-center justify-center h-screen  ">
          <div className="flex flex-col items-center justify-center min-h-10 p-10 bg-white rounded-3xl shadow-xl ">
            <Image
              src="/BeeLogo.png"
              width={70}
              height={70}
              alt="Bee Logo"
              className="-m-2"
            />
            <h1 className="font-po text-4xl text-center m-10 p-2 font-sans font-bold text-black ">
              Welcome, <br />
              Bookish Buzz!
            </h1>
            <p className=" text-black font-sans pb-10">
              Search Books using the button below.
            </p>
            <ElevatedButton
              text="Browse"
              onClick={() => {
                router.push("/browse");
              }}
              Icon={FaSearch}
            />

            <div className="flex space-x-4"></div>
          </div>
        </div>
      </main>

      <footer className="bg-[#e4c7ff]  p-5 shadow-md text-black">
        <p className="text-center">
          Web Development 2 SAIT | Garth Carey . Michaela Paige . Zena Kebede .
          Nathan Romasanta
        </p>
      </footer>
    </div>
  );
}
