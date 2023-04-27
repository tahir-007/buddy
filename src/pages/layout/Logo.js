// Importing React and Image from next/image
import React from "react";
import Image from "next/image";

// Logo functional component
const Logo = () => {
  // Returning JSX elements
  return (
    <>
      <div className="flex justify-center mt-10">
        <Image
          className="w-6/12 md:w-2/12"
          src="/logo.png"
          alt="Buddy"
          width={250}
          height={70}
        />
      </div>
      <p className="flex font-serif text-lg justify-center my-4">
        Your AI-powered Companion
      </p>
    </>
  );
};

// Exporting Logo component as default export
export default Logo;
