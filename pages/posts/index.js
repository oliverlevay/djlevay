import { getStaticPropsForTina } from "tinacms";
import Link from "next/link";
export default function Home(props) {
  const postsList = props.data.getPostList.edges;
  return (
    <main>
      <h1>Posts</h1>
      <div>
        {postsList.map((post) => (
          <div key={post.node.id}>
            <Link href={`/posts/${post.node.sys.filename}`}>
              <a>{post.node.sys.filename}</a>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await getStaticPropsForTina({
    query: `{
        getPostList{
          edges {
            node {
              id
              sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  });

  return {
    props: {
      ...tinaProps,
    },
  };
};
