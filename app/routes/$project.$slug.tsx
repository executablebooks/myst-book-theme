import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/site';
import {
  getMetaTagsForArticle,
  KatexCSS,
  ArticlePage,
  useNavigationHeight,
  DocumentOutline,
  DEFAULT_NAV_HEIGHT,
  Navigation,
  TopNav,
  ArticlePageCatchBoundary,
} from '@myst-theme/site';
import { getPage } from '~/utils/loaders.server';
import { useLoaderData } from '@remix-run/react';
import type { SiteManifest } from 'myst-config';
import { TabStateProvider, UiStateProvider } from '@myst-theme/providers';
import { MadeWithMyst } from '@myst-theme/icons';

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

export function ArticlePageAndNavigation({
  children,
  hide_toc,
  top = DEFAULT_NAV_HEIGHT,
}: {
  top?: number;
  hide_toc?: boolean;
  children: React.ReactNode;
}) {
  const { ref, height } = useNavigationHeight();
  return (
    <UiStateProvider>
      <Navigation top={top} height={height} hide_toc={hide_toc} footer={<MadeWithMyst />}>
        <TopNav />
      </Navigation>
      <TabStateProvider>
        <article
          ref={ref}
          className="article content article-grid article-grid-gap"
          style={{ marginTop: top + 16 }}
        >
          {children}
        </article>
      </TabStateProvider>
    </UiStateProvider>
  );
}

export default function Page({ top = DEFAULT_NAV_HEIGHT }: { top?: number }) {
  const { ref, height } = useNavigationHeight();
  const article = useLoaderData<PageLoader>() as PageLoader;
  const { hide_outline, hide_toc } = (article.frontmatter as any)?.design ?? {};
  return (
    <ArticlePageAndNavigation hide_toc={hide_toc}>
      <main ref={ref} className="article-grid article-subgrid-gap col-screen">
        <ArticlePage article={article} />
        {!hide_outline && <DocumentOutline top={top} height={height} />}
      </main>
    </ArticlePageAndNavigation>
  );
}

export function CatchBoundary() {
  return (
    <ArticlePageAndNavigation>
      <main className="article-content">
        <ArticlePageCatchBoundary />
      </main>
    </ArticlePageAndNavigation>
  );
}
