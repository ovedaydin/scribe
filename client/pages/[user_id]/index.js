import { CircularProgressbar } from "react-circular-progressbar";
import Link from "next/link";

export default function UserData({ data }) {
  return (
    <div className="bg">
      {data.map((product) => (
        <>
          <Link href={product.url}>
            <div className="product">
              <div className="logo-wrapper">
                <img className="logo" src={product.logo} />
              </div>
              <CircularProgressbar
                value={
                  (100 * (product.length - product.remaining)) / product.length
                }
                text={`${product.remaining}`}
              />
            </div>
          </Link>
        </>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://scribeupapi.serve.ovedaydin.com/${context.params.user_id}`
  );
  const data = await res.json();
  if (data["Problem"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { data }, // will be passed to the page component as props
  };
}
