import Parser from "rss-parser";

type CustomItem = { description: string };

interface Enclosure {
    url: string
    length: number
    type: string
  }
  
  interface Item {
    link: string
    guid: string
    title: string
    pubDate: string
    creator: string
    summary: string
    content: string
    isoDate: string
    categories?: string[]
    contentSnippet: string 
    enclosure: Enclosure
  }

const parser: Parser<CustomItem> = new Parser({
  customFields: {
    item: ["description"],
  },
});

export const getFeed = async ({ url }: {url:string}) => {
  const feed = await parser.parseURL(url);

  return feed.items.map((item) => {
    const { title, link, pubDate, description } = item;

    return {
      title,
      link,
      pubDate,
      description,
    };
  });
};