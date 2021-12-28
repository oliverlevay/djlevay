import { Stack, Paper, Button } from "@mui/material";
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
          <Stack component="nav" direction="row" spacing={1}>
            {pageDocument.papers?.map((paperItem, index) => (
              <>
                {paperItem.visibleInNavigation && (
                  <Button
                    key={`${paperItem.title}-nav${index}`}
                    onClick={() => {
                      const paper = document.getElementById(`paper-${index}`);
                      paper.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {paperItem.title}
                  </Button>
                )}
              </>
            ))}
          </Stack>
          <TinaMarkdown components={components} content={pageDocument.body} />
          {pageDocument.papers?.map((paperItem, index) => (
            <Paper
              key={`paper-${index}`}
              id={`paper-${index}`}
              sx={{
                width: "100%",
                margin: "1rem 0",
                img: {
                  width: "calc(100% + 2rem)",
                  marginLeft: "-1rem",
                  marginBottom: "-1.1rem",
                  marginTop: "0.5rem",
                },
              }}
            >
              <Stack padding={{ xs: "0.5rem 1rem" }}>
                <h2>{paperItem.title}</h2>
                <TinaMarkdown
                  components={components}
                  content={paperItem.paper}
                />
              </Stack>
            </Paper>
          ))}
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
          title
          paper
          visibleInNavigation
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
