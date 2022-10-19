import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
  getMetaTagsForArticle,
  KatexCSS,
  ArticlePage,
  useNavigationHeight,
  DocumentOutline,
  DEFAULT_NAV_HEIGHT,
} from '@curvenote/site';
import { getPage } from '~/utils';
import type { PageLoader, SiteManifest } from '@curvenote/site-common';
import { useHideDesignElement } from '@curvenote/ui-providers';

export const meta: MetaFunction = (args) => {
  const config = args.parentsData?.root?.config as SiteManifest | undefined;
  const data = args.data as PageLoader | undefined;
  if (!config || !data || !data.frontmatter) return {};
  return getMetaTagsForArticle({
    origin: '',
    url: args.location.pathname,
    title: `${data.frontmatter.title} - ${config?.title}`,
    description: data.frontmatter.description,
    image: (data.frontmatter.thumbnailOptimized || data.frontmatter.thumbnail) ?? undefined,
  });
};

export const links: LinksFunction = () => [KatexCSS];

export const loader: LoaderFunction = async ({ params, request }) => {
  const { project, slug } = params;
  return getPage(request, { project, slug, redirect: true });
};

export { ArticlePageCatchBoundary as CatchBoundary } from '@curvenote/site';

export default function Page({ top = DEFAULT_NAV_HEIGHT }: { top?: number }) {
  const { ref, height } = useNavigationHeight();
  const [hide_outline] = useHideDesignElement('hide_outline');
  return (
    <main ref={ref} className="article-content">
      <ArticlePage />
      {!hide_outline && <DocumentOutline top={top} height={height} />}
    </main>
  );
}
