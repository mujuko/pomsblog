import useContentful from "./hooks/contentful";
import Markdown from "react-markdown";
import "./App.css";

function LinkRenderer(props: any) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const query = `
query {
  postsCollection(
    where: { private: false }
    limit: 1
    order: sys_firstPublishedAt_DESC
  ) {
    items {
      title
      content
      sys {
        publishedAt
        firstPublishedAt
      }
      author {
        name
        description
        avator {
          image {
            url
          }
        }
      }
    }
  }
}`;

function App() {
  const { data } = useContentful(query);
  if (!data) {
    return "Loading...";
  }

  const page = data.postsCollection.items[0];
  return (
    <>
      <div>
        <a
          href="https://twitter.com/pompom_cannon"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={page.author.avator.image.url}
            className="logo"
            alt={page.author.name}
          />
        </a>
      </div>
      <h1>{page.title}</h1>
      <article>
        <Markdown components={{ a: LinkRenderer }}>{page.content}</Markdown>
      </article>
      <p>更新: {page.sys.publishedAt.replace(/[TZ]/g, " ")}</p>
      <p>公開: {page.sys.firstPublishedAt.replace(/[TZ]/g, " ")}</p>
      <footer>© Mark I Weightless Industries</footer>
    </>
  );
}

export default App;
