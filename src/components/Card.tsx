import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  const Heading = secHeading ? "h2" : "h3";

  return (
    <li className="blog-card">
      <a href={href} className="blog-card-link" aria-label={`Read ${title}`}>
        <div className="blog-card-meta">
          {tags?.[0] && <span className="blog-card-topic">{tags[0].replaceAll("-", " ")}</span>}
          <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        </div>

        <Heading
          className="blog-card-title"
          style={{ viewTransitionName: slugifyStr(title) }}
        >
          {title}
        </Heading>

        <p className="blog-card-description">{description}</p>

        <span className="blog-card-read-more">Read Article →</span>
      </a>
    </li>
  );
}
