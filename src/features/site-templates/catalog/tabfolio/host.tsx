'use client'
import Link from 'next/link'
import { createContext, useContext, type ReactNode, type ComponentProps } from 'react'
import type { TemplateLocale } from '../../types'
import { brand } from './config/brand'
export interface TabfolioHostOptions { locale?: TemplateLocale; brandName?: Record<TemplateLocale,string>; logo?: string; lightLogo?: string; marketplaceHref?: string; marketplaceLabel?: Record<TemplateLocale,string>; marketplaceAriaLabel?: Record<TemplateLocale,string>; filing?: ReactNode }
const Context=createContext<TabfolioHostOptions>({})
/** 宿主仅注入展示能力；独立运行不读取宿主资源或路径。 */
export function TabfolioHostProvider({children,...options}: TabfolioHostOptions & {children:ReactNode}) { return <Context.Provider value={options}>{children}</Context.Provider> }
export function HostLogo({light=false,...props}: Omit<ComponentProps<'img'>,'src'> & {light?:boolean}) { const host=useContext(Context);return <img {...props} src={light ? host.lightLogo ?? brand.lightLogo : host.logo ?? brand.logo} /> }
export function HostFiling(){ return useContext(Context).filing }
export function HostMarketplaceLink(props: ComponentProps<typeof Link>) { const host=useContext(Context);return host.marketplaceHref ? <Link {...props} href={host.marketplaceHref} /> : null }
export function HostBrandName(){ const host=useContext(Context);return host.brandName?.[host.locale ?? 'zh'] ?? brand.name[host.locale ?? 'zh'] }
