import { useEffect, useRef, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './redux';
import { updateEditorContent } from '../store/templateStore';

declare global {
	interface Window {
		grapesjs: any;
	}
}

export interface GrapesJSEditorHook {
	editorRef: React.RefObject<HTMLDivElement>;
	grapesEditorRef: React.RefObject<any>;
	isGrapesJSLoaded: boolean;
	isEditorInitialized: boolean;
	isUpdatingFromEditor: boolean;
	assetManagerOpen: boolean;
	selectedImageComponent: any;
	setAssetManagerOpen: (open: boolean) => void;
	handleAssetSelect: (src: string) => void;
	handleAssetManagerClose: () => void;
	getEditor: () => any;
}

/**
 * Custom hook that encapsulates all GrapesJS editor logic including:
 * - Dynamic loading of GrapesJS library
 * - Editor initialization and configuration
 * - Content management and updates
 * - Event handling and debouncing
 * - Asset manager integration
 * - Cleanup and memory management
 */
export function useGrapesJSEditor(): GrapesJSEditorHook {
	const editorRef = useRef<HTMLDivElement>(null);
	const grapesEditorRef = useRef<any>(null);
	const [isGrapesJSLoaded, setIsGrapesJSLoaded] = useState(false);
	const [isEditorInitialized, setIsEditorInitialized] = useState(false);
	const [isUpdatingFromEditor, setIsUpdatingFromEditor] = useState(false);
	const [assetManagerOpen, setAssetManagerOpen] = useState(false);
	const [selectedImageComponent, setSelectedImageComponent] = useState<any>(null);
	const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const lastContentRef = useRef<string>('');

	const { selectedTemplate, editorContent } = useAppSelector(
		(state) => state.template
	);
	const dispatch = useAppDispatch();

	// Load GrapesJS dynamically
	useEffect(() => {
		const loadGrapesJS = async () => {
			if (window.grapesjs) {
				setIsGrapesJSLoaded(true);
				return;
			}

			try {
				// Load CSS first
				const cssLink = document.createElement("link");
				cssLink.rel = "stylesheet";
				cssLink.href = "https://unpkg.com/grapesjs@0.21.7/dist/css/grapes.min.css";
				document.head.appendChild(cssLink);

				// Load JS
				const script = document.createElement("script");
				script.src = "https://unpkg.com/grapesjs@0.21.7/dist/grapes.min.js";
				script.onload = () => {
					setIsGrapesJSLoaded(true);
				};
				script.onerror = () => {
					console.error("Failed to load GrapesJS");
				};
				document.head.appendChild(script);
			} catch (error) {
				console.error("Error loading GrapesJS:", error);
			}
		};

		loadGrapesJS();
	}, []);

	// Debounced content update function
	const createDebouncedUpdate = useCallback(() => {
		return (isTextEdit = false) => {
			if (updateTimeoutRef.current) {
				clearTimeout(updateTimeoutRef.current);
			}
			
			const delay = isTextEdit ? 1500 : 800; // Longer delay for text edits
			
			updateTimeoutRef.current = setTimeout(() => {
				if (grapesEditorRef.current) {
					const bodyContent = grapesEditorRef.current.getHtml();
					const css = grapesEditorRef.current.getCss();
					
					// Only update if content actually changed
					if (bodyContent !== lastContentRef.current) {
						setIsUpdatingFromEditor(true);
						lastContentRef.current = bodyContent;
						
						dispatch(
							updateEditorContent({
								html: bodyContent,
								bodyContent,
								css,
							})
						);
						
						// Reset the flag after Redux update completes
						setTimeout(() => {
							setIsUpdatingFromEditor(false);
						}, 200);
					}
				}
			}, delay);
		};
	}, [dispatch]);

	// Setup event handlers
	const setupEventHandlers = useCallback((debouncedUpdate: (isTextEdit?: boolean) => void) => {
		if (!grapesEditorRef.current) return;

		// Listen for content changes with improved debouncing
		grapesEditorRef.current.on("component:update", () => debouncedUpdate(false));
		grapesEditorRef.current.on("style:update", () => debouncedUpdate(false));
		
		// Listen for text changes specifically with longer debounce
		grapesEditorRef.current.on("component:update:text", () => debouncedUpdate(true));
		
		// Listen for text input events to immediately set the updating flag
		grapesEditorRef.current.on("component:textnode:update", () => {
			setIsUpdatingFromEditor(true);
			// Clear any existing timeout and set a new one
			if (updateTimeoutRef.current) {
				clearTimeout(updateTimeoutRef.current);
			}
			debouncedUpdate(true);
		});

		// Listen for element selection to trigger control panel expansion
		grapesEditorRef.current.on("component:selected", () => {
			// Element selected - can be used for control panel integration
		});

		// Custom double-click handler for images
		grapesEditorRef.current.on('component:selected', (component: any) => {
			if (component.get('type') === 'image') {
				// Add double-click event listener to the selected image
				const view = component.getView();
				if (view && view.el) {
					const handleDoubleClick = () => {
						setSelectedImageComponent(component);
						setAssetManagerOpen(true);
					};
					
					// Remove existing listener to avoid duplicates
					view.el.removeEventListener('dblclick', handleDoubleClick);
					view.el.addEventListener('dblclick', handleDoubleClick);
				}
			}
		});

		// Override the default asset manager command
		grapesEditorRef.current.Commands.add('open-assets', {
			run() {
				setAssetManagerOpen(true);
			}
		});
	}, []);

	// Initialize GrapesJS editor
	useEffect(() => {
		if (!editorRef.current || !isGrapesJSLoaded) {
			return;
		}

		// Allow initialization if we have a template OR content OR it's a new project
		if (!selectedTemplate && !editorContent.bodyContent && selectedTemplate !== 'new-project') {
			return;
		}

		// Only initialize if we don't have an editor instance
		if (grapesEditorRef.current) {
			return;
		}

		try {
			grapesEditorRef.current = window.grapesjs.init({
				container: editorRef.current,
				height: "100%",
				width: "100%",
				storageManager: false,
				fromElement: false,
				showOffsets: true,
				assetManager: false, // Disable default asset manager
				canvas: {
					styles: [
						"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
					],
					scripts: [],
					customCss: `
						body { 
							margin: 0 !important; 
							padding: 0 !important; 
							min-height: 100vh !important;
							width: 100% !important;
						}
						html { 
							margin: 0 !important; 
							padding: 0 !important; 
							height: 100% !important;
							width: 100% !important;
						}
					`,
				},
				blockManager: {
					appendTo: "#blocks",
					blocks: [
						{
							id: "section",
							label: "<b>Section</b>",
							attributes: { class: "gjs-block-section" },
							content: `<section>
								<h1>Insert title here</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</section>`,
						},
						{
							id: "text",
							label: "Text",
							content: '<div data-gjs-type="text">Insert your text here</div>',
						},
						{
							id: "image",
							label: "Image",
							select: true,
							content: { type: "image" },
							activate: true,
						},
					],
				},
				layerManager: {
					appendTo: "#layers",
				},
				panels: {
					defaults: [],
				},
				deviceManager: {
					devices: [
						{
							name: "Desktop",
							width: "",
						},
						{
							name: "Mobile",
							width: "320px",
							widthMedia: "480px",
						},
					],
				},
			});

			// Set initial content
			let initialContent = '';
			if (editorContent.bodyContent) {
				initialContent = editorContent.bodyContent;
				grapesEditorRef.current.setComponents(editorContent.bodyContent);
			} else if (selectedTemplate === 'new-project' || !selectedTemplate) {
				// Load a clean, minimal starting template for new projects
				initialContent = `
					<div style="padding: 40px; max-width: 1200px; margin: 0 auto; min-height: 400px;">
						<h1 style="text-align: center; color: #333; margin-bottom: 30px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
							Your Project Title
						</h1>
						<p style="text-align: center; color: #666; margin-bottom: 40px; font-size: 18px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
							Start building your website by editing this content. Add images, text, and other elements to create your design.
						</p>
					</div>
				`;
				grapesEditorRef.current.setComponents(initialContent);
			}
			
			// Store the initial content reference
			lastContentRef.current = initialContent;
			
			if (editorContent.css) {
				grapesEditorRef.current.setStyle(editorContent.css);
			}
			
			// Setup event handlers
			const debouncedUpdate = createDebouncedUpdate();
			setupEventHandlers(debouncedUpdate);
			
			// Mark editor as initialized after a short delay to ensure all events are set up
			setTimeout(() => {
				setIsEditorInitialized(true);
			}, 500);

		} catch (error) {
			console.error("Error initializing GrapesJS:", error);
		}

		return () => {
			// Only destroy when component unmounts, not on every dependency change
		};
	}, [selectedTemplate, isGrapesJSLoaded, createDebouncedUpdate, setupEventHandlers, editorContent.bodyContent, editorContent.css]);

	// Update editor content when new template content is loaded
	// BUT NOT when the update is coming from the editor itself
	useEffect(() => {
		if (
			grapesEditorRef.current &&
			editorContent.bodyContent &&
			editorContent.css &&
			!isUpdatingFromEditor && // Prevent circular updates
			isEditorInitialized // Only update after editor is fully initialized
		) {
			try {
				// Only update if content has actually changed and we're not in the middle of editing
				const currentHtml = grapesEditorRef.current.getHtml();
				const currentCss = grapesEditorRef.current.getCss();

				// Check if the content is significantly different (not just minor formatting changes)
				const normalizeHtml = (html: string) => html.replace(/\s+/g, ' ').trim();
				const currentNormalized = normalizeHtml(currentHtml);
				const newNormalized = normalizeHtml(editorContent.bodyContent);

				// Additional check: don't update if the new content is the same as our last known content
				if (currentNormalized !== newNormalized && editorContent.bodyContent !== lastContentRef.current) {
					grapesEditorRef.current.setComponents(editorContent.bodyContent);
					lastContentRef.current = editorContent.bodyContent;
				}
				if (currentCss !== editorContent.css) {
					grapesEditorRef.current.setStyle(editorContent.css);
				}
			} catch (error) {
				console.error("Error updating editor content:", error);
			}
		}
	}, [editorContent.bodyContent, editorContent.css, isUpdatingFromEditor, isEditorInitialized]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			// Clear any pending timeouts
			if (updateTimeoutRef.current) {
				clearTimeout(updateTimeoutRef.current);
			}
			
			if (grapesEditorRef.current) {
				try {
					// Remove event listeners before destroying
					grapesEditorRef.current.off("component:update");
					grapesEditorRef.current.off("style:update");
					grapesEditorRef.current.off("component:update:text");
					grapesEditorRef.current.off("component:textnode:update");
					grapesEditorRef.current.off("component:selected");
					
					grapesEditorRef.current.destroy();
				} catch (error) {
					console.error("Error destroying GrapesJS:", error);
				}
				grapesEditorRef.current = null;
			}
		};
	}, []);

	// Asset manager handlers
	const handleAssetSelect = useCallback((src: string) => {
		if (selectedImageComponent) {
			selectedImageComponent.set('src', src);
			selectedImageComponent.set('attributes', {
				...selectedImageComponent.get('attributes'),
				src: src
			});
		}
		setAssetManagerOpen(false);
		setSelectedImageComponent(null);
	}, [selectedImageComponent]);

	const handleAssetManagerClose = useCallback(() => {
		setAssetManagerOpen(false);
		setSelectedImageComponent(null);
	}, []);

	const getEditor = useCallback(() => {
		return grapesEditorRef.current;
	}, []);

	return {
		editorRef,
		grapesEditorRef,
		isGrapesJSLoaded,
		isEditorInitialized,
		isUpdatingFromEditor,
		assetManagerOpen,
		selectedImageComponent,
		setAssetManagerOpen,
		handleAssetSelect,
		handleAssetManagerClose,
		getEditor,
	};
}