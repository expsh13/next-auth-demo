"use client";

export default function Home() {
  const handleOnClick = async () => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Alice", email: "s@gmail.com" }),
    });
    console.log(await response.json());
  };
  const get = async () => {
    const response = await fetch("/api/users");
    console.log(await response.json());
  };
  return (
    <div>
      <button onClick={handleOnClick}>クリック</button>
      <button onClick={get}>get</button>
    </div>
  );
}
