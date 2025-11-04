---
title: Get Started
description: Set up and start using the Velvet-Canvas whiteboard library built with Svelte 5, Konva, and RoughJS.
---

# Getting Started

Build interactive whiteboard applications with our powerful canvas library featuring drawing tools, connectors.

## Installation

Install the required dependencies:

```bash
npm install velvet-canvas
```

## Quick Start

### 1. Set Up the Canvas Context

Wrap your application with the `CanvasContext` component:

This will expose the api via context to all children.

```svelte
<script>
    import { CanvasContext } from 'velvet-canvas';
</script>

<CanvasContext>
</CanvasContext>
```

### 2. Add the canvas layer 

Append the canvas to the dom this is the html canvas where the drawing will be done.:

```svelte
<script>
  import { CanvasBoard, CanvasContext } from 'velvet-canvas';
</script>

<CanvasContext>
  <CanvasBoard />
</CanvasContext>
```

### 3. The canvas and context is now setup

Your whiteboard is now ready! Note you won't see anything just yet dont worry stay calm!  
Next we can beging to interact with contexts to start drawing aka doing the the stuff thats cool.
Note its up to you to control the experience of how the tool box is shown. ect..


## Architecture Overview

The library is built on three main contexts:

### ToolContext

Manages the active drawing tool and tool state:

```svelte
<script>
  import { getToolContext } from '$lib/context/ToolContext.svelte';
  
  const tools = getToolContext();
  
  // Switch tools
  tools.setTool('rectangle');
  
  // Check active tool
  console.log(tools.activeTool);
</script>
```

### ElementsContext

Access and manage canvas elements:

```svelte
<script>
  import { getElementsContext } from '$lib/context/StoreContext.svelte';
  
  const elements = getElementsContext();
  
  // Listen for new elements
  elements.onElementAdded((element) => {
    console.log('New element:', element);
  });
  
  // Delete selected elements
  elements.deleteSelected();
  
  // Clear the canvas
  elements.clearAll();
</script>
```

### CanvasContext

Register the canvas container and access canvas info:

```svelte
<script>
  import { getCanvasContext } from '$lib/context/CanvasContext.svelte';
  
  const canvas = getCanvasContext();
  
  // Access canvas state
  console.log(canvas.getInfoText());
</script>
```

## Basic Example

Here's a complete minimal example:

```svelte
<script>
  import { CanvasContext, Canvas,getToolContext, getElementsContext } from 'velvet-canvas';

const tools = getToolContext();
  const elements = getElementsContext();
  
  function handleClear() {
    if (confirm('Clear canvas?')) {
      elements.clearAll();
    }
  }
</script>

<CanvasContext>
  <div class="toolbar">
    <button onclick={() => tools.setTool('select')}>Select</button>
    <button onclick={() => tools.setTool('rectangle')}>Rectangle</button>
    <button onclick={() => tools.setTool('circle')}>Circle</button>
    <button onclick={() => tools.setTool('text')}>Text</button>
    <button onclick={handleClear}>Clear</button>
  </div>
  
  <Canvas />
</CanvasContext>

<style>
  .toolbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    gap: 8px;
    padding: 12px;
    background: white;
    border-bottom: 1px solid #ddd;
    z-index: 100;
  }
</style>
```