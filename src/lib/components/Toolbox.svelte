<script lang="ts">
    import { onMount } from "svelte";
    import { getElementsContext, getToolContext } from "velvet-canvas";
    import {
        MousePointer2,
        Link2,
        Square,
        Circle,
        PenTool,
        Minus,
        ArrowRight,
        Type,
        Move,
        Palette,
        Trash2,
    } from "lucide-svelte";

    const toolAPI = getToolContext();
    const storeApi = getElementsContext();

    storeApi.onElementAdded((element) => {
        console.log(`Element added: ${element.id}`);
    });

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        toolAPI.setRoughOptions({ stroke: target.value });
    };

    const handleChangeFill = (e: Event) => {
        const target = e.target as HTMLInputElement;
        toolAPI.setRoughOptions({ fill: target.value });
    };

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            storeApi.deleteSelected();
        } else if (e.key === "s") toolAPI.setTool("select");
        else if (e.key === "r") toolAPI.setTool("rectangle");
        else if (e.key === "c") toolAPI.setTool("circle");
        else if (e.key === "l") toolAPI.setTool("line");
        else if (e.key === "t") toolAPI.setTool("text");
    }

    onMount(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    });
</script>

<div class="mobile-toolbar">
    <!-- Color Pickers -->
    <div class="color-group">
        <label class="color-btn" title="Stroke">
            <input
                type="color"
                value={toolAPI.roughOptions.stroke}
                onchange={handleChange}
            />
            <div
                class="swatch stroke-swatch"
                style:background-color={toolAPI.roughOptions.stroke}
            ></div>
        </label>
        <label class="color-btn" title="Fill">
            <input
                type="color"
                value={toolAPI.roughOptions.fill}
                onchange={handleChangeFill}
            />
            <div
                class="swatch fill-swatch"
                style:background-color={toolAPI.roughOptions.fill}
            ></div>
        </label>
    </div>

    <div class="tools-group">
        <button
            class="tool-btn"
            class:active={toolAPI.activeTool === "select"}
            onclick={() => toolAPI.setTool("select")}
            title="Select (S)"
        >
            <MousePointer2 size={18} />
        </button>

        <button
            class={"tool-btn"}
            class:active={toolAPI.activeTool === "connect"}
            onclick={() => toolAPI.setTool("connect")}
            title="Connect"
        >
            <Link2 size={18} />
        </button>

        <button
            class="tool-btn"
            class:active={toolAPI.activeTool === "rectangle"}
            onclick={() => toolAPI.setTool("rectangle")}
            title="Rectangle (R)"
        >
            <Square size={18} />
        </button>

        <button
            class="tool-btn"
            class:active={toolAPI.activeTool === "circle"}
            onclick={() => toolAPI.setTool("circle")}
            title="Circle (C)"
        >
            <Circle size={18} />
        </button>

        <button
            class="tool-btn"
            class:active={toolAPI.activeTool === "freehand"}
            onclick={() => toolAPI.setTool("freehand")}
            title="Freehand (L)"
        >
            <PenTool size={18} />
        </button>

        <button
            class="tool-btn"
            class:active={toolAPI.activeTool === "straightLine"}
            onclick={() => toolAPI.setTool("straightLine")}
            title="Straight Line"
        >
            <Minus size={18} />
        </button>

        <button
            class="tool-btn"
            class:active={toolAPI.activeTool === "arrow"}
            onclick={() => toolAPI.setTool("arrow")}
            title="Arrow"
        >
            <ArrowRight size={18} />
        </button>

        <button
            class="tool-btn"
            class:active={toolAPI.activeTool === "text"}
            onclick={() => toolAPI.setTool("text")}
            title="Text (T)"
        >
            <Type size={18} />
        </button>

        <button
            class="tool-btn"
            class:active={toolAPI.activeTool === "pan"}
            onclick={() => toolAPI.setTool("pan")}
            title="Pan (P)"
        >
            <Move size={18} />
        </button>

        <button
            class="tool-btn danger"
            onclick={() => storeApi.deleteSelected()}
            title="Delete (Backspace)"
        >
            <Trash2 size={18} />
        </button>
    </div>

    <!-- Demo: Update Selected Colors -->
    <button
        class="fab"
        onclick={() =>
            storeApi.updateSelectedColors({
                fill: "#10b981",
                stroke: "#ec4899",
            })}
        title="Apply Demo Colors"
    >
        <Palette size={20} />
    </button>
</div>

<style>
    :global(body) {
        touch-action: manipulation;
    }

    .mobile-toolbar {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 8px 12px;
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.3);
        max-width: 95vw;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    /* Hide scrollbar but keep functionality */
    .mobile-toolbar::-webkit-scrollbar {
        display: none;
    }
    .mobile-toolbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    /* Color Group */
    .color-group {
        display: flex;
        gap: 6px;
        align-items: center;
    }

    .color-btn {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    .color-btn:active {
        transform: scale(0.92);
    }

    .color-btn input[type="color"] {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }

    .swatch {
        position: absolute;
        inset: 4px;
        border-radius: 8px;
        border: 2px solid white;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
    }

    .stroke-swatch {
        clip-path: polygon(
            0 0,
            100% 0,
            100% 100%,
            0 100%,
            20% 80%,
            20% 20%,
            80% 20%,
            80% 80%
        );
    }

    .fill-swatch {
        clip-path: circle(50% at 50% 50%);
    }

    /* Tools Group */
    .tools-group {
        display: flex;
        gap: 4px;
        align-items: center;
        flex: 1;
        min-width: 0;
    }

    .tool-btn {
        position: relative;
        width: 44px;
        height: 44px;
        border-radius: 14px;
        background: transparent;
        border: none;
        color: #555;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        tap-highlight-color: transparent;
    }

    .tool-btn:active {
        transform: scale(0.9);
    }

    .tool-btn.active {
        background: #4f46e5;
        color: white;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
    }

    .tool-btn.danger {
        color: #ef4444;
    }

    .tool-btn.danger:active {
        background: #fee2e2;
    }

    /* FAB */
    .fab {
        position: relative;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8b5cf6, #3b82f6);
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
        transition: all 0.2s ease;
        flex-shrink: 0;
    }

    .fab:active {
        transform: scale(0.92);
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
    }

    /* Responsive */
    @media (max-width: 480px) {
        .mobile-toolbar {
            bottom: 12px;
            padding: 6px 10px;
            gap: 6px;
        }

        .color-btn {
            width: 36px;
            height: 36px;
        }

        .tool-btn {
            width: 40px;
            height: 40px;
        }

        .fab {
            width: 44px;
            height: 44px;
        }
    }
</style>
