import { useRouter } from 'next/router';
import { pages } from 'config/pages';

const usePageConfig = (pageId?: string) => {
  const { pathname } = useRouter();
  const currentPageId = (pageId || pathname.toLowerCase().replace(/[^a-z0-9]/g, '') || "home") as keyof typeof pages
  return pages[currentPageId] ?? {}
}

export default usePageConfig