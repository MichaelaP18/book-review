"use client";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Image from "next/image";
import ElevatedButton from "./components/ElevatedButton";
//Home Page

//testing nathan
export default function Page() {
  console.log(useUserAuth());
  const router = useRouter();
  const { user, gitHubSignIn, firebaseSignOut, googleSignIn } = useUserAuth();
  const backgroundImageUrl = "/Background.png";
  const signIn = async () => {
    await gitHubSignIn();
  };

  const signInGoogle = async () => {
    await googleSignIn();
  };
  const signOut = async () => {
    await firebaseSignOut();
  };

  useEffect(() => {
    if (user) {
      router.push("/browse");
    }
  }, [user, router]);

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
        </div>
      </header>

      <main
        className="h-screen bg-cover bg-center bg-[#fafbfd]"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        {user ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center border-4 border-yellow-200/80 bg-purple-500/75 rounded-xl drop-shadow-xl absolute top-1/3">
              <p className="text-center p-8 text-3xl  text-slate-100">
                Welcome to Bookish Buzz!
              </p>
              <p className="mb-4 p-4 text-3xl text-slate-100">
                Welcome, {user.displayName}
              </p>
              <div className=" flex  justify-center border-2 hover:border-yellow-200 border-white bg-purple-700/30 rounded-md my-4 w-32">
                <Link
                  href="/browse"
                  className="hover:underline  text-2xl  text-slate-100"
                >
                  Browse
                </Link>
              </div>
              <button
                className="mb-4 hover:underline border-2 border-white hover:border-purple-600 bg-yellow-200 rounded-md p-2"
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
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
                Welcome to <br />
                Bookish Buzz!
              </h1>
              <p className=" text-black font-sans">
                Sign in to access your Bookish Buzz account.
              </p>
              <p className="font-po text-base text-center m-4  font-sans text-black">
                - Sign In to continue -
              </p>

              <div className="flex space-x-4">
                <ElevatedButton
                  text="GitHub"
                  onClick={signIn}
                  Icon={FaGithub}
                />
                <ElevatedButton
                  text="Google"
                  onClick={signInGoogle}
                  Icon={FaGoogle}
                />
              </div>
            </div>
          </div>
        )}
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
