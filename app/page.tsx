import { cacheGetUsers } from "./fetch/fetch";

export default async function Home() {
  const res = await cacheGetUsers();

  if (!Array.isArray(res)) {
    return <div>エラーが発生しました</div>;
  }

  return (
    <ul>
      {res.map((user) => (
        <li key={user.name}>ユーザー名：{user.name}</li>
      ))}
    </ul>
  );
}
