import { createAuthClient } from 'better-auth/svelte';
import { organizationClient } from 'better-auth/client/plugins';
import { dashClient, sentinelClient } from '@better-auth/infra/client';

export const authClient = createAuthClient({
	plugins: [organizationClient(), sentinelClient(), dashClient()]
});
