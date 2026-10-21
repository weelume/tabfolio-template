'use client'

import { HostMarketplaceLink, HostLogo, HostFiling } from '../host'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import type { SiteTemplatePageProps } from '../../../types'
import '../theme.css'

export function t(locale: 'zh' | 'en', zh: string, en: string) { return locale === 'zh' ? zh : en }
export function Shell({ basePath, locale = 'zh', children }: SiteTemplatePageProps & { children: ReactNode }) {
  const pathname = usePathname() ?? basePath
  const root = locale === 'en' && basePath.endsWith('/en') ? basePath.slice(0, -3) : basePath
  const tail = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : ''
  const langHref = locale === 'en' ? `${root}${tail}` : `${root}/en${tail}`
  const links = [['', '项目', 'Projects'], ['experiments', '实验', 'Experiments'], ['about', '关于', 'About'], ['resume', '简历', 'Resume']] as const
  return <MotionConfig reducedMotion="user"><div className="tf-site" data-locale={locale}>
    <div className="tf-aurora" aria-hidden="true" />
    <header className="tf-header">
      <Link href={basePath || '/'} className="tf-avatar" aria-label={t(locale, 'Tabfolio 首页', 'Tabfolio home')}><img src="/templates/tabfolio/assets/avatar.png" alt="" /></Link>
      <nav className="tf-nav" aria-label={t(locale, '主导航', 'Main navigation')}>
        {links.map(([slug, zh, en]) => {
          const active = slug ? pathname.endsWith(`/${slug}`) : pathname === basePath || pathname.endsWith('/en')
          return <Link key={slug} href={slug ? `${basePath}/${slug}` : basePath} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined}>{t(locale, zh, en)}</Link>
        })}
      </nav>
      <Link href={langHref} className="tf-language" aria-label={t(locale, '切换为英文', 'Switch to Chinese')}>{locale === 'zh' ? 'EN' : '中'}</Link>
    </header>
    <main>{children}</main>
    <Footer basePath={basePath} locale={locale} />
    <HostMarketplaceLink className="tf-market-entry" href="/templates" aria-label={t(locale, '打开Tabfolio模板市场', 'Open Tabfolio template marketplace')}><HostLogo light={false} alt="" /></HostMarketplaceLink>
  </div></MotionConfig>
}
function Footer({ basePath, locale }: { basePath: string; locale: 'zh' | 'en' }) { const [copied, setCopied] = useState(false); return <footer className="tf-footer"><div className="tf-footer-top"><div><h3><img className="tf-footer-avatar" src="/templates/tabfolio/assets/avatar.png" alt="" />Aiko Tanaka</h3><p>{t(locale, '专注清晰系统、流畅交互与有意义细节的产品与网页设计师。', 'Product & web designer focused on clean systems, smooth interactions, and meaningful details.')}</p></div><div><span className="tf-label">{t(locale, '链接', 'Links')}</span><Link href={basePath || '/'}>{t(locale, '项目', 'Projects')}</Link><Link href={`${basePath}/experiments`}>{t(locale, '实验', 'Experiments')}</Link><Link href={`${basePath}/about`}>{t(locale, '关于', 'About')}</Link><Link href={`${basePath}/resume`}>{t(locale, '简历', 'Resume')}</Link><Link href={`${basePath}/contact`}>{t(locale, '联系', 'Contact')}</Link><HostMarketplaceLink href="/templates">{t(locale, 'Tabfolio：模板市场', 'Tabfolio: template marketplace')}</HostMarketplaceLink></div><div><span className="tf-label">{t(locale, '联系', 'Contact')}</span><button className="tf-email" type="button" onClick={() => { void navigator.clipboard?.writeText('hello@aiko.com'); setCopied(true); setTimeout(() => setCopied(false), 1600) }}>{copied ? t(locale, '已复制', 'Copied!') : 'hello@aiko.com'}</button><a href="mailto:hello@aiko.com">{t(locale, '预约通话', 'Schedule a call')}</a><Link href={`${basePath}/privacy-policy`}>{t(locale, '隐私政策', 'Privacy policy')}</Link><Link href={`${basePath}/terms-of-service`}>{t(locale, '服务条款', 'Terms of service')}</Link></div></div><div className="tf-footer-bottom"><span>© {new Date().getFullYear()} {t(locale, 'Tabfolio · Tabfolio Pro', 'Tabfolio · Tabfolio Pro')}</span><span>Made with care in Tokyo · <a href="https://www.linkedin.com/">LinkedIn</a></span><HostFiling /></div></footer> }
export function Button({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) { return <Link className={`tf-button${secondary ? ' is-secondary' : ''}`} href={href}>{children}</Link> }
export function PageIntro({ locale, title, children }: { locale: 'zh' | 'en'; title: ReactNode; children?: ReactNode }) { return <section className="tf-intro" data-locale={locale}><motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>{title}</motion.h1>{children}</section> }

