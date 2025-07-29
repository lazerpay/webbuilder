import { Provider } from "react-redux";
import { store } from "../../store/store";
import { TemplateEditorContent } from "./TemplateEditorContent";

interface TemplateEditorProps {
	// Props removed - using hooks only
}

export function TemplateEditor({}: TemplateEditorProps) {
	return (
		<Provider store={store}>
			<TemplateEditorContent />
		</Provider>
	);
}