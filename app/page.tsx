import { getUsers } from "./fetch/fetch";

export default async function Home() {
  const users = await getUsers();
  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>ユーザー名：{user.name}</li>
      ))}
    </ul>
  );
}
