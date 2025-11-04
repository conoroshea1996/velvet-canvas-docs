---
title: Toolbox
description: A Svelte component demonstrating how to use the ToolAPI to manage the active drawing tool register keyboard shortcuts ect..
---

# 🎨 Toolbox with keyboard events

This Svelte component is an example of a toolbar it demonstrates how to consume the **`ToolAPI`** to provide users with controls for selecting the active drawing tool and setting the stroke/fill colors for new shapes.
The below is a more complex example showing how to register keyboard events also.


This is exposed to all children components via context. 

The script section handles API access, color change handlers, and keyboard shortcuts for tool selection.

```svelte
<script lang="ts">
    import { getToolContext } from "$lib/index.js";
    import { onMount } from "svelte";

    // Access the ToolAPI provided via Svelte Context
    const toolAPI = getToolContext();

    /**
     * @description Updates the stroke color for the next element drawn 
     * by patching the roughOptions state.
     */
    const handleChange = (event: Event) => {
        const selectedColor = (event.target as HTMLInputElement).value;
        // TOOLAPI: Set the stroke color style for new shapes
        toolAPI.setRoughOptions({ stroke: selectedColor });
    };

    /**
     * @description Updates the fill color for the next element drawn.
     */
    const handleChangeFill = (event: Event) => {
        const selectedColor = (event.target as HTMLInputElement).value;
        // TOOLAPI: Set the fill color style for new shapes
        toolAPI.setRoughOptions({ fill: selectedColor });
    };

    /**
     * @description Handles keyboard shortcuts for tool selection.
     */
    function handleKeyDown(e: KeyboardEvent) {
        // Handle deletion (if Elements API were included)
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
        } 
        
        // TOOLAPI: Map keys to tool selection
        else if (e.key === "s") toolAPI.setTool("select");
        else if (e.key === "r") toolAPI.setTool("rectangle");
        else if (e.key === "c") toolAPI.setTool("circle");
        else if (e.key === "l") toolAPI.setTool("line");
        else if (e.key === "t") toolAPI.setTool("text");
    }

    // Attach and clean up the global keydown listener
    onMount(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

</script>

<div class="toolbar">
    <div style="width: 100%;">
        <h2>
            {infoText}
        </h2>
    </div>
    <div class="toolbar-item color-picker-wrapper" title="Stroke color">
        <label for="strokecolor">Stroke color</label>
        <input
            type="color"
            id="strokecolor"
            name="strokecolor"
            value={toolAPI.roughOptions.stroke}
            onchange={handleChange}
        />
    </div>

    <div class="toolbar-item color-picker-wrapper" title="Fill Color">
        <label for="fillcolor">Fill Color</label>
        <input
            type="color"
            id="fillcolor"
            name="fillcolor"
            value={toolAPI.roughOptions.fill}
            onchange={handleChangeFill}
        />
    </div>

    <div class="separator"></div>

    <button
        onclick={() => {
            toolAPI.setTool("select");
        }}
        class:active={toolAPI.activeTool === "select"}
    >
        Select (S)
    </button>
    <button
        onclick={() => toolAPI.setTool("connect")}
        class:active={toolAPI.activeTool === "connect"}
    >
        🔗 Connect
    </button>
    <button
        onclick={() => {
            toolAPI.setTool("rectangle");
        }}
        class:active={toolAPI.activeTool === "rectangle"}
    >
        Rectangle (R)
    </button>
    <button
        onclick={() => toolAPI.setTool("circle")}
        class:active={toolAPI.activeTool === "circle"}
    >
        Circle (C)
    </button>
    <button
        onclick={() => toolAPI.setTool("line")}
        class:active={toolAPI.activeTool === "line"}
    >
        Freehand (L)
    </button>
    <button
        onclick={() => toolAPI.setTool("straightLine")}
        class:active={toolAPI.activeTool === "straightLine"}
    >
        Line
    </button>
    <button
        onclick={() => toolAPI.setTool("arrow")}
        class:active={toolAPI.activeTool === "arrow"}
    >
        Arrow
    </button>
    <button
        onclick={() => toolAPI.setTool("text")}
        class:active={toolAPI.activeTool === "text"}
    >
        Text (T)
    </button>

    <button
        onclick={() => toolAPI.setTool("pan")}
        class:active={toolAPI.activeTool === "pan"}
    >
        Pan (P)
    </button>
</div>

<style>
    /* ... existing styles for .toolbar and button ... */
    .toolbar {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 100;
        background: white;
        padding: 8px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        max-width: 90%;
    }

    .toolbar button {
        padding: 8px 16px;
        background: white;
        color: black;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
    }

    .toolbar button:hover {
        background: #f0f0f0;
    }

    .toolbar button.active {
        background: #4a90e2;
        color: white;
        border-color: #4a90e2;
    }

    .separator {
        width: 1px;
        background: #ddd;
        margin: 0 4px;
    }

    /* 🎨 NEW STYLES FOR COLOR PICKERS */
    .color-picker-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4px 8px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        color: #555;
    }

    .color-picker-wrapper label {
        font-size: 10px;
        font-weight: bold;
        margin-bottom: 2px;
        cursor: pointer; /* Keep the cursor active on the label */
    }

    .color-picker-wrapper input[type="color"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 30px; /* Adjust size as needed */
        height: 25px;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    .color-picker-wrapper input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    .color-picker-wrapper input[type="color"]::-webkit-color-swatch {
        border: 1px solid #ccc;
        border-radius: 3px;
    }
</style>