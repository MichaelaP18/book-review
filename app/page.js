'use client';
import { useUserAuth } from './_utils/auth-context';
import Link from 'next/link';

//Home Page
export default function Page() {
  console.log(useUserAuth());

  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const signIn = async () => {
    await gitHubSignIn();
  };

  const signOut = async () => {
    await firebaseSignOut();
  };

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-purple-500 text-white p-8 shadow-md'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>Bookish Buzz</h1>

          <ul className='flex space-x-4'>
            <li>
              <Link
                href='http://localhost:3000/'
                className='hover:underline'>
                Home
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <main className='flex-grow p-6'>
        {user ? (
          <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center border-4 border-yellow-200/80 bg-purple-500/75 rounded-xl drop-shadow-xl absolute top-1/3'>
              <p className='text-center p-8 text-3xl  text-slate-100'>
                Welcome to Bookish Buzz!
              </p>
              <p className='mb-4 p-4 text-3xl text-slate-100'>
                Welcome, {user.displayName}
              </p>
              <div className=' flex  justify-center border-2 hover:border-yellow-200 border-white bg-purple-700/30 rounded-md my-4 w-32'>
                <Link
                  href='/browse'
                  className='hover:underline  text-2xl  text-slate-100'>
                  Browse
                </Link>
              </div>
              <button
                className='mb-4 hover:underline border-2 border-white hover:border-purple-600 bg-yellow-200 rounded-md p-2'
                onClick={signOut}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className='flex w-1/2 h-2/3  justify-center  items-center absolute left-1/4 top-1/5'>
            <div
              className='flex flex-col
            justify-center items-center border-4 border-yellow-200/80 bg-purple-500/75 rounded-xl drop-shadow-xl w-2/3 h-1/3'>
              <h1 className='font-cursive text-3xl text-center p-4  text-slate-100'>
                Sorry, you need to sign in first!
              </h1>
              <button
                className='text-center hover:underline mt-4 border-white border-2 hover:border-yellow-200 bg-purple-700/30 rounded-md p-2 m-5 text-slate-100'
                onClick={signIn}>
                Sign In
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className='bg-purple-500 text-white p-12 shadow-md'></footer>
    </div>
  );
}
