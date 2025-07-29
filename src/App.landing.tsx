import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { TemplateEditor } from "./components/TemplateEditor/TemplateEditor";
import { MyProjectsPage } from "./pages/MyProjectsPage/MyProjectsPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { useNavigation } from "./hooks/useNavigation";
import theme from "./theme";

function AppContent() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<LandingPage />
				}
			/>
			<Route
				path="/builder"
				element={
					<ProtectedRoute>
						<TemplateEditor />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/projects"
				element={
					<ProtectedRoute>
						<MyProjectsPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

function App() {
	return (
		<MantineProvider theme={theme}>
			<BrowserRouter>
				<div style={{ minHeight: "100vh" }}>
					<AppContent />
				</div>
			</BrowserRouter>
		</MantineProvider>
	);
}

export default App;