import React, { useState, useEffect } from "react";
import { TextInput, Text, ActionIcon } from "@mantine/core";
import { Edit } from "lucide-react";

interface EditableProjectNameProps {
	initialName?: string;
	onNameChange?: (name: string) => void;
}

export function EditableProjectName({
	initialName = "Untitled Project",
	onNameChange,
}: EditableProjectNameProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [projectName, setProjectName] = useState(initialName);

	// Sync local state with the initialName prop when it changes
	useEffect(() => {
		setProjectName(initialName);
	}, [initialName]);

	const handleSave = () => {
		setIsEditing(false);
		onNameChange?.(projectName);
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSave();
		} else if (event.key === "Escape") {
			setProjectName(initialName);
			setIsEditing(false);
		}
	};

	if (isEditing) {
		return (
			<TextInput
				value={projectName}
				onChange={(event) => setProjectName(event.currentTarget.value)}
				onBlur={handleSave}
				onKeyDown={handleKeyPress}
				size="sm"
				variant="unstyled"
				style={{
					fontSize: "16px",
					fontWeight: 500,
					width: "auto",
					minWidth: "150px",
				}}
				autoFocus
			/>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "8px",
				cursor: "pointer",
			}}
			onClick={() => setIsEditing(true)}
		>
			<Text fz="md" fw={500} c="dark" style={{ userSelect: "none" }}>
				{projectName}
			</Text>
			<ActionIcon variant="subtle" size="sm" c="gray.6">
				<Edit size={14} />
			</ActionIcon>
		</div>
	);
}
