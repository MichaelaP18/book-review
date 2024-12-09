"use client";
import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ElevatedButton from "../components/ElevatedButton";
import { FaSearch } from "react-icons/fa";
//Browser Page
export default function Page() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    async function fetchBooks() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=He+Who+Fights+with+Monsters`
        );
        if (!response.ok) {
          throw new Error("Network connection is not great!");
        }
        const data = await response.json();
        setBooks(data.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (error) return <p>Error: {error.message}</p>;

  if (loading)
    return (
      <div>
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
              <p className="text-3xl font-bold  text-black font-sans">
                Bookish
              </p>

              <p className="text-3xl text-black font-sans">Buzz</p>
            </div>
            <div className="flex items-center space-x-2 ">
              <input
                type="text"
                placeholder="Search"
                value={userInput}
                className="border border-gray-200 p-2 rounded-lg text-black font-sans px-6 py-3"
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />
              <ElevatedButton text="Search" Icon={FaSearch} />
            </div>

            <ul className="flex space-x-4">
              <button
                onClick={() => {
                  router.push("/home");
                }}
                className="font-sans text-black"
              >
                Home
              </button>
              <button
                onClick={() => {
                  router.push("/browse");
                }}
                className="font-sans text-black"
              >
                Browse
              </button>
              <button
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
                className="font-sans text-black"
              >
                Sign Out
              </button>
            </ul>
          </div>
        </header>

        <main className="h-screen bg-cover bg-center overflow-y-auto bg-[#fafbfd] p-10">
          <h1 className="text-2xl font-bold mb-4 text-black font-sans">
            Loading
          </h1>
        </main>

        <footer className="sticky top-0 bg-gray-800 text-white p-4 shadow-md">
          <p className="text-center">Footer Content</p>
        </footer>
      </div>
    );

  const signOut = async () => {
    await firebaseSignOut();
  };

  const navigateToHome = () => {
    router.push("/home");
  };

  const search = async () => {
    setLoading(true);
    async function fetchBooks() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${userInput
            .split(" ")
            .join("+")}`
        );
        if (!response.ok) {
          throw new Error("Network connection is not great!");
        }
        const data = await response.json();
        setBooks(data.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  };
  return (
    <div>
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
          <div className="flex items-center space-x-2 ">
            <input
              type="text"
              placeholder="Search"
              value={userInput}
              className="border border-gray-200 p-2 rounded-lg text-black font-sans px-6 py-3"
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            />
            <ElevatedButton text="Search" onClick={search} Icon={FaSearch} />
          </div>

          <ul className="flex space-x-4">
            <button
              onClick={navigateToHome}
              className="text-black hover:underline"
            >
              Home
            </button>
            <li>
              <a href="#" className="hover:underline font-sans text-black">
                Browse
              </a>
            </li>
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

      <main className="h-screen bg-cover bg-center overflow-y-auto bg-[#fafbfd] p-10">
        <h1 className="text-2xl font-bold mb-4 text-black font-sans">Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col items-center"
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="mt-2"
              />
              <h2 className="text-lg font-semibold text-black text-center font-sans">
                {book.volumeInfo.title}
              </h2>

              <p className="text-sm text-gray-500 font-sans">
                Written by: {book.volumeInfo.authors?.join(", ")}
              </p>
              <p className="text-gray-500 text-sm line-clamp-3 font-sans">
                {book.volumeInfo.description}
              </p>
            </div>
          ))}
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
