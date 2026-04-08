<script lang="ts" ✂prettier:content✂="CglpbXBvcnQgdHlwZSB7IFBhZ2VQcm9wcyB9IGZyb20gJy4vJHR5cGVzJzsKCWltcG9ydCB7IGdldENsYXNzQnlJZCB9IGZyb20gJy4uL2NsYXNzZXMucmVtb3RlJzsKCWxldCB7IHBhcmFtcyB9OiBQYWdlUHJvcHMgPSAkcHJvcHMoKTsKCWNvbnN0IHNjaG9vbENsYXNzID0gJGRlcml2ZWQoYXdhaXQgZ2V0Q2xhc3NCeUlkKHBhcmFtcy5pZCkpOwo=">{}</script>

{#if schoolClass}
	<p>class detail page for {schoolClass.name}</p>
	<p>Capacity: {schoolClass.capacity}</p>
	<p>Instructor: {schoolClass.instructorName}</p>
	<p>Start Time: {schoolClass.startTime} | End Time: {schoolClass.endTime}</p>
{:else}
	<p>Loading...</p>
{/if}
