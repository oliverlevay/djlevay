import { Stack, Paper } from "@mui/material";
import SoundCloudPlaylist from "components/SoundCloudPlaylist";
import Head from "next/head";
import { getStaticPropsForTina } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const components = {
  SoundCloudPlaylist: (props) => {
    return <SoundCloudPlaylist props={props} />;
  },
};

export default function Home(props) {
  /** @type {import('../.tina/__generated__/types').GetPageDocumentQuery['getPageDocument']['data']} */
  const pageDocument = props.data.getPageDocument.data;
  return (
    <>
      <Head>
        <title>{pageDocument.title}</title>
      </Head>
      <main>
        <Stack style={{ width: "100%", maxWidth: "700px" }}>
          <TinaMarkdown components={components} content={pageDocument.body} />
          {pageDocument.papers?.map((paper) => {
            return (
              <Paper style={{ width: "100%", margin: "1rem 0" }}>
                <Stack padding={{ xs: "0.5rem 1rem", md: "1rem" }}>
                  <TinaMarkdown components={components} content={paper.paper} />
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </main>
    </>
  );
}

export const getStaticPaths = async () => {
  const tinaProps = await getStaticPropsForTina({
    query: `{
      getPageList {
        edges {
          node {
            sys {
              filename
            }
          }
        }
      } 
  }`,
    variables: {},
  });
  const paths = tinaProps.data.getPageList.edges.map((edge) => ({
    params: {
      slug: edge.node.sys.filename,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const tinaProps = await getStaticPropsForTina({
    query: `{
    getPageDocument(relativePath: "${params.slug}.mdx"){
      data {
        title
        body
        papers {
          paper
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
