import { Provider } from "react-redux";
import { store } from "../../store/store";
import { TemplateEditorContent } from "./TemplateEditorContent";

interface TemplateEditorProps {
	onNavigateToProjects?: () => void;
	onNavigateToProfile?: () => void;
	onNavigateToHome?: () => void;
	onLogout?: () => void;
}

export function TemplateEditor({
	onNavigateToProjects,
	onNavigateToProfile,
	onNavigateToHome,
	onLogout,
}: TemplateEditorProps) {
	return (
		<Provider store={store}>
			<TemplateEditorContent
				onNavigateToProjects={onNavigateToProjects}
				onNavigateToProfile={onNavigateToProfile}
				onNavigateToHome={onNavigateToHome}
				onLogout={onLogout}
			/>
		</Provider>
	);
}
