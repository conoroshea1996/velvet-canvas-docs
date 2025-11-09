
import type { NavItem, SocialLink } from "$lib/types/nav";

import {
    Boxes,
    PaintRoller,
    Zap
} from 'lucide-svelte';
import type { Feature, PromoConfig, SiteConfig } from "./types/config.js";


export const siteConfig: SiteConfig = {
    version: '0.6.0',
    title: 'Velvet-Canvas',
    description:
        'The <b> Unopinionated Canvas Kit </b>. Build silky smooth drawing apps, your way.',
        
    github: 'https://github.com/conoroshea1996/velvet-canvas',
    npm: 'velvet-canvas',

    quickLinks: [
        { title: 'Customize', href: '/docs/customize' },
        { title: 'Examples', href: '/docs/examples' }
    ],
    logo: '/logo.svg',
    logoDark: '/logo-white.svg',
    favicon: '/favicon.png',
};


export let navItems: NavItem[] = [
    {
        title: 'Docs',
        href: '/docs'
    },

];

export let socialLinks: SocialLink[] = [

    {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/conor-o-shea-402299156/',
        icon: 'linkedin'
    },
    {
        title: 'GitHub',
        href: 'https://github.com/conoroshea1996',
        icon: 'github'
    },

];


export const features: Feature[] = [
    {
        icon: Boxes,
        title: 'Rich Component Library',
        description: 'Built on a powerful and performant 2D canvas library, <b> Konva.js </b> with built-in customization via <b> Rough.js </b> to give your drawings an artistic, hand-drawn feel.'
    },
    {
        icon: PaintRoller,
        title: 'Fully Customizable & Unopinionated',
        description: 'The library exposes APIs and tooling so you can <b>own and control</b> every aspect of the drawing canvas experience and its look and feel.'
    },
    {
        icon: Zap,
        title: 'Fast & Modern Architecture',
        description: 'Powered by <b>Svelte 5</b>, leveraging runes and classes for <b>optimal performance</b> and an excellent developer experience.'
    }
];