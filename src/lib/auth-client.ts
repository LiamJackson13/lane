import { createAuthClient } from 'better-auth/svelte';
import { organizationClient } from 'better-auth/client/plugins';
import { sentinelClient } from '@better-auth/infra/client';

export const authClient = createAuthClient({
	plugins: [organizationClient(), sentinelClient()]
});
