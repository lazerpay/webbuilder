import { Menu, Avatar } from '@mantine/core';
import { User, FolderOpen, LogOut } from 'lucide-react';

interface UserMenuProps {
  onProfile?: () => void;
  onMyProjects?: () => void;
  onLogOut?: () => void;
}

export function UserMenu({ onProfile, onMyProjects, onLogOut }: UserMenuProps) {
  const handleProfile = () => {
    console.log('Profile clicked');
    if (onProfile) onProfile();
  };

  const handleMyProjects = () => {
    console.log('My Projects clicked');
    if (onMyProjects) onMyProjects();
  };

  const handleLogOut = () => {
    console.log('Log Out clicked');
    if (onLogOut) onLogOut();
  };

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Avatar 
          size="md" 
          radius="xl"
          src="https://i.pravatar.cc/150?img=1"
          alt="User Avatar"
          style={{ cursor: 'pointer' }}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<User size={16} />}
          onClick={handleProfile}
        >
          Profile
        </Menu.Item>
        
        <Menu.Item
          leftSection={<FolderOpen size={16} />}
          onClick={handleMyProjects}
        >
          My Projects
        </Menu.Item>
        
        <Menu.Divider />
        
        <Menu.Item
          leftSection={<LogOut size={16} />}
          onClick={handleLogOut}
          color="red"
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}