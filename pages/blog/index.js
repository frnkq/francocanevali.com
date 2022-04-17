import { Header } from "./header";

export default function Posts() {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <div className="h-24">
          <Header />
        </div>
        <div className="h-full">
          <h1> Body </h1>
        </div>
        <div className="">
          <h1> Footer </h1>
        </div>
      </div>
    </>
  );
}
