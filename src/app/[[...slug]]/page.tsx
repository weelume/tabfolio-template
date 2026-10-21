import { notFound } from 'next/navigation';
import { tabfolioTemplate } from '../../features/site-templates/catalog/tabfolio/meta';
export async function generateStaticParams() { return tabfolioTemplate.surfaces[0].pages.flatMap(page => [{ slug: page.slug ? page.slug.split('/') : [] }, { slug: ['en', ...(page.slug ? page.slug.split('/') : [])] }]); }
export default async function Page({ params }: {
    params: Promise<{
        slug?: string[];
    }>;
}) {
    const { slug = [] } = await params;
    const locale = slug[0] === 'en' ? 'en' : 'zh';
    const path = (locale === 'en' ? slug.slice(1) : slug).join('/');
    const page = tabfolioTemplate.surfaces[0].pages.find(page => page.slug === path);
    if (!page)
        notFound();
    const { default: Component } = await page.load();
    return <div data-template="tabfolio" lang={locale === 'zh' ? 'zh-CN' : 'en'}><Component locale={locale} basePath={locale === 'en' ? '/en' : ''}/></div>;
}
