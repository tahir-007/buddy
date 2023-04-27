// Importing required modules
import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import HomePage from "./HomePage";

// Setting up Inter font with latin subset
const inter = Inter({ subsets: ["latin"] });

// Exporting Home component
export default function Home() {
  return (
    <>
      <Head>
        <title>Buddy | Your AI Powered Personal Companion.</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="Tahir Patel" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex px-2 py-4 min-h-screen dark:bg-gray-800 text-gray-800 dark:text-gray-400">
        {/* Rendering HomePage component */}
        <HomePage />
      </main>
    </>
  );
}
