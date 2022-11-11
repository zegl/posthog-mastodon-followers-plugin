# Posthog Mastodon Followers Plugin

Track Mastodon followers in PostHog. No API token required.

Publishes a daily `mastodon_followers` event with the following properties: 
* `followers_count`
* `following_count`
* `statuses_count`

The installation requires a numeric **User ID** (not to be confused with a @username) of the account to track. You can find yours by going to your Mastodon profile in the browser, _View sources_, and search for `"me":`. The user ID is numeric and looks like this: `109285229749996967`.
