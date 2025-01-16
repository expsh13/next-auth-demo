type User = {
  name: string;
};

export default async function Home() {
  const response = await fetch(`${process.env.SERVER_URL}/api/users`);
  const users: User[] = await response.json();
  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>ユーザー名：{user.name}</li>
      ))}
    </ul>
  );
}
