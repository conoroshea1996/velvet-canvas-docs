<script lang="ts">
	import { features } from "$lib/config";
	import { CanvasBoard, CanvasContext } from "velvet-canvas";
	import Toolbox from "../Toolbox.svelte";
</script>

<div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<div class="grid items-center gap-12 sm:grid-cols-1 lg:grid-cols-3">
		{#each features as feature}
			<!-- Feature Block -->
			<div class="text-center">
				<div
					class="mx-auto flex size-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800"
				>
					<feature.icon
						class="text-primary size-5 shrink-0 dark:text-neutral-400"
					/>
				</div>
				<div class="mt-3">
					<h3
						class="text-lg font-semibold text-gray-800 dark:text-white"
					>
						{feature.title}
					</h3>
					<p class="mt-1 text-gray-600 dark:text-neutral-400">
						{@html feature.description}
					</p>
				</div>
			</div>
			<!-- End Feature Block -->
		{/each}
	</div>
</div>

<div class="flex justify-center">
	<CanvasContext canvasStyles={{ backgroundColor: "white" }}>
		<Toolbox />
		<CanvasBoard
			class="max-w-[85rem]"
			style="position: relative; touch-action: none; 
                       height: 80vh; 
                       width: 90vw; 
                       border-radius: 12px; 
					   max-width: 85rem;
					   margin:auto;
                       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);"
		/>
	</CanvasContext>
</div>
