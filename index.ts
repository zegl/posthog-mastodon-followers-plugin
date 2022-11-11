import { Plugin, PluginMeta, PostHogExtension } from '@posthog/plugin-scaffold'
import fetch from 'node-fetch'

declare var posthog: PostHogExtension;

type MastodonPlugin = Plugin<{
    config: {
        hostname: string;
        user_id: string;
    }
}>

type MastodonMeta = PluginMeta<MastodonPlugin>

export interface MastodonAccount {
    id: string;
    username: string;
    acct: string;
    display_name: string;
    locked: boolean;
    bot: boolean;
    discoverable: boolean;
    group: boolean;
    created_at: Date;
    note: string;
    url: string;
    avatar: string;
    avatar_static: string;
    header: string;
    header_static: string;
    followers_count: number;
    following_count: number;
    statuses_count: number;
    last_status_at: string;
    emojis: any[];
    fields: any[];
}

const plugin: MastodonPlugin = {
    runEveryDay: async ({ config }: MastodonMeta) => {
        const account = await get(config.hostname, config.user_id)
        posthog.capture('mastodon_followers', {
            username: account.username,
            hostname: config.hostname,
            followers_count: account.followers_count,
            following_count: account.following_count,
            statuses_count: account.statuses_count,
        })
    },

    setupPlugin: async ({ config }: MastodonMeta) => {
        const account = await get(config.hostname, config.user_id)
        if (!account || !account.username) {
            throw new Error('Invalid configuration.')
        }
    }
}

async function get(hostname: string, userID: string): Promise<MastodonAccount> {
    const response = await fetch(`https://${hostname}/api/v1/accounts/${userID}`)
    return await response.json() as MastodonAccount
}

module.exports = plugin
