
export function parseTagList(tagListHtml) {
      if (!tagListHtml) return [];

      const parser = new DOMParser();
      const doc = parser.parseFromString(tagListHtml, "text/html");
      const links = doc.querySelectorAll("a");

      return Array.from(links).map((link, index) => ({
            id: index,
            name: link.textContent,
            slug: link.href.split("/tag/")[1]?.replace(/\/$/, ""),
            href: link.getAttribute("href"),
      }));
}