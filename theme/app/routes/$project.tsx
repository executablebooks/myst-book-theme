import { ProjectPageCatchBoundary } from '@curvenote/site';
import Page, { ArticlePageAndNavigation } from './$project.$slug';
export { loader } from './$project.$slug';
export default Page;

export function CatchBoundary() {
  return (
    <ArticlePageAndNavigation>
      <main className="article-content">
        <ProjectPageCatchBoundary />
      </main>
    </ArticlePageAndNavigation>
  );
}
