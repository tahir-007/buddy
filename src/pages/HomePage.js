// Importing Header, Logo, Body components from layout folder
import Header from "./layout/Header";
import Logo from "./layout/Logo";
import Body from "./layout/Body";
// Importing ChatContent component from components folder
import ChatContent from "./components/ChatContent";

// HomePage functional component
const HomePage = () => {
  // Returning JSX elements
  return (
    <>
      <div className="w-screen mx-4">
        <Header />
        <Logo />
        <Body />
        <ChatContent />
      </div>
    </>
  );
};

// Exporting HomePage component as default export
export default HomePage;
