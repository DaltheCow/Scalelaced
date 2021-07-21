import Head from "next/head";
import WriteToCloudFirestore from "../components/cloudFirestore/Write";
import { useUser } from "../firebase/useUser";

export default function Home() {
  const { user, logout } = useUser();
  if (user) {
    return (
      <div>
        <Head>
          <title>Scale Laced</title>
        </Head>
        <p>Welcome {user?.name}</p>
        <button onClick={logout}>logout</button>
        <WriteToCloudFirestore />
      </div>
    );
  } else {
    return (
      <div>
        <Head>
          <title>Scale Laced</title>
        </Head>
        <p>
          <a href="/auth">Log In!</a>
        </p>
        <WriteToCloudFirestore />
      </div>
    );
  }
}
